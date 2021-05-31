const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const localstorage = require('local-storage');
const jwt = require('jsonwebtoken');
const config = require('config');
const loginTemplate = require('../views/login');

module.exports =async function (req, res, next) {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    let token = localstorage.get( 'token' )
    if (!token) {
        req.session.checkout = true;
        req.session.notLoggedCart = req.body;
        return res.status(401).send(loginTemplate({wishlist, cart}))
    }

    try{
        req.customer = jwt.verify(token, config.get('JWTKEY'));
        req.session.checkout = false;
        req.session.loggedInCart = req.body;
        next()
    } catch (e) {
        res.status(400).send('invalid token')
    }

}