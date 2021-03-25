const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    categoryID: mongoose.Schema.Types.ObjectId,
    specialID: mongoose.Schema.Types.ObjectId,
    brandID: mongoose.Schema.Types.ObjectId,
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
    images: {
        data: Buffer,
        contentType: String
    },
    status: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    unitsSold: {
        type: Number,
        min: 0,
        default: 0
    },
    income: {
        type: Number,
        min: 0,
        default: 0
    }
});


const Product = mongoose.model('Product', productSchema);

function validate(product) {
    const schema =Joi.object({
        name: Joi.string().required().min(3).max(255),
        colour: Joi.string().min(3).max(255),
        material: Joi.string().min(3).max(255),
        description: Joi.string().min(3).max(255),
        inBox: Joi.string().min(3).max(255),
        quantity: Joi.number(),
        price: Joi.number(),
        discountPrice: Joi.number(),
        discountStart: Joi.date(),
        discountEnd: Joi.date(),
        status: Joi.boolean()
    });
    return schema.validate(product);
}


exports.Product = Product;
exports.validate = validate;