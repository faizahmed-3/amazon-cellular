const {Customer} = require('../../models/customers')
const {Product} = require('../../models/admin/products')
const {Order} = require('../../models/admin/orders')
const dashboardTemplate = require('../../views/admin/dashboard');
const express = require('express');
const router = express.Router();

function returnTotal(query, totalFor) {
    let sum = 0;
    query.forEach(
        queryItem => {
            sum += queryItem[totalFor]
        }
    )
    return sum
}

router.get('/', async(req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone')

    const products = await Product.find().select('income unitsSold')

    const income = returnTotal(products, 'income')

    const unitsSold = returnTotal(products, 'unitsSold')

    const totalProducts = await Product.find({status: true}).countDocuments()

    const customers = await Customer.find().countDocuments()

    const best = await Product.find().sort('-income').limit(20)

    const worst = await Product.find().sort('income').limit(20)

    res.send(dashboardTemplate({orders, income, unitsSold, totalProducts, customers ,best, worst}));
})


module.exports = router;