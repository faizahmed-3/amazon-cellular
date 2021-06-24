const mongoose = require('mongoose');
const {Wishlist} = require('../models/wishlist');
const express = require('express');
const router = express.Router();

router.post('/:id', async (req, res) => {
    let wishlist = {};

    if (!req.session.wishlistID) {
        wishlist = new Wishlist();
        wishlist = await wishlist.save();
        req.session.wishlistID = wishlist._id;
    } else {
        wishlist = await Wishlist.findById(req.session.wishlistID);
    }

    const product = wishlist.products.id(req.params.id);

    if (!product) {
        wishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
            $push: {
                products: {
                    _id: req.params.id,
                }
            }
        }, {new: true})
    } else {
        wishlist = await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
            $pull: {
                products: {
                    _id: req.params.id
                }
            }
        }, {new: true})
    }

    await wishlist.save();

    req.session.wishlistCount = wishlist.products.length

    res.redirect('back');
});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const wishlist = await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    req.session.wishlistCount = wishlist.products.length

    res.redirect('back');
})

module.exports = router;
