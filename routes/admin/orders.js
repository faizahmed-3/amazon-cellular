const mongoose = require('mongoose');
const {emailOrderStatus, emailLowQuantity} = require('../../middlewares/otherFunctions')
const viewOrdersTemplate = require('../../views/admin/orders/index');
const newOrderTemplate = require('../../views/admin/orders/new');
const editOrderTemplate = require('../../views/admin/orders/edit');
const {Customer} = require('../../models/customers');
const {Order} = require('../../models/admin/orders');
const {Product} = require('../../models/admin/products');
const {Category} = require('../../models/admin/categories');
const {Brand} = require('../../models/admin/brands');
const {Special} = require('../../models/admin/special');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-orderDate').populate('customerID', 'email phone');

    res.send(viewOrdersTemplate({orders}));
});

router.get('/new', (req, res) => {
    res.send(newOrderTemplate({}));
});

router.get('/edit/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('customerID', 'email phone');

    res.send(editOrderTemplate({order}))
})

router.post('/edit/:id', async (req, res) => {
    let order = await Order.findById(req.params.id)

    if (!order.processed) {
        let products = []

        switch ((typeof req.body.productID).toString()) {
            case 'string':
                products.push({
                    productID: mongoose.Types.ObjectId(req.body.productID),
                    product_name: req.body.product_name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                })
                break;

            case 'object':
                for (let i = 0; i < req.body.productID.length; i++) {
                    products.push({
                        productID: mongoose.Types.ObjectId(req.body.productID[i]),
                        product_name: req.body.product_name[i],
                        price: req.body.price[i],
                        quantity: req.body.quantity[i],
                    })
                }
                break;
        }

        order = await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: req.body.orderStatus,
            products: products,
            total: req.body.orderOutput,
            new: false
        }, {new: true}).populate('customerID', 'email phone full_name');

        await emailOrderStatus(order, order.customerID.email, order.customerID.full_name).catch(console.error);
    }

    if (order.orderStatus.toLowerCase() === 'delivered') {
        for (let i = 0; i < order.products.length; i++) {
            let product = await Product.findById(order.products[i].productID)
            let income = (product.price - product.shop_price) * order.products[i].quantity;

            await Category.findByIdAndUpdate(product.categoryID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            await Special.findByIdAndUpdate(product.specialID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            await Brand.findByIdAndUpdate(product.brandID, {
                $inc: {income: income, unitsSold: order.products[i].quantity}
            }, {new: true})

            if (product.subBrandID) {
                let brand = await Brand.updateOne({_id: product.brandID, 'subBrands._id': product.subBrandID},
                    {
                        $inc: {
                            "subBrands.$.income": income, 'subBrands.$.unitsSold': order.products[i].quantity
                        }
                    }
                )
            }

            product = await Product.findByIdAndUpdate(order.products[i].productID, {
                $inc: {income: income, unitsSold: order.products[i].quantity, quantity: -order.products[i].quantity}
            }, {new: true})

            if (product.quantity<0){
                product.quantity = 0
                await product.save()
            }

            if (product.quantity<= 1){
                await emailLowQuantity(product).catch(console.error);
            }
        }
        order.processed = true
        await order.save()

        await Customer.findByIdAndUpdate(order.customerID, {
            $inc: {order_count: 1, income_gen: (order.total-order.shopTotal)}
        }, {new: true})
    }

    if (order.orderStatus.toLowerCase() === 'cancelled') {
        order.processed = true
        await order.save()
    }

    res.redirect('/admin/orders/')
})

module.exports = router;