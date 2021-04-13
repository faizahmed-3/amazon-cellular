const layout = require('./layout');
const title = 'Cart';

module.exports = ({cart})=> {
    const renderedCart = cart.map(
        cartItem => {
            return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/home/featured/3.jpg" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${cartItem._id.productName}</h5>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <div>
                            
                                <input type="number"  class="form-control qty" name="cartQuantity" value="1" min="1">
                            </div>
                            <div>
                            <span>  ksh.</span>
                            <div class="itemPrice"> ${cartItem._id.discountPrice}</div>
                            <span class="priceSpan">${cartItem._id.price}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <form method="post" action="/cart/delete/${cartItem._id._id}">
                            <button type="submit" class="remove btn btn-sm btn-danger">Remove <i class="bi bi-trash"></i></button>
                            </form>
                            <div>
                            <span>Subtotal (ksh):</span>
                            <div class="subtotal">${cartItem._id.discountPrice} </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2">
                </div>
            `}
    ).join('');


    return layout({
        title: title,
        content: `
            <div id="cart" tabindex="-1" aria-labelledby="Cart" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header border-bottom border-2">
                <h5 class="modal-title" id="cartTitle">Shopping Cart</h5>
                <button type="button" class="btn-close" aria-label="Close" onclick="location.href='/'"></button>
            </div>
            <div class="modal-body">
                ${renderedCart}
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>Total (ksh): <span class="total">3250</span></div>
                <button type="button" class="btn btn-success" id="checkout" onclick="location.href='checkout.html'">
                    Checkout
                </button>
            </div>
        </div>
    </div>
</div>
        `})
}