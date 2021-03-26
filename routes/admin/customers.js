const viewCustomersTemplate = require('../../views/admin/customers/index');
const {Customer } = require('../../models/customers');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(viewCustomersTemplate({customers}));
})


module.exports = router;