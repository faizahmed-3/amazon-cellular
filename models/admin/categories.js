const Joi = require('joi');
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    productIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    topPicks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    unitsSold: {
        type: Number,
        min: 0,
        default: 0
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    income: {
        type: Number,
        min: 0,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', categoriesSchema);


function validate(category) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255)
    });
    return schema.validate(category);
}


exports.Category = Category;
exports.validate = validate;

