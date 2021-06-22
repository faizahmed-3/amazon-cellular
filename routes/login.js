const {getModals} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const sessionstorage = require('sessionstorage');
const loginTemplate = require('../views/login');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Customer} = require('../models/customers');

router.get('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    req.session.signUpIn = req.headers.referer.split(req.headers.host).pop()

    res.send(loginTemplate({wishlist, cart}))
})

router.post('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const {error} = validate(req.body);
    if (error) return res.status(400).send(loginTemplate({input: req.body, error: error.details[0], wishlist, cart}))

    let customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(400).send(loginTemplate({incorrect: true, wishlist, cart}));

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send(loginTemplate({incorrect: true, wishlist, cart}));

    const token = customer.generateLoginToken();

    sessionstorage.setItem( "full_name", customer.full_name );

    sessionstorage.setItem( "email", customer.email );

    sessionstorage.setItem( "token", token );

    if (req.session.checkout){
        res.redirect('/checkout')
    } else if (req.session.signUpIn === '/register' || req.session.signUpIn === '/login'){
        res.redirect('/')
    } else {
        res.redirect(req.session.signUpIn)
    }

    req.session.signUpIn = null;
    req.session.checkout = false;
})

router.get('/logout', (req, res) => {
    sessionstorage.setItem( "token", null );
    sessionstorage.setItem( "email", null );
    sessionstorage.setItem( "full_name", null );
    req.session.checkout = false;

    res.redirect('/')
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(req, options);
}

module.exports = router;