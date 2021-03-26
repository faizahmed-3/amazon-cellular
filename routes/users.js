const _ = require('lodash');
const bcrypt = require('bcrypt');
const registerTemplate = require('../views/register');
const viewUsersTemplate = require('../views/admin/users/index');
const {User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const users = await User.find().sort('name');
    res.send(viewUsersTemplate({users}));
})


router.get('/register', (req, res) => {
    res.send(registerTemplate());
})


router.post('/register', async(req, res) => {
   const {error} = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const user = new User(
       _.pick(req.body, ['fullName', 'email', 'phone', 'password', 'county', 'town', 'street'])
   );

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.redirect('/');
})




module.exports = router;