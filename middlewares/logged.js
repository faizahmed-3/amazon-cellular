const localstorage = require('local-storage');
const jwt = require('jsonwebtoken');
const config = require('config');
const loginTemplate = require('../views/login');

module.exports = function (req, res, next) {
    let token = localstorage.get( 'token' )
    if (!token) return res.status(401).send(loginTemplate({}))

    try{
        req.customer = jwt.verify(token, config.get('JWTKEY'));
        req.session.returnTo = req.originalUrl;
        next()
    } catch (e) {
        res.status(400).send('invalid token')
    }

}