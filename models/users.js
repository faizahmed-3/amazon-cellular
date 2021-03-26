const mongoose = require('mongoose');
const Joi =  require('joi');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        // unique: true
    },
    phone: {
        type: Number,
        min: 0,
        trim: true,
        // unique: true
    },
    password: {
        type: String,
        // minlength: 8,
        trim: true,
    },
    county: {
        type: String,
        // minlength: 3,
        // maxlength: 255,
        // trim: true,
    },
    town: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    street: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    orderNotes: {
        type: String,
        minlength: 3,
        trim: true,
    },
    cartID: {
        type: mongoose.Types.ObjectId,
        ref: 'Cart'
    },
    wishlistID: {
        type: mongoose.Types.ObjectId,
        ref: 'Wishlist'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);


function validate(user) {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(255),
        email: Joi.string().email().min(3).max(255),
        phone: Joi.number(),
        password: Joi.string().min(8).max(50),
        passwordRepeat: Joi.ref('password'),
        county: Joi.string().min(3).max(255),
        town: Joi.string().min(3).max(255),
        street: Joi.string().min(3).max(255),
    })
    return schema.validate(user);
}


exports.User = User;
exports.validate = validate;
