const loginTemplate = require('../views/login');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Customer} = require('../models/customers');

router.get('/', (req, res) => {
    res.send(loginTemplate())
})


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');


    const token = customer.generateAuthToken();

    res.header('x-auth-token', token).redirect('/');
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    })

    return schema.validate(req);
}


module.exports = router;