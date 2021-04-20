const mongoose = require('mongoose');
const viewBrandsTemplate = require('../../views/admin/brands/index');
const addBrandTemplate = require('../../views/admin/brands/new');
const editBrandTemplate = require('../../views/admin/brands/edit');
const {Brand, validate} = require('../../models/admin/brands');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const brands = await Brand.find().sort('brand_name');
    res.send(viewBrandsTemplate({brands}));
});

router.get('/new', (req, res) => {
    res.send(addBrandTemplate({}));
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addBrandTemplate({input: req.body, error: error.details[0]}));

    let brand;

    switch (req.body.subBrand) {
        case('false'):
            brand = new Brand({
                brand_name: req.body.brand_name,
            })
            break;

        case('true'):
            if (typeof req.body.subBrandItems === "string") {
                if (req.body.subBrandItems.length > 0) {
                    brand = new Brand({
                        brand_name: req.body.brand_name,
                        subBrands: [{
                            subBrandName: req.body.subBrandItems
                        }]
                    })
                }
            } else if (typeof req.body.subBrandItems === "object") {
                const subBrandArrayFiltered = req.body.subBrandItems.filter(
                    item => item.length > 0
                )

                const subBrandArray = subBrandArrayFiltered.map(item => {
                    return {subBrandName: item}
                })

                brand = new Brand({
                    brand_name: req.body.brand_name,
                    subBrands: subBrandArray
                })
            }
            break;
    }

    await brand.save();

    res.redirect('/admin/brands');
});

router.post('/copy', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(addBrandTemplate({input: req.body, error: error.details[0]}));

    let brand;

    switch (req.body.subBrand) {
        case('false'):
            brand = new Brand({
                brand_name: req.body.brand_name,
            })
            break;

        case('true'):
            if (typeof req.body.subBrandItems === "string") {
                if (req.body.subBrandItems.length > 0) {
                    brand = new Brand({
                        brand_name: req.body.brand_name,
                        subBrands: [{
                            subBrandName: req.body.subBrandItems
                        }]
                    })
                }
            } else if (typeof req.body.subBrandItems === "object") {
                const subBrandArrayFiltered = req.body.subBrandItems.filter(
                    item => item.length > 0
                )

                const subBrandArray = subBrandArrayFiltered.map(item => {
                    return {subBrandName: item}
                })

                brand = new Brand({
                    brand_name: req.body.brand_name,
                    subBrands: subBrandArray
                })
            }
            break;
    }

    await brand.save();

    res.send(addBrandTemplate({input: req.body}))
});

router.get('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    res.send(editBrandTemplate({brand}));
});

router.post('/edit/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    let brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(editBrandTemplate({brand, error: error.details[0]}));

    let existingItemsArray, userItemsArray, difference;

    switch (req.body.subBrand) {
        case('false'):
            brand = await Brand.findByIdAndUpdate(req.params.id, {
                brand_name: req.body.brand_name,
            }, {new: true})

            //deleting existing sub brands
                existingItemsArray = brand.subBrands.map(subBrand => {
                    return subBrand._id.toString()
                })

                userItemsArray = []

                for (let prop in req.body) {
                    if (mongoose.isValidObjectId(prop)) {
                        userItemsArray.push(prop)
                    }
                }

                difference = existingItemsArray.filter(x => !userItemsArray.includes(x));

                difference.forEach(toDelete => {
                    brand.subBrands = brand.subBrands.filter(subBrand => subBrand._id.toString() !== toDelete);
                })

                await brand.save()

            break;

        case('true'):

            //deleting existing sub brands
             existingItemsArray = brand.subBrands.map(subBrand => {
                return subBrand._id.toString()
            })

             userItemsArray = []

            for (let prop in req.body) {
                if (mongoose.isValidObjectId(prop)) {
                    userItemsArray.push(prop)
                }
            }

             difference = existingItemsArray.filter(x => !userItemsArray.includes(x));

            difference.forEach(toDelete => {
                brand.subBrands = brand.subBrands.filter(subBrand => subBrand._id.toString() !== toDelete);
            })

            await brand.save()

            //editing existing
            for (let prop in req.body) {
                if (mongoose.isValidObjectId(prop)) {
                    let subBrand = brand.subBrands.id(prop);
                    if (subBrand.subBrandName !== req.body[prop]) {
                        subBrand.subBrandName = req.body[prop];
                    }
                }
            }

            await brand.save()

            //adding new sub brands
            if (typeof req.body.subBrandItems === "string") {
                if (req.body.subBrandItems.length > 0) {
                    brand = await Brand.findByIdAndUpdate(req.params.id, {
                        brand_name: req.body.brand_name,
                        $push: {
                            subBrands: {
                                subBrandName: req.body.subBrandItems
                            }
                        }
                    })
                }
            } else if (typeof req.body.subBrandItems === "object") {
                const subBrandArrayFiltered = req.body.subBrandItems.filter(
                    item => item.length > 0
                )

                const subBrandArray = subBrandArrayFiltered.map(item => {
                    return {subBrandName: item}
                })

                let subBrands = brand.subBrands;
                brand = await Brand.findByIdAndUpdate(req.params.id, {
                    brand_name: req.body.brand_name,
                    subBrands: subBrands.concat(subBrandArray)
                })
            } else {
                brand = await Brand.findByIdAndUpdate(req.params.id, {
                    brand_name: req.body.brand_name,
                }, {new: true})

            }

    }

    await brand.save()

    res.redirect('/admin/brands');

});

router.post('/delete/:id', async (req, res) => {
    const valid = mongoose.isValidObjectId(req.params.id);
    if (!valid) return res.status(400).send('Invalid ID passed');

    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(400).send(`Sorry, that brand doesn't exist`);

    res.redirect('/admin/brands');
})

module.exports = router;