const {emailOrderStatus} = require('../../middlewares/otherFunctions')
const viewOrdersTemplate = require('../../views/admin/orders/index');
const newOrderTemplate = require('../../views/admin/orders/new');
const editOrderTemplate = require('../../views/admin/orders/edit');
const {Order} = require('../../models/admin/orders');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone');

    res.send(viewOrdersTemplate({orders}));
});

router.get('/new', (req, res) => {
    res.send(newOrderTemplate({}));
});

router.get('/edit/:id', async(req, res) => {
    const order = await Order.findById(req.params.id).populate('customerID', 'email phone');

    res.send(editOrderTemplate({order}))
})

router.post('/edit/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        orderStatus: req.body.orderStatus
    }, {new: true}).populate('customerID', 'email phone full_name');

    emailOrderStatus(order, order.customerID.email, order.customerID.full_name).catch(console.error);

    res.redirect('/admin/orders/')
})

module.exports = router;