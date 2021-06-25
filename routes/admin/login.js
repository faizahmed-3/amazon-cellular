const {Admin, validateLogin} = require('../../models/admin/admins');
const loginTemplate = require('../../views/admin/login');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(loginTemplate({}))
})

router.post('/', async (req, res) => {
    const {error} = validateLogin(req.body);
    if (error) return res.status(400).send(loginTemplate({ input: req.body, error: error.details[0]}))

    let admin = await Admin.findOne({email: req.body.email});
    if (!admin) return res.status(400).send(loginTemplate({incorrect: true}));

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword) return res.status(400).send(loginTemplate({incorrect: true}));

    req.session.adminToken = admin.generateLoginToken();

    if (req.session.originalRoute){
        res.redirect(req.session.originalRoute)
        req.session.originalRoute = null
    } else{
        res.redirect('/admin/dashboard')
    }


})

router.get('/logout', (req, res) => {

    req.session.adminToken = null;
    req.session.originalRoute = null

    res.redirect('/admin/login')
})

module.exports = router;