const sessionstorage = require('sessionstorage');
const mongoose = require('mongoose');
const {Product} = require('../models/admin/products');
const {Cart} = require('../models/cart');
const {Wishlist} = require('../models/wishlist');
const express = require('express');
const router = express.Router();

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
    } else {
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $pull: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})
    }

    await cart.save();

    sessionstorage.setItem( "cartCount", cart.products.length );

    res.redirect('back')
})

router.post('/from-wish/:id', async (req, res) => {
    let cart;

    if (!req.session.cartID){
        cart = new Cart();
        cart = await cart.save();
        req.session.cartID = cart._id;
    } else {
        cart = await Cart.findById(req.session.cartID);
    }

    const product = cart.products.id(req.params.id);

    const actualProduct = await Product.findById(req.params.id);

    if (!product){
        cart = await Cart.findByIdAndUpdate(req.session.cartID, {
            $push: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})

        cart.total += actualProduct.price;
    }

    await cart.save();

    sessionstorage.setItem( "cartCount", cart.products.length );

    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const wishlist = await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    sessionstorage.setItem( "wishlistCount", wishlist.products.length );

    res.redirect('back');

})

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let cart = await Cart.findById(req.session.cartID).populate('products._id', '_id product_name price product_images');

    const product = cart.products.id(req.params.id);

    const productPrice = product.quantity * product._id.price;

    cart = await Cart.findByIdAndUpdate(req.session.cartID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    cart.total -= productPrice;

    await cart.save()

    sessionstorage.setItem( "cartCount", cart.products.length );

    res.redirect('back');
})

module.exports = router;