const express = require('express');
const cookieSession = require('cookie-session');
const error = require('../middlewares/error');
const adminLoginMW = require('../middlewares/adminLoginMW');
const adminLogin = require('../routes/admin/login');
const admins = require('../routes/admin/admins');
const adminProducts = require('../routes/admin/products');
const adminCategories = require('../routes/admin/categories');
const adminBrands = require('../routes/admin/brands');
const adminSpecial= require('../routes/admin/special');
const adminOrders= require('../routes/admin/orders');
const adminSettings= require('../routes/admin/settings');
const homepage = require('../routes/index');
const register = require('../routes/register');
const login = require('../routes/login');
const wishlist = require('../routes/wishlist');
const cart = require('../routes/cart');
const checkout = require('../routes/checkout');
const orders = require('../routes/orders');
const search = require('../routes/search');
const contact = require('../routes/contact');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieSession({
        name: 'session',
        keys:['cookieSessionKey']
    }));
    app.use('/register', register);
    app.use('/login', login);
    app.use('/wishlist', wishlist);
    app.use('/cart', cart);
    app.use('/checkout', checkout);
    app.use('/orders', orders);
    app.use('/search', search);
    app.use('/contact', contact);
    app.use('/', homepage);
    app.use('/admin/login', adminLogin);
    app.use(adminLoginMW)
    app.use('/admin/admins', admins);
    app.use('/admin/products', adminProducts);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/brands', adminBrands);
    app.use('/admin/special', adminSpecial);
    app.use('/admin/orders', adminOrders);
    app.use('/admin/settings', adminSettings);


    app.use(error);
}