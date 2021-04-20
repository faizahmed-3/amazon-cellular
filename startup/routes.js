const express = require('express');
const cookieSession = require('cookie-session');
const error = require('../middlewares/error');
const adminProducts = require('../routes/admin/products');
const adminCategories = require('../routes/admin/categories');
const adminBrands = require('../routes/admin/brands');
const adminSpecial= require('../routes/admin/special');
const homepage = require('../routes/');
const register = require('../routes/register');
const login = require('../routes/login');
const wishlist = require('../routes/wishlist');
const cart = require('../routes/cart');



module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieSession({
        name: 'session',
        keys:['cookieSessionKey']
    }));
    app.use('/admin/products', adminProducts);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/brands', adminBrands);
    app.use('/admin/special', adminSpecial);
    app.use('/', homepage);
    app.use('/register', register);
    app.use('/login', login);
    app.use('/wishlist', wishlist);
    app.use('/cart', cart);

    app.use(error);
}