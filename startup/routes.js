const express = require('express');
const error = require('../middlewares/error');
const adminProducts = require('../routes/admin/products');
const adminCategories = require('../routes/admin/categories');
const adminBrands = require('../routes/admin/brands');
const adminCustomers = require('../routes/admin/customers');
const homepage = require('../routes/');
const register = require('../routes/register');
const login = require('../routes/login');


module.exports = function (app) {
    app.use(express.urlencoded({extended: true}));
    app.use('/admin/products', adminProducts);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/brands', adminBrands);
    app.use('/admin/customers', adminCustomers);
    app.use('/', homepage);
    app.use('/register', register);
    app.use('/login', login);
    app.use(error);
}