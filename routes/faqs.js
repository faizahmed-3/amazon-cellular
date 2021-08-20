const faqTemplate = require('../views/faqs')
const {getModals} = require("../middlewares/otherFunctions");
const {Wishlist} = require("../models/wishlist");
const {Cart} = require("../models/cart");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.faq){
        req.session.faq = 'default'
    }

    let [wishlist, cart] = await getModals(req, Wishlist, Cart)
    
    res.send(faqTemplate({req, wishlist, cart, header: req.session.faq}))
})

router.get('/about', (req, res) => {
    req.session.faq = 'about';

    res.redirect('/faqs')
})

router.get('/reg', (req, res) => {
    req.session.faq = 'reg';

    res.redirect('/faqs')
})

router.get('/search', (req, res) => {
    req.session.faq = 'search';

    res.redirect('/faqs')
})

router.get('/add', (req, res) => {
    req.session.faq = 'add';

    res.redirect('/faqs')
})

router.get('/checkout', (req, res) => {
    req.session.faq = 'checkout';

    res.redirect('/faqs')
})

router.get('/deliveries', (req, res) => {
    req.session.faq = 'deliveries';

    res.redirect('/faqs')
})

router.get('/return', (req, res) => {
    req.session.faq = 'return';

    res.redirect('/faqs')
})

module.exports = router;