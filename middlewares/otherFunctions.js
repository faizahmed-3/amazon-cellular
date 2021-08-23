const nodemailer = require("nodemailer");
const {google} = require('googleapis')
const config = require('config');

function displayDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}/${month + 1}/${year}`
}

function getInput(input, key) {
    if (input) {
        if (input[key]) {
            return input[key];
        } else return ''
    } else return ''
}

function getError(error, key) {
    if (error) {
        if (error.path[0] === key) {
            return error.message;
        } else return ''
    } else return ''
}

function printProductModal(product, wishlist, cart) {
    return `
<div class="modal fade product-view" id="_${product._id}" tabindex="-1" aria-labelledby="Product view" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">${product.product_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                    <div class="row pvRow1">
                        <div class="col-xl-6 col-lg-7 ">
                            <img loading="lazy" src="/img/products/${printMainImage(product)}" alt="" id="prod-main-img">
                        </div>
                        <div class="col-xl-6 col-lg-5 d-flex flex-column justify-content-between">
                            <div class="row small-img-row">
                                ${printProductViewSmallImages(product)}
                            </div>
                            <form method="post" >
                                <div id="prod-price">
                                    <span>ksh.</span> <div class="d-inline pricePV">${product.price}</div>
                                </div>
                                <div class="d-flex justify-content-evenly">
                                    <div class="pvBtns">
                                        ${wishBtnPV(product._id, wishlist)}
                                    </div>
                                    <div class="pvBtns">
                                        ${cartBtnPV(product._id, cart)}
                                    </div>
                                </div>
                                <div class="pvBtns">
                                    <button type="submit" class="btn btn-outline-success prod-start" formaction="/cart/checkout/${product._id}"> Checkout </button>
                                </div>
                            </form>
                            <div id="share" class="text-center">
                                <i class="bi bi-share-fill px-2"></i>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=https://amazon-cellular.com/search/ext/${product._id}" target="_blank"><i class="fab fa-facebook-f"></i></a>
<!--                                <a href=""><i class="fab fa-instagram"></i></a>-->
<!--                                <a href=""><i class="fab fa-twitter"></i></a>-->
                                <a href="whatsapp://send?text=https://amazon-cellular.com/search/ext/${product._id}"><i class="fab fa-whatsapp"></i></a>
                                <a href=""><i class="far fa-clipboard"></i>Copy to clipboard</a>
                            </div>
                        </div>
                        <div>
                            <div class="description mt-3"> Description</div>
                            ${product.description}
                            <div class="description">What's in the box</div>
                            ${product.inBox}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

function printMainImage(product) {
    let mainImage;
    product.product_images.forEach(productImage => {
        if (productImage.filename.includes('image1')) {
            mainImage = productImage.filename
        }
    })
    return mainImage;
}

function printProductViewSmallImages(product) {
    return product.product_images.map(productImage => {
        return `
                <div class="col-2 small-img-col">
                    <img loading="lazy" src="/img/products/${productImage.filename}" alt="" class="prod-small-img">
                </div>
            `
    }).join('');
}

function printWishlistModal(req, wishlist) {
    if (Object.keys(wishlist).length > 0) {
        req.session.wishlistCount = wishlist.products.length

        function renderedWishlistItems(wishlist) {
            if (wishlist.products.length > 0) {
                return wishlist.products.map(wishItem => {
                    return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/products/${printMainImage(wishItem._id)}" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${wishItem._id.product_name}</h5>
                        <div class="mt-3 mt-lg-4">
                            <div class="price"><span>  ksh.</span> ${wishItem._id.price}</div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <form method="post" action="/wishlist/delete/${wishItem._id._id}"><button type="submit" class="remove btn btn-sm btn-danger" >Remove <i class="bi bi-trash"></i></button></form>
                            <form method="post" action="/cart/from-wish/${wishItem._id._id}">
                                <button type="submit" class="remove btn btn-sm btn-success">Add to cart <i class="bi bi-cart3"></i></button>
                            </form>
                        </div>
                    </div>
                    <span class="my-2 border-bottom border-2">
                </span> 
            </div>
            `
                }).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your wishlist is empty at the moment<br>Click <i class="fas fa-heart"></i> to add items to your wishlist</h6>
                `
            }
        }

        return `
<div class="modal fade" id="wishlist" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Wishlist</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ${renderedWishlistItems(wishlist)}
            </div>
            <div class="modal-footer py-3"></div>
        </div>
    </div>
</div>
    `

    } else {
        req.session.wishlistCount = 0

        return `
<div class="modal fade" id="wishlist" tabindex="-1" aria-labelledby="Wishlist" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="favsTitle">Wishlist</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <h6 class="text-center py-5 text-muted">Your wishlist is empty at the moment<br>Click <i class="fas fa-heart"></i> to add items to your wishlist</h6>     
            </div>
        </div>
    </div>
</div>
             
        `
    }
}

function printCartModal(req, cart) {
    if (Object.keys(cart).length > 0) {
        req.session.cartCount = cart.products.length

        function renderedCartItems(cart) {
            if (cart.products.length > 0) {
                return cart.products.map(cartItem => {
                    return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/products/${printMainImage(cartItem._id)}" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${cartItem._id.product_name}</h5>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <div>
                                <input type="number" class="form-control qty" name="${cartItem._id._id}" value="${cartItem.quantity}" min="1">
                            </div>
                            <div> 
                                <span>  ksh.</span> 
                                <div class="itemPrice"> ${cartItem._id.price}</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                        
                            <button type="submit" class="remove btn btn-sm btn-danger" formaction="/cart/delete/${cartItem._id._id}">Remove <i class="bi bi-trash"></i></button>
                            <div>
                            <span>subtotal (ksh):</span>
                            <div class="subtotal"></div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2">
                </div>
            `
                }).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your cart is empty at the moment<br>Click <i class="fas fa-shopping-cart"></i> to add items to your cart</h6>  
                `
            }
        }

        function cartModalFooter(cart) {
            if (cart.products.length > 0) {
                return `
                   <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <input type="hidden" name="total" class="totalOutput">
                <button type="submit" class="btn btn-success" id="checkout" formaction="/checkout">
                   Checkout
                </button>
            </div> 
                `
            } else {
                return `
                    <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <button type="button" class="btn btn-success" id="checkout" disabled>
                    Checkout
                </button>
            </div>
                `
            }
        }

        return `
<div class="modal fade" id="cart" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Shopping Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form method="post">
                ${renderedCartItems(cart)}
                ${cartModalFooter(cart)}
            </div>
            </form>
        </div>
    </div>
</div>
    `
    } else {
        req.session.cartCount = 0

        return `
<div class="modal fade" id="cart" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartTitle">Shopping Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6 class="text-center py-5 text-muted">Your cart is empty at the moment<br>Click <i class="fas fa-shopping-cart"></i> to add items to your cart</h6>  
            </div>
        </div>
    </div>
</div>
             
        `
    }

}

exports.wishlistCount = function (req) {
    return req.session.wishlistCount ? parseInt(req.session.wishlistCount) : 0
}

exports.cartCount = function (req) {
    return req.session.cartCount ? parseInt(req.session.cartCount) : 0
}

async function getModals(req, Wishlist, Cart) {
    let wishlist = {};
    if (req.session.wishlistID) {
        wishlist = await Wishlist.findById(req.session.wishlistID).populate('products._id', '_id product_name price product_images');
    } else wishlist = [];


    let cart;
    if (req.session.cartID) {
        cart = await Cart.findById(req.session.cartID).populate('products._id', '_id product_name price product_images');
    } else cart = [];

    return [wishlist, cart]
}

function wishlistButton(productID, wishlist) {
    if (wishlist.length > 0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/wishlist/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-heart-fill actionSelected"></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/wishlist/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-heart"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/wishlist/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-heart"></i></button>
                </form>
            `
    }
}

function cartButton(productID, cart) {
    if (cart.length > 0 || Object.keys(cart).length > 0) {
        const product = cart.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/cart/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-cart-fill actionSelected"></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/cart/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-cart3"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/cart/${productID}" style="color: black">
                    <button type="submit" class="formBtn"><i class="bi bi-cart3"></i></button>
                </form>
            `
    }
}

function wishBtnPV(productID, wishlist) {
    if (wishlist.length > 0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
               
                    <button type="submit" class="btn btn-success prod-start" formaction="/wishlist/${productID}"> Added 
                        <i class="bi bi-heart-fill"></i></button>
                
            `
        } else {
            return `
               
                    <button type="submit" class="btn btn-outline-success prod-start" formaction="/wishlist/${productID}"> Wishlist 
                        <i class="bi bi-heart"></i></button>
               
            `
        }
    } else {
        return `
                
                    <button type="submit" class="btn btn-outline-success prod-start" formaction="/wishlist/${productID}"> Wishlist 
                        <i class="bi bi-heart"></i></button>
               
            `
    }
}

function cartBtnPV(productID, cart) {
    if (cart.length > 0 || Object.keys(cart).length > 0) {
        const product = cart.products.id(productID);
        if (product) {
            return `
                
                    <button type="submit" class="btn btn-success prod-start" formaction="/cart/${productID}"> Added 
                        <i class="bi bi-cart-fill"></i></button>
                
            `
        } else {
            return `
                
                    <button type="submit" class="btn btn-outline-success prod-start" formaction="/cart/${productID}"> Cart 
                        <i class="bi bi-cart3"></i></button>
                
            `
        }
    } else {
        return `
                
                    <button type="submit" class="btn btn-outline-success prod-start" formaction="/cart/${productID}"> Cart 
                        <i class="bi bi-cart3"></i></button>
                
            `
    }
}

function extraNav(req) {

    if (req.session.token) {
        return `
            <div class="me-1" >${req.session.full_name.split(" ")[0]} : </div>
            <div class="clickable" data-bs-toggle="modal" data-bs-target="#cart">Checkout</div>
            <div class="separator mx-2">|</div>
            <div class="clickable" onclick="location.href='/orders'">Orders</div>
            <div class="separator mx-2">|</div>
            <div class="clickable" onclick="location.href='/login/logout'">Log Out</div>
        `
    } else {
        return `
        <div class="clickable" onclick="location.href='/register'">Register</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='/login'">Log In</div>
        `
    }
}

function footer(req) {
    let token = req.session.token

    if (token) {
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/orders'">ORDERS
        </button>        
        <button type="button" class="btn btn-danger reg" onclick="location.href='/login/logout'">LOG OUT
        </button>
        `
    } else {
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT</button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/register'">REGISTER
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/login'">LOGIN
        </button>
        `
    }
}

function printProducts(products) {
    return products.map(
        product => {
            return `
                <li>${product.product_name}<span class="orderItemSpan">- (qty ${product.quantity})</span></li>
            `
        }
    ).join('');
}

function printPaymentMethod(order) {
    if (order.mpesa === 'true') {
        return `MPESA`
    } else if (order.mpesa === 'false') {
        return 'On delivery'
    }
}

function printStatusBtn(order) {
    switch (order.orderStatus) {
        case 'Order placed':
            return `<td class="text-center orderRows"><div class="btn btn-primary statusBtn">${order.orderStatus}</div></td>`

        case 'In transit':
            return `<td class="text-center orderRows"><div class="btn btn-warning statusBtn">${order.orderStatus}</div></td>`

        case 'Delivered':
            return `<td class="text-center orderRows"><div class="btn btn-success statusBtn">${order.orderStatus}</div></td>`

        case 'Cancelled':
            return `<td class="text-center orderRows"><div class="btn btn-danger statusBtn">${order.orderStatus}</div></td>`
    }
}

exports.emailRegistration = async function (customer) {

    const CLIENT_ID = config.get('CLIENT_ID');
    const CLIENT_SECRET = config.get('CLIENT_SECRET');
    const REDIRECT_URI = config.get('REDIRECT_URI');
    const REFRESH_TOKEN = config.get('REFRESH_TOKEN');

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            // port: 465,
            service: 'gmail',
            secure: false,
            auth: {
                type: 'OAuth2',
                user: 'amazon.cellular.outfitters@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'amazon.cellular.outfitters@gmail.com',
            to: customer.email,
            cc: ['4faizahmed@gmail.com'],
            subject: `SUCCESSFUL REGISTRATION ON AMAZON CELLULAR OUTFITTERS`,
            html: `
Dear ${customer.full_name},
<br><br>
Your registration process at Amazon Cellular Outfitters was successful. You will be receiving communication from us to this email e.g. the status of your orders. We are happy to have you on board and remember "<i>if you can't stop thinking about it, buy it 😉"</i>
<br><br>
Kind regards,<br>
Amazon Cellular Outfitters

 
`
        }

        console.log('finished building up mail')

        transport.sendMail(mailOptions, function (error, result) {
            console.log('sending mail....')
            if (error){
                console.log(error)
            } else {
                console.log(result)
            }
        })

    }
    catch (e) {
        console.log('an error occured')
        console.log(e)
    }
}

exports.emailOrderStatus = async function (order, email, fullName) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'amazon.cellular.outfitters@gmail.com',
            pass: config.get('EMAILPASS')
        }
    });

    let info = await transporter.sendMail({
        from: '"Amazon Cellular 🛒" amazon.cellular.outfitters@gmail.com',
        to: email,
        cc: ['4faizahmed@gmail.com'],
        subject: `UPDATE ON STATUS FOR ORDER ${order._id}`,
        html: `
Dear ${fullName},
<br><br>
The status for your order ${order._id} has been updated to ${emailStatusBtn(order)} Please see the details of the order below:<br>
${orderData(order)}
<br><br>
Kind regards,<br>
Amazon Cellular Outfitters

 
`,
    });

    console.log("Message sent: %s", info.messageId);
}

function orderData(order) {
    function printProducts(order) {
        return order.products.map(
            product => {
                return `
            <li>${product.product_name} &nbsp;<span>- Qty ${product.quantity}</span></li>
        `
            }).join('');
    }

    function printPaymentType(order) {
        if (order.mpesa === 'true') {
            return `Lipa na M-PESA`
        } else if (order.mpesa === 'false') {
            return `On delivery`
        }
    }

    return `
<ul>
        ${printProducts(order)}
        <p>Payment Type:&nbsp;${printPaymentType(order)}</p>
        <p>Amount: (ksh.)&nbsp;${order.total}</p>
</ul>
    `
}

function emailStatusBtn(order) {
    switch (order.orderStatus) {
        case 'Order placed':
            return `<button style="background-color: blue; color: white">${order.orderStatus.toUpperCase()}</button>`

        case 'In transit':
            return `<button style="background-color: yellow">${order.orderStatus.toUpperCase()}</button>`

        case 'Delivered':
            return `<button style="background-color: green; color: white">${order.orderStatus.toUpperCase()}</button>`

        case 'Cancelled':
            return `<button style="background-color: red; color: white">${order.orderStatus.toUpperCase()}</button>`
    }
}

function printBadge(order) {
    if (order.new) {
        return `
                <span class="badge bg-info">new</span>
            `
    } else if (order.processed) {
        return `
                <span class="badge bg-secondary ">processed</span>
            `
    } else return ''
}

exports.printOrdersRecent = function (orders) {

    return orders.map(
        order => {
            return `
<tr>
    <td class="orderRows">${displayDate(order.orderDate)}</td>
    <td class="orderRows">${order._id}${printBadge(order)}</td>
    <td class="orderRows">${order.customerID.phone}</td>
    <td>
        <ul class="orderItems">
            ${printProducts(order.products)}
        </ul>
    </td>
    <td class="orderRows">${order.total}</td>
    <td class="orderRows">${printPaymentMethod(order)}</td>
    ${printStatusBtn(order)}
    <td>
        <a href="/admin/orders/edit/${order._id}"><i class="far fa-edit"></i></a>
    </td>
</tr>
            `
        }).join('')
}


exports.printOrdersNew = function (orders) {

    const newOrders = orders.map(
        order => {
            if (order.new) return `
<tr>
    <td class="orderRows">${displayDate(order.orderDate)}</td>
    <td class="orderRows">${order._id}${printBadge(order)}</td>
    <td class="orderRows">${order.customerID.phone}</td>
    <td>
        <ul class="orderItems">
            ${printProducts(order.products)}
        </ul>
    </td>
    <td class="orderRows">${order.total}</td>
    <td class="orderRows">${printPaymentMethod(order)}</td>
    ${printStatusBtn(order)}
    <td>
        <a href="/admin/orders/edit/${order._id}"><i class="far fa-edit"></i></a>
    </td>
</tr>
            `
        }).join('')

    if (newOrders.length > 0) {
        return newOrders
    } else return `<td colspan="8">no new orders</td>`
}


exports.displayDate = displayDate;
exports.getInput = getInput;
exports.getError = getError;
exports.printProductModal = printProductModal;
exports.printMainImage = printMainImage;
exports.printWishlistModal = printWishlistModal;
exports.printCartModal = printCartModal;
exports.getModals = getModals;
exports.wishlistButton = wishlistButton;
exports.cartButton = cartButton;
exports.extraNav = extraNav;
exports.footer = footer;
exports.printProducts = printProducts
exports.printPaymentMethod = printPaymentMethod
exports.printStatusBtn = printStatusBtn