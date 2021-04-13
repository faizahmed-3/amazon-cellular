const mongoose = require('mongoose');
const cartTemplate = require('../views/cart');
const {Cart} = require('../models/cart');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const cart = await Cart.findById(req.session.cartID).populate('products._id', '_id productName price discountPrice');

    res.send(cartTemplate({cart: cart.products}));
})

router.post('/:id', async (req, res) => {
    let cart;

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        req.session.cartID = cart._id;
    } else {
        cart = await Cart.findById(req.session.cartID);
    }

    const product = cart.products.id(req.params.id);


    if (!product){
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $push: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})
    }

    await cart.save();

    res.redirect('back')
})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    await Cart.findByIdAndUpdate(req.session.cartID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    res.redirect('/cart');
})

module.exports = router;