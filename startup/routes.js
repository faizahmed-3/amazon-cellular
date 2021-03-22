const express = require('express');
const error = require('../middlewares/error');
const adminProducts = require('../routes/admin/products');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/admin/products', adminProducts);
    app.use(error);
}