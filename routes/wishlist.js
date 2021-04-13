const mongoose = require('mongoose');
const wishlistTemplate = require('../views/wishlist');
const {Wishlist} = require('../models/wishlist');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const wishlist = await Wishlist.findById(req.session.wishlistID).populate('products._id', 'productName price discountPrice')

    res.send(wishlistTemplate({wishlist: wishlist.products}));
});

router.post('/:id', async (req, res) => {
    let wishlist;

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
    }

    await wishlist.save();

    res.redirect('back');
});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    await Wishlist.findByIdAndUpdate(req.session.wishlistID, {
        $pull: {
            products: {
                _id: req.params.id
            }
        }
    }, {new: true})

    res.redirect('/wishlist');
})





module.exports = router;
