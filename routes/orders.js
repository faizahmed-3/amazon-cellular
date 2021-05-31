const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const ordersTemplate = require('../views/orders');
const express = require('express');
const router = express.Router();

router.post('/',  async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    console.log(req.body);

    res.send(ordersTemplate({ wishlist, cart}))
})

module.exports = router;