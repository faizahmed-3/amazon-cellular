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
        quantity: Number,
        price: Number,
        product_name: String
    }],
    total: {
        type: Number
    },
    orderStatus: String,
    shippingDate: {
        type: Date,
    },
    mpesa: String,
    mpesaDetails: {
        amount: Number,
        mpesaCode: String,
        transactionDate: Date
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

