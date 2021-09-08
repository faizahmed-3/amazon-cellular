const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
        unique: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    subBrandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    specialID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecialCategory'
    },
    description: {
        type: String,
        trim: true
    },
    inBox: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        min: 0,
        required:true
    },
    shop_price: {
        type: Number,
        min: 0,
        required:true
    },
    price: {
        type: Number,
        min: 0,
        required:true
    },
    status: {
        type: Boolean,
        default: false
    },
    product_images: [{
        filename: String,
        // destination: String,
        // size: Number
    }],
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
        categoryID: Joi.string().min(3).max(255),
        brandID: Joi.string().min(3).max(255),
        specialID: Joi.string().min(3).max(255),
        description: Joi.string().optional().allow(''),
        inBox: Joi.string().optional().allow(''),
        quantity: Joi.number().required(),
        shop_price: Joi.number().required(),
        price: Joi.number().greater(Joi.ref('shop_price')).required(),
        status: Joi.boolean()

    }).unknown(true);;

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