const {Product, validate} = require('../../models/products');
const addNewProductTemplate = require('../../views/admin/products/new');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(addNewProductTemplate());
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({productName: req.body.name});

    await product.save();

    res.send(product);
})

module.exports = router;