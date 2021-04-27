const {productImagesUpload} = require('../../middlewares/multer');
const {Category} = require('../../models/admin/categories');
const {Brand} = require('../../models/admin/brands');
const {Special} = require('../../models/admin/special');
const _ = require('lodash');
const mongoose = require('mongoose');
const {Product, validate} = require('../../models/admin/products');
const addProductTemplate = require('../../views/admin/products/new');
const viewProductsTemplate = require('../../views/admin/products/index');
const editProductTemplate = require('../../views/admin/products/edit')
const express = require('express');
const router = express.Router();

async function post(req, res) {
    const {error} = validate(req.body);
    if (error) return res.send(addProductTemplate({
        input: req.body,
        error: error.details[0],
        categories,
        brands,
        specials
    }))

    const product_images = []
    const reqFiles = []
    const fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
        reqFiles.push(req.files[key]);
    });
    reqFiles.forEach(image => {
        product_images.push(image[0])
    })

    function checkSubBrand(id) {
        if (id.includes('-')) {
            const splitted = id.split('-');
            req.body.brandID = splitted[0]
            req.body.subBrandID = splitted[1]
        }
    }
    checkSubBrand(req.body.brandID);

    const product = new Product(
        _.pick(req.body,
            ['product_name', 'categoryID', 'brandID', 'subBrandID', 'specialID', 'description', 'inBox', 'quantity', 'shop_price', 'price', 'discount_price', 'status'])
    );

    product.product_images = product_images;

    await product.save();

}


router.get('/', async (req, res) => {
    const products = await Product.find().sort('product_name');
    res.send(viewProductsTemplate({title: 'All Products', products}));
});

router.get('/new', async (req, res) => {
    const categories = await Category.find().select('_id category_name').sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').sort('special_name');

    res.send(addProductTemplate({categories, brands, specials}));
});

router.post('/', productImagesUpload, async (req, res) => {
    const categories = await Category.find().select('_id category_name').sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').sort('special_name');

    await post(req,res);

    res.redirect('/admin/products');
});

router.post('/copy', productImagesUpload, async (req, res) => {
    const categories = await Category.find().select('_id category_name').sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').sort('special_name');

    await post(req,res);

    res.send(addProductTemplate({
        input: req.body,
        categories,
        brands,
        specials
    }))
});

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`Sorry, that product doesn't exist`);

    const categories = await Category.find().select('_id category_name').sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').sort('special_name');


    res.send(editProductTemplate({product, categories, brands, specials}));
});

router.post('/edit/:id', productImagesUpload, async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`Sorry, that product doesn't exist`);

    const categories = await Category.find().select('_id category_name').sort('category_name');
    const brands = await Brand.find().select('_id brand_name subBrands').sort('brand_name');
    const specials = await Special.find().select('_id special_name subBrands').sort('special_name');

    const {error} = validate(req.body);
    if (error) return res.send(editProductTemplate({
        product,
        error: error.details[0],
        categories,
        brands,
        specials
    }))

    const product_images = []
    const reqFiles = []
    const fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
        reqFiles.push(req.files[key]);
    });
    reqFiles.forEach(image => {
        product_images.push(image[0])
    })

    let existingImages = []
    if (typeof req.body.existingImages === 'string') {
        existingImages.push({filename: req.body.existingImages})
    } else if (typeof req.body.existingImages === 'object') {
        req.body.existingImages.forEach( image => {
            existingImages.push({filename : image})
        })
    }

    const editedImagesArray = existingImages.concat(product_images);


    function checkSubBrand(id) {
        if (id.includes('-')) {
            const splitted = id.split('-');
            req.body.brandID = splitted[0]
            req.body.subBrandID = splitted[1]
        }
    }
    checkSubBrand(req.body.brandID);

    if (!req.body.status) req.body.status = false;

    product = await Product.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ['product_name', 'categoryID', 'brandID', 'subBrandID', 'specialID', 'description', 'inBox', 'quantity', 'shop_price', 'price', 'discount_price', 'status']),
        {new: true});
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    if (editedImagesArray.length > 0) product.product_images = editedImagesArray;

    await product.save();

    console.log(req.body.status);
    console.log(req.body);

    res.redirect('/admin/products');
});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send(`Sorry, that product doesn't exist`);

    res.redirect('/admin/products');
})

router.get('/categories/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({categoryID: req.params.id}).sort('product_name');

    const category = await Category.findById(req.params.id).select('category_name')

    res.send(viewProductsTemplate({title: category.category_name , products}));
})

router.get('/brands/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({brandID: req.params.id}).sort('product_name');

    const brand = await Brand.findById(req.params.id).select('brand_name')

    res.send(viewProductsTemplate({title: brand.brand_name , products}));
})

router.get('/special/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const products = await Product.find({specialID: req.params.id}).sort('product_name');

    const special = await Special.findById(req.params.id).select('special_name')

    console.log(special);

    res.send(viewProductsTemplate({title: special.special_name , products}));
})

module.exports = router;