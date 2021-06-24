const {getModals} = require('../middlewares/otherFunctions');
const {Brand} = require('../models/admin/brands');
const {Wishlist} = require('../models/wishlist');
const {Cart} = require('../models/cart');
const searchTemplate = require('../views/search');
const {Product} = require('../models/admin/products');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {

    const products = await Product.find({product_name: new RegExp('.*' + req.query.query + '.*', 'i')}).sort('dateCreated');

    const brands = await Brand.find().sort('brand_name');

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(searchTemplate({req,  query: req.query.query, products, brands, wishlist, cart}))
})

module.exports = router;