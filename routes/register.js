const {getModals, emailRegistration} = require('../middlewares/otherFunctions');
const {Wishlist} = require('../models/wishlist')
const {Cart} = require('../models/cart')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const registerTemplate = require('../views/register');
const editTemplate = require('../views/edit-customer');
const checkoutTemplate = require('../views/checkout');
const {Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    if (req.headers.referer){
        req.session.signUpIn = req.headers.referer.split(req.headers.host).pop()
    }

    res.send(registerTemplate({req, wishlist, cart}));
})

router.post('/', async(req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

   const {error} = validate(req.body);
   if (error) return res.status(400).send(registerTemplate({req, input: req.body, error: error.details[0], wishlist, cart}))

   let customer = await Customer.findOne({email: req.body.email});
   if (customer) return res.status(400).send(registerTemplate({req, exists: true, wishlist, cart}))

    customer = new Customer(
       _.pick(req.body, ['full_name', 'email', 'phone', 'password', 'latitude', 'longitude'])
   );

    const salt = await bcrypt.genSalt(10);

    customer.password = await bcrypt.hash(customer.password, salt);

    customer = await customer.save();

    const token = customer.generateLoginToken();

    req.session.full_name = customer.full_name;

    req.session.email = customer.email;

    req.session.token = token;

    // await emailRegistration(customer).catch(console.error)

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

router.get('/edit', async (req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const customer = await Customer.find({email: req.session.email})

    res.send(editTemplate({req, customer: customer[0], wishlist, cart}));
})

router.post('/edit', async(req, res) => {
    let [wishlist, cart] = await getModals(req, Wishlist, Cart)

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editTemplate({req, input: req.body, error: error.details[0], wishlist, cart}))

    let customer = await Customer.findOneAndUpdate({email: req.session.email}, {
        full_name: req.body.full_name,
        phone: req.body.phone,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }, {new: true})

    const token = customer.generateLoginToken();

    req.session.full_name = customer.full_name;

    req.session.email = customer.email;

    req.session.token = token;

    res.send(checkoutTemplate({req, customer, wishlist, cart}))
})

module.exports = router;