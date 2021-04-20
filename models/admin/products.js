const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    specialCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecialCategory'
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
        product_name: Joi.string().min(3).max(255).required(),
        colour: Joi.string().min(3).max(255).required(),
        Material: Joi.string().min(3).max(255),
        Description: Joi.string().min(3).max(255),
        InBox: Joi.string().min(3).max(255),
        Quantity: Joi.number(),
        Price: Joi.number(),
        DiscountPrice: Joi.number(),
        DiscountStart: Joi.date(),
        DiscountEnd: Joi.date(),
        Status: Joi.boolean()
    });

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(product, options);
}


exports.Product = Product;
exports.validate = validate;