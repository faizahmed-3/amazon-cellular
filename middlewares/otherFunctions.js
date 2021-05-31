const localstorage = require('local-storage');
let sessionstorage = require('sessionstorage');

function displayDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}/${month+1}/${year}`
}

function getInput(input, key) {
    if (input){
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
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">${product.product_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                    <div class="row ">
                        <div class="col-6">
                            <img src="/img/products/${printMainImage(product)}" alt="" id="prod-main-img">
                        </div>
                        <div class="col-6 d-flex flex-column justify-content-between">
                            <div class="row small-img-row">
                                ${printProductViewSmallImages(product)}
                            </div>
                            <form method="post" >
                                <div id="prod-price">
                                    <span>ksh.</span> <div class="d-inline pricePV">${product.price}</div>
                                </div>
                                <div class="pvBtns">
                                    ${wishBtnPV(product._id, wishlist)}
                                </div>
                                <div class="pvBtns">
                                    ${cartBtnPV(product._id, cart)}
                                </div>
                            </form>

                            <div id="share" class="text-center">
                                <i class="bi bi-share-fill px-2"></i>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=http://192.168.1.104:3000/#_${product._id}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a href=""><i class="fab fa-instagram"></i></a>
                                <a href=""><i class="fab fa-twitter"></i></a>
                                <a href="whatsapp://send?text=http://192.168.1.104:3000/#_${product._id}"><i class="fab fa-whatsapp"></i></a>
                                <p class="mb-0 mt-1 scroll d-none d-lg-block">Scroll down for more details</p>
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
        if (productImage.filename.includes('image1')){
            mainImage = productImage.filename
        }
    })
    return mainImage;
}

function printProductViewSmallImages(product) {
    return product.product_images.map(productImage => {
        return `
                <div class="col-2 small-img-col">
                    <img src="/img/products/${productImage.filename}" alt="" class="prod-small-img">
                </div>
            `
    }).join('');
}

function printWishlistModal(wishlist) {
    if (Object.keys(wishlist).length>0){
        sessionstorage.setItem( "wishlistCount", wishlist.products.length );

        function renderedWishlistItems(wishlist) {
            if (wishlist.products.length>0){
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
            `}).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your wishlist is empty at the moment<br>Click <i class="fas fa-heart"></i> to add items to your wishlist</h6>
                `   }
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
        sessionstorage.setItem( "wishlistCount", 0 );

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
             
        `}
}

function printCartModal(cart) {
    if (Object.keys(cart).length>0){
        sessionstorage.setItem( "cartCount", cart.products.length );

        function renderedCartItems(cart) {
            if (cart.products.length>0){
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
            `}).join('');
            } else {
                return `
                    <h6 class="text-center py-5 text-muted">Your cart is empty at the moment<br>Click <i class="fas fa-shopping-cart"></i> to add items to your cart</h6>  
                `}
        }

        function cartModalFooter(cart) {
            if (cart.products.length>0){
                return `
                   <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <input type="hidden" name="total" class="totalOutput">
                <button type="submit" class="btn btn-success" id="checkout" formaction="/checkout">
                   Checkout
                </button>
            </div> 
                `} else {
                return `
                    <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">0</span></div>
                <button type="button" class="btn btn-success" id="checkout" disabled>
                    Checkout
                </button>
            </div>
                `}
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
        sessionstorage.setItem( "cartCount", 0 );

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
             
        `}

}

function getCount(countFor) {
    let count = sessionstorage.getItem( countFor )
    return count ? parseInt(count) : 0
}

async function getModals(req, Wishlist, Cart) {
    let wishlist = {};
    if (req.session.wishlistID){
        wishlist = await Wishlist.findById(req.session.wishlistID).populate('products._id', '_id product_name price product_images');
    }  else wishlist = [];


    let cart;
    if (req.session.cartID){
        cart = await Cart.findById(req.session.cartID).populate('products._id', '_id product_name price product_images');
    }  else cart = [];

    return [wishlist, cart]
}

function wishlistButton(productID, wishlist) {
    if (wishlist.length>0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-heart-fill actionSelected"></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-heart"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/wishlist/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-heart"></i></button>
                </form>
            `
    }
}

function cartButton(productID, cart) {
    if (cart.length>0 || Object.keys(cart).length > 0) {
        const product = cart.products.id(productID);
        if (product) {
            return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-cart-fill actionSelected"></i></button>
                </form>
            `
        } else {
            return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-cart3"></i></button>
                </form>
            `
        }
    } else {
        return `
                <form method="post" action="/cart/${productID}" >
                    <button type="submit" class="formBtn"><i class="bi bi-cart3"></i></button>
                </form>
            `
    }
}

function wishBtnPV(productID, wishlist) {
    if (wishlist.length>0 || Object.keys(wishlist).length > 0) {
        const product = wishlist.products.id(productID);
        if (product) {
            return `
               
                    <button type="submit" class="btn btn-success prod-start" formaction="/wishlist/${productID}"> Added 
                        <i class="bi bi-heart-fill"></i></button>
                
            `} else {
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
    if (cart.length>0 || Object.keys(cart).length > 0) {
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

function extraNav() {
    let name = localstorage.get( 'full_name' )
    let token = localstorage.get( 'token' )

    if (token){
        return `
        <div class="me-1" >${name} : </div>
        <div class="clickable" data-bs-toggle="modal" data-bs-target="#cart">Checkout</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" >Orders</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='/login/logout'">Log Out</div>
        `}
    else {
        return `
        <div class="clickable" onclick="location.href='/register'">Register</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='/login'">Log In</div>
        `}
}

function footer() {
    let token = localstorage.get( 'token' )

    if (token){
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/orders'">ORDERS
        </button>        
        <button type="button" class="btn btn-danger reg" onclick="location.href='/login/logout'">LOG OUT
        </button>
        `}
    else {
        return `
        <button type="button" class="btn btn-warning reg" data-bs-toggle="modal" data-bs-target="#cart">CHECKOUT</button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/register'">REGISTER
        </button>
        <button type="button" class="btn btn-warning reg" onclick="location.href='/login'">LOGIN
        </button>
        `}
}


exports.displayDate = displayDate;
exports.getInput = getInput;
exports.getError = getError;
exports.printProductModal = printProductModal;
exports.printMainImage = printMainImage;
exports.printWishlistModal = printWishlistModal;
exports.printCartModal = printCartModal;
exports.getCount = getCount;
exports.getModals = getModals;
exports.wishlistButton = wishlistButton;
exports.cartButton = cartButton;
exports.extraNav = extraNav;
exports.footer = footer;