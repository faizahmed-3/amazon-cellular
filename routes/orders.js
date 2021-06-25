const {emailOrderStatus} = require('../middlewares/otherFunctions')
const _ = require('lodash');
const {accessToken, stkPush} = require('../middlewares/mpesa')
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const {Order} = require('../models/admin/orders')
const {Customer} = require('../models/customers')
const ordersTemplate = require('../views/orders');
const express = require('express');
const router = express.Router();

async function placeOrder(req, res) {
    if (req.session.newOrder){
        let checkOrder = await Cart.findById(req.session.cartID);

        if (checkOrder.products.length > 0){
            const updateCart = await Cart.findById(req.session.cartID).populate('products._id', ' product_name price');

            const products = updateCart.products.map(
                product => {
                    return {
                        product_name: product._id.product_name,
                        price: product._id.price,
                        quantity: product.quantity
                    }
                }
            )

            let order = new Order({
                total: updateCart.total + 500,
                products: products
            });

            await Cart.findByIdAndUpdate(req.session.cartID, {
                products: [],
                total: 0
            }, {new: true})

            const customer = await Customer.find({email: req.session.email})

            order.customerID = customer[0]._id;

            order.orderStatus = 'Order placed';

            order.mpesa = req.session.mpesa;

            order = await order.save()

            emailOrderStatus(order, customer[0].email, customer[0].full_name).catch(console.error);

            return Order.find({customerID: order.customerID}).sort('-orderDate')
        }
        else {
            req.session.newOrder = false
            res.redirect('/orders')
        }

    } else {
        const customer = await Customer.find({email: req.session.email})

        return Order.find({customerID: customer[0]._id}).sort('-orderDate');
    }
}

router.get('/', async (req, res) => {
    const orders = await placeOrder(req, res)

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(ordersTemplate({req, orders, wishlist, cart}))
})

router.post('/', async (req, res) => {

    req.session.mpesa = req.body.mpesa.toString();

    req.session.newOrder = true;

    if (req.session.mpesa === 'false') {
        const orders = await placeOrder(req, res);

        req.session.newOrder = false;

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)

        res.send(ordersTemplate({req, orders, wishlist, cart}))
    } else if (req.session.mpesa === 'true') {
        req.session.newOrder = false;
        console.log(req.session.newOrder);

        res.redirect('/orders/mpesa')
    }
})

router.get('/mpesa', accessToken, stkPush)

router.post('/paying', async (req, res) => {
    const paymentResults = req.body.Body.stkCallback;

    console.log('Paying...')
    console.log(paymentResults);

    if (paymentResults.ResultCode === 0) {
        console.log('payment successful')
        console.log(paymentResults.CallbackMetadata)
        res.redirect('/orders')

    } else {
        console.log('payment failed')
        req.session.paymentError = paymentResults.ResultDesc;
        res.redirect('/checkout');
    }

})

module.exports = router;