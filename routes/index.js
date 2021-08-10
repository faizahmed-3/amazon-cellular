const {promisify} = require('util')
const redis = require('redis')
const sessionstorage = require('sessionstorage');
const {getModals} = require('../middlewares/otherFunctions');
const mongoose = require('mongoose')
const {Brand} = require('../models/admin/brands');
const {Category} = require('../models/admin/categories');
const {Wishlist} = require('../models/wishlist');
const {Cart} = require('../models/cart');
const seeAllTemplate = require('../views/see-all');
const categoriesTemplate = require('../views/view-categories');
const {Product} = require('../models/admin/products');
const homepageTemplate = require('../views/index');
const express = require('express');
const router = express.Router();

async function shuffleSpecial() {
    const featured_products = await Product.aggregate([
        {$match: {specialID: mongoose.Types.ObjectId('6088050e65de8726600704b6')}},
        {$match: {status: true}},
        {$sample: {size: 6}}
    ]);

    const new_arrivals = await Product.aggregate([
        {$match: {specialID: mongoose.Types.ObjectId('6088051765de8726600704b7')}},
        {$match: {status: true}},
        {$sample: {size: 6}}
    ]);

    const sale = await Product.aggregate([
        {$match: {specialID: mongoose.Types.ObjectId('60891d6820824d1308bc6946')}},
        {$match: {status: true}},
        {$sample: {size: 6}}
    ]);

    return [featured_products, new_arrivals, sale]
}

async function priceFilter(req, res, filter) {
    let products;
    if (Object.keys(filter).length > 0) {
        products = await Product.find(filter).and([{categoryID: req.params.id},{status: true}]).collation({locale: "en"}).sort('product_name')
    } else {
        products = await Product.find({categoryID: req.params.id},{status: true}).collation({locale: "en"}).sort('product_name')
    }

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().collation({locale: "en"}).sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({req, category, products, brands, wishlist, cart}))
}

async function brandsFilter(req, res, filter) {
    let products;
    if (filter.length > 0) {
        products = await Product.find({status: true}).or(filter).collation({locale: "en"}).sort('product_name')
    } else {
        products = await Product.find({categoryID: req.params.id, status: true}).collation({locale: "en"}).sort('product_name')
    }

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().collation({locale: "en"}).sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({req, category, products, brands, wishlist, cart}))
}

const client = redis.createClient({})

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

router.get('/', async (req, res) => {
    try {
        let savedFeatured = await GET_ASYNC('savedFeatured')
        if (!savedFeatured) {
            let [featured_products, new_arrivals, sale] = await shuffleSpecial();

            savedFeatured = await SET_ASYNC(
                'savedFeatured', JSON.stringify(featured_products), 'EX', 86400
            )

            let savedNew = await SET_ASYNC(
                'savedNew', JSON.stringify(new_arrivals), 'EX', 86400
            )

            let savedSale = await SET_ASYNC(
                'savedSale', JSON.stringify(sale), 'EX', 86400
            )

            const categories = await Category.find().sort('dateCreated')

            let [wishlist, cart] = await getModals(req, Wishlist, Cart)

            res.send(homepageTemplate({
                req,
                categories,
                featured_products: JSON.parse(savedFeatured),
                new_arrivals: JSON.parse(savedNew),
                sale: JSON.parse(savedSale),
                wishlist,
                cart
            }));

            return;

        }


        let savedNew = await GET_ASYNC('savedNew')
        let savedSale = await GET_ASYNC('savedSale')

        const categories = await Category.find().sort('dateCreated')

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)


        res.send(homepageTemplate({
            req,
            categories,
            featured_products: JSON.parse(savedFeatured),
            new_arrivals: JSON.parse(savedNew),
            sale: JSON.parse(savedSale),
            wishlist,
            cart
        }));

    } catch (e) {
        const featured_products = await Product.find({specialID: '6088050e65de8726600704b6', status: true}).sort('-dateCreated').limit(6);

        const new_arrivals = await Product.find({specialID: '6088051765de8726600704b7', status: true}).sort('-dateCreated').limit(6);

        const sale = await Product.find({specialID: '60891d6820824d1308bc6946', status: true}).sort('-dateCreated').limit(6);

        const categories = await Category.find().sort('dateCreated')

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)

        res.send(homepageTemplate({req, categories, featured_products, new_arrivals, sale, wishlist, cart}));
    }
})

router.get('/categories', async (req, res) => {
    const categories = await Category.find().select('category_name').sort('dateCreated')

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(categoriesTemplate({req, categories, wishlist, cart}));
})

router.get('/:id', async (req, res) => {
    const products = await Product.find({categoryID: req.params.id, status: true}).sort('dateCreated');

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().collation({locale: "en"}).sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({req, category, products, brands, wishlist, cart}))
})

router.get('/price-filter/:id', async (req, res) => {
    let filter = req.session.filter;

    await priceFilter(req, res, filter)

    req.session.filter = null;
})

router.post('/price-filter/:id', async (req, res) => {
    let min = {}
    let max = {}

    for (let prop in req.body) {
        if (parseInt(req.body[prop]) > 0) {
            if (prop === 'min') {
                min = {"$gte": parseInt(req.body[prop])}
            } else if (prop === 'max') {
                max = {"$lte": parseInt(req.body[prop])}
            }
        }
    }

    let filter = {};

    if (Object.keys(min).length > 0 || Object.keys(max).length > 0) {
        filter = {
            price: {...min, ...max}
        }
    }

    req.session.filter = filter;

    await priceFilter(req, res, filter)
})

router.get('/brands-filter/:id', async (req, res) => {

    let filter = req.session.filter;

    await brandsFilter(req, res, filter)

    req.session.filter = null;

})

router.post('/brands-filter/:id', async (req, res) => {
    let filter = []

    for (let prop in req.body) {
        if (mongoose.isValidObjectId(prop)) {

            // no sub brand
            if (prop.toString() === req.body[prop].toString()) {
                filter.push({brandID: prop})
            } else {
                filter.push({subBrandID: req.body[prop]})
            }
        }
    }

    req.session.filter = filter;

    await brandsFilter(req, res, filter)
})

module.exports = router;