const mongoose = require('mongoose');
const {urlencodedParser} = require('../../middlewares/middlewares');
const {Product, validate} = require('../../models/products');
const addProductTemplate = require('../../views/admin/products/new');
const viewProductsTemplate = require('../../views/admin/products/index');
const editProductTemplate = require('../../views/admin/products/edit')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().sort('productName');
    res.send(viewProductsTemplate({products}));
});

router.get('/new', (req, res) => {
    res.send(addProductTemplate());
});

router.post('/', urlencodedParser, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product(
        {
            productName: req.body.name,
            colour: req.body.colour,
            material: req.body.material,
            quantity: req.body.quantity,
            price: req.body.price,
            discountPrice: req.body.discountPrice,
            discountStart: req.body.discountStart,
            discountEnd: req.body.discountEnd,
            status: req.body.status
        }
    );

    await product.save();

    res.redirect('/admin/products');
});

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`Sorry, that product doesn't exist`);

    res.send(editProductTemplate({product}));
});

router.post('/edit/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');


    const product = await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.name,
        colour: req.body.colour,
        material: req.body.material,
        quantity: req.body.quantity,
        price: req.body.price,
        discountPrice: req.body.discountPrice,
        discountStart: req.body.discountStart,
        discountEnd: req.body.discountEnd,
        status: req.body.status
    }, {new: true});

    if (!product) return res.status(404).send('Product with that id was not found');


    res.redirect('/admin/products');
});

router.post('/delete/:id', async (req, res) => {
    // res.send(req.body);
    // const product = await Product.findById(req.params.id);
    //
    // if (!product) return res.status(404).send('Product with that ID was not found');
    //
    // res.send(product);

    // res.redirect('/admin/products');
})

module.exports = router;