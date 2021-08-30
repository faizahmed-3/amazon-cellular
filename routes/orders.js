const sessionstorage = require('sessionstorage');
const {emailOrderStatus} = require('../middlewares/otherFunctions')
const _ = require('lodash');
const {accessToken, stkPush} = require('../middlewares/mpesa')
const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const {Order} = require('../models/admin/orders')
const {Customer} = require('../models/customers')
const ordersTemplate = require('../views/orders');
const confirmTemplate = require('../views/confirm');
const express = require('express');
const router = express.Router();

sessionstorage.setItem('paymentResults', null)

async function placeOrder(req, res) {
    if (req.session.newOrder){
        let checkOrder = await Cart.findById(req.session.cartID);

        if (checkOrder.products.length > 0){
            const updateCart = await Cart.findById(req.session.cartID).populate('products._id', ' product_name price');

            const products = updateCart.products.map(
                product => {
                    return {
                        productID: product._id._id,
                        product_name: product._id.product_name,
                        price: product._id.price,
                        quantity: product.quantity
                    }
                }
            )

            let order = new Order({
                products: products
            });

            await Cart.findByIdAndUpdate(req.session.cartID, {
                products: [],
                total: 0
            }, {new: true})

            const customer = await Customer.find({email: req.session.email})

            order.customerID = customer[0]._id;

            order.orderStatus = 'Order placed';

            order.total = updateCart.total

            order.delivery_fee = customer[0].delivery_fee

            order.address = {latitude: customer[0].latitude, longitude: customer[0].longitude}

            console.log(order.address);

            if (sessionstorage.getItem('mpesaDetails')){
                order.mpesaDetails = sessionstorage.getItem('mpesaDetails');
                order.mpesa = req.session.mpesa;
            } else {
                order.mpesa = req.session.mpesa;
            }

            order = await order.save()

            // emailOrderStatus(order, customer[0].email, customer[0].full_name).catch(console.error);

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

    req.session.newOrder = false;

    req.session.mpesa = 'false';

    sessionstorage.setItem('paymentResults', null)

    sessionstorage.setItem('mpesaDetails', null)

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    res.send(ordersTemplate({req, orders, wishlist, cart}))
})

router.post('/', async (req, res) => {

    req.session.paymentError = null;

    req.session.mpesa = req.body.mpesa.toString();

    req.session.newOrder = true;

    sessionstorage.setItem('paymentResults', null)

    sessionstorage.setItem('mpesaDetails', null)

    if (req.session.mpesa === 'false') {
        const orders = await placeOrder(req, res);

        req.session.newOrder = false;

        let [wishlist, cart] = await getModals(req, Wishlist, Cart)

        res.send(ordersTemplate({req, orders, wishlist, cart}))
    } else if (req.session.mpesa === 'true') {
        console.log('going to mpesa')
        res.redirect('/orders/mpesa')
    }
})

router.get('/mpesa', accessToken, async(req, res) => {
    await stkPush(req, res)
})

router.post('/paying', async (req, res) => {
    sessionstorage.setItem('paymentResults', req.body.Body.stkCallback)

    console.log('Paying...')
    console.log(sessionstorage.getItem('paymentResults'));

    if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
        sessionstorage.setItem('mpesaDetails', {
            amount: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[0].Value,
            mpesaCode: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[1].Value,
            transactionDate: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[2].Value,
            phone: sessionstorage.getItem('paymentResults').CallbackMetadata.Item[3].Value,
        })
        console.log(sessionstorage.getItem('mpesaDetails'));
        console.log('payment successful')

    } else {
        console.log('payment failed')
    }

})

router.get('/confirm', (req, res) => {
    if (sessionstorage.getItem('paymentResults')){
        if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
            console.log('confirmation successful')
            console.log(sessionstorage.getItem('mpesaDetails'))
            res.redirect('/orders')
        } else {
            console.log('confirmation failed')
            res.send(confirmTemplate({confirmationError: true}))
        }
    } else {
        console.log('confirmation failed at else else')
        res.send(confirmTemplate({confirmationError: true}))
    }

})

router.get('/cancel', (req, res) => {

    if (sessionstorage.getItem('paymentResults')) {
        if (sessionstorage.getItem('paymentResults').ResultCode === 0) {
            console.log('confirmation successful')
            res.redirect('/orders')
        } else {
            console.log('cancel confirmation failed in if')
            req.session.paymentError = sessionstorage.getItem('paymentResults').ResultDesc
            res.redirect('/checkout')
        }
    } else {
        console.log('cancel confirmation failed outside if')
        req.session.paymentError = 'An error occured with the payment'
        res.redirect('/checkout')
    }

})


module.exports = router;