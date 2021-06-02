const {displayDate, printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Orders'

module.exports = function ({orders, wishlist, cart}) {
    const renderedOrders = orders.map(
        order => {
            return `
               <tr>
                    <td>${displayDate(order.orderDate)}</td>
                    <td>
                        <ul class="orderItems">
                            ${printProducts(order.products)}
                        </ul>
                    </td>
                    <td>${order.total}</td>
                    <td>${printPaymentMethod(order)}</td>
                    <td class="text-center"><div class="btn btn-primary">${order.orderStatus}</div></td>
                </tr>
            `}
    ).join('');

    function printProducts (products) {
        return products.map(
            product => {
                return `
                <li>${product.product_name}<span class="orderItemSpan">- (qty ${product.quantity})</span></li>
            `}
        ).join('');
    }

    function printPaymentMethod(order) {
        if (order.mpesa === 'true'){
            return `MPESA`
        } else if (order.mpesa === 'false'){
            return 'On delivery'
        }
    }

    return layout({
        title: title,
        content: `


<section class="register">
    <div class="card mt-4" id="order">
        <div class="card-header">
            Orders
        </div>
        <div class="card-body table-responsive-md">
            <table class="table table-striped table-bordered border-dark">
                <thead >
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col" class="itemsTh">Item Name(s)</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment</th>
                    <th scope="col" class="status text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                ${renderedOrders}
                </tbody>
            </table>
        </div>
    </div>
</section>


${printWishlistModal(wishlist)}

${printCartModal(cart)}

      
        `})
}

