const _ = require('lodash');
const bcrypt = require('bcrypt');
const registerTemplate = require('../views/register');
const {Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send(registerTemplate());
})


router.post('/', async(req, res) => {
   const {error} = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const customer = new Customer(
       _.pick(req.body, ['fullName', 'email', 'phone', 'password', 'county', 'town', 'street'])
   );

    const salt = await bcrypt.genSalt(10);

    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save();

    const token = customer.generateAuthToken();

    res.header('x-auth-token', token).redirect('/');
})


module.exports = router;