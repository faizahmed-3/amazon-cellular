const errorPage = require('../views/404')
const winston = require('winston');
const {getModals} = require("../middlewares/otherFunctions");
const {Wishlist} = require("../models/wishlist");
const {Cart} = require("../models/cart");

module.exports = async function (err, req, res, next) {
    winston.error(err.message, {metadata: err});

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    // res.status(500).send(err.message);
    res.status(500).send(errorPage({req, wishlist, cart, err}));
}