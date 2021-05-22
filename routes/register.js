const localstorage = require('local-storage');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const registerTemplate = require('../views/register');
const {Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(registerTemplate({}));
})

router.post('/', async(req, res) => {

   const {error} = validate(req.body);
   if (error) return res.status(400).send(registerTemplate({input: req.body, error: error.details[0]}))

   let customer = await Customer.findOne({email: req.body.email});
   if (customer) return res.status(400).send(registerTemplate({exists: true}))

    customer = new Customer(
       _.pick(req.body, ['full_name', 'email', 'phone', 'password', 'latitude', 'longitude'])
   );

    const salt = await bcrypt.genSalt(10);

    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save();

    const token = customer.generateLoginToken();

    localstorage.set( "full_name", customer.full_name );

    localstorage.set( "token", token );

    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
})

module.exports = router;