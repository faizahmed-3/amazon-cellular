const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        price: Number,
        product_name: String
    }],
    total: {
        type: Number,
        default: 0
    },
    shopTotal: {
        type: Number,
        default: 0
    },
    delivery_fee: Number,
    address: {
        latitude: Number,
        longitude: Number
    },
    orderStatus: String,
    shippingDate: {
        type: Date,
    },
    mpesa: String,
    mpesaDetails: {
        amount: Number,
        mpesaCode: String,
        transactionDate: String,
        phone: Number
    },
    orderType: {
        type: String,
        default: 'From user'
    },
    new:{
        type: Boolean,
        default: true
    },
    processed:{
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', ordersSchema);

exports.Order = Order;

