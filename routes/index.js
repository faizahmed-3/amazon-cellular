const {Product} = require('../models/admin/products');
const homepageTemplate = require('../views/index');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const products = await Product.find().sort('productName');
    res.send(homepageTemplate({products}));
})

module.exports = router;