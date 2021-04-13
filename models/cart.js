const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    cartTotal: {
        type: Number
    }
})

const Cart = mongoose.model('Cart', cartSchema);


exports.Cart = Cart;