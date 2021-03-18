const mongoose = require('mongoose');
const Joi = require('joi');


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    colour: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    material: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    inBox: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    quantity: {
        type: Number,
        min: 0,
    },
    price: {
        type: Number,
        min: 0,
        // required:true
    },
    discountPrice: {
        type: Number,
        min: 0,
    },
    discountStart:{
        type: Date
    },
    discountEnd: {
        type: Date
    },
    Status: {
        type: Boolean
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    unitsSold: {
        type: Number,
        min: 0,
    },
    revenueGenerated: {
        type: Number,
        min: 0,
    }
});


const Product = mongoose.model('Product', productSchema);

function validate(product) {
    const schema =Joi.object({
        name: Joi.string().required().min(3).max(255)
    });
    return schema.validate(product);
}


exports.Product = Product;
exports.validate = validate;