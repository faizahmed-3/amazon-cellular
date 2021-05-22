const localstorage = require('local-storage');
const loginTemplate = require('../views/login');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Customer} = require('../models/customers');

router.get('/', (req, res) => {
    res.send(loginTemplate({}))
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(loginTemplate({input: req.body, error: error.details[0]}))

    let customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(400).send(loginTemplate({incorrect: true}));

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send(loginTemplate({error: true}));

    const token = customer.generateLoginToken();

    localstorage.set( "full_name", customer.full_name );

    localstorage.set( "token", token );

    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
})

router.get('/logout', (req, res) => {
    localstorage.set( "token", null );
    localstorage.set( "full_name", null );

    res.redirect('back')
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