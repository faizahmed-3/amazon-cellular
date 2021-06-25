const mongoose = require('mongoose');
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
    let order = await Order.findById(req.params.id)

    if (!order.processed){
        let products = []

        switch ((typeof req.body.productID).toString()) {
            case 'string':
                products.push({
                    _id: mongoose.Types.ObjectId(req.body.productID),
                    product_name: req.body.product_name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                })
                break;

            case 'object':
                for (let i=0; i<req.body.productID.length; i++){
                    products.push({
                        _id: mongoose.Types.ObjectId(req.body.productID[i]),
                        product_name: req.body.product_name[i],
                        price: req.body.price[i],
                        quantity: req.body.quantity[i],
                    })
                }
                break;
        }

        order = await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: req.body.orderStatus,
            products: products,
            total: req.body.orderOutput,
            new: false
        }, {new: true}).populate('customerID', 'email phone full_name');

        emailOrderStatus(order, order.customerID.email, order.customerID.full_name).catch(console.error);
    }

    if (order.orderStatus.toLowerCase() === 'delivered' || order.orderStatus.toLowerCase() === 'cancelled'){
        order.processed = true
        await order.save()
    }

    res.redirect('/admin/orders/')
})

module.exports = router;