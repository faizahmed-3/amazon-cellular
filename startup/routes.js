const express = require('express');
const error = require('../middlewares/error');
const adminProducts = require('../routes/admin/products');
const adminCategories = require('../routes/admin/categories');
const adminBrands = require('../routes/admin/brands');
const homepage = require('../routes/');


module.exports = function (app) {
    app.use(express.urlencoded({extended: true}));
    app.use('/admin/products', adminProducts);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/brands', adminBrands);
    app.use('/', homepage);
    app.use(error);
}