const {getModals} = require('../middlewares/otherFunctions');
const mongoose = require('mongoose')
const {Brand} = require('../models/admin/brands');
const {Category} = require('../models/admin/categories');
const {Wishlist} = require('../models/wishlist');
const {Cart} = require('../models/cart');
const seeAllTemplate = require('../views/see-all');
const {Product} = require('../models/admin/products');
const homepageTemplate = require('../views/index');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {

    const featured_products = await Product.find({specialID: '6088050e65de8726600704b6'}).sort('product_name');

    const new_arrivals = await Product.find({specialID: '6088051765de8726600704b7'}).sort('product_name');

    const sale = await Product.find({specialID: '60891d6820824d1308bc6946'}).sort('product_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(homepageTemplate({featured_products, new_arrivals, sale, wishlist, cart}));
})

router.get('/:id', async (req, res) => {
    const products = await Product.find({categoryID: req.params.id}).sort('product_name');

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({category, products, brands, wishlist, cart}))
})

router.post('/price-filter/:id', async(req, res) => {
    let min = {}
    let max = {}

    for (let prop in req.body) {
        if (parseInt(req.body[prop]) > 0){
            if (prop === 'min'){
                min = {"$gte": parseInt(req.body[prop])}
            } else if (prop === 'max'){
                max = {"$lte": parseInt(req.body[prop])}
            }
        }
    }

    let filter = {};

    if (Object.keys(min).length > 0 || Object.keys(max).length > 0 ){
        filter = {
            price: {...min, ...max}
        }
    }


    let products;
    if (Object.keys(filter).length>0){
        products = await Product.find( filter).and([{categoryID: req.params.id}]).sort('product_name')
    } else {
        products = await Product.find({categoryID: req.params.id}).sort('product_name')
    }

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({category, products, brands, wishlist, cart}))
})

router.post('/brands-filter/:id', async(req, res) => {
    let filter = []

    for (let prop in req.body) {
        if (mongoose.isValidObjectId(prop)) {

        // no sub brand
            if (prop.toString() === req.body[prop].toString()){
                filter.push({brandID: prop})
            } else {
                filter.push({subBrandID: req.body[prop]})
            }
        }
    }

    let products;
    if (filter.length>0){
        products = await Product.find().or(filter).sort('product_name')
    } else {
        products = await Product.find({categoryID: req.params.id}).sort('product_name')
    }

    const category = await Category.findById(req.params.id).select('category_name');

    const brands = await Brand.find().sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(seeAllTemplate({category, products, brands, wishlist, cart}))
})

module.exports = router;