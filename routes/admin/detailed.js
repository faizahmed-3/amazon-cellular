const {Product} = require('../../models/admin/products');
const viewDetailedTemplate = require('../../views/admin/detailed');
const express = require('express');
const _ = require("lodash");
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().collation({locale: "en" }).sort('product_name');

    res.send(viewDetailedTemplate({products}));
});

router.post('/',  async (req, res) => {
    if (req.body.selling > 0){
        await Product.findByIdAndUpdate(req.body.id,
            _.pick(req.body, ['bp', 'rate', 'buying', 'selling', 'shop_price', 'price']),
            {new: true});
    } else{
        await Product.findByIdAndUpdate(req.body.id,
            _.pick(req.body, ['shop_price', 'price']),
            {new: true});
    }
    res.redirect('/admin/detailed')
})

module.exports = router;