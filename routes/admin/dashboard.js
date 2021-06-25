const {Order} = require('../../models/admin/orders')
const dashboardTemplate = require('../../views/admin/dashboard');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone').limit(5)
    res.send(dashboardTemplate({orders}));
})


module.exports = router;