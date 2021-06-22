const {displayDate, printProducts, printPaymentMethod, printStatusBtn} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Orders'

module.exports = ({orders}) => {
    const renderedOrders = orders.map(
        order => {
            return `
<tr>
    <td class="orderRows">${displayDate(order.orderDate)}</td>
    <td class="orderRows">${order._id}${printNewBadge(order)}</td>
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
            `}).join('')

    function printNewBadge(order) {
        if (order.new === true){
            return `
                <span class="badge bg-danger rounded-pill">new</span>
            `}
        else return ''
    }

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
        <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/orders/new'">Add New Order</button>
    </div> 
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="ordersHeading">Date</th>
                <th scope="col" class="ordersEmail">ID</th>
                <th scope="col" class="ordersHeading">Phone</th>
                <th scope="col" class="ordersHeadingBig">Products</th>
                <th scope="col" class="ordersHeading">Amount</th>
                <th scope="col" class="ordersHeading">Payment</th>
                <th scope="col" class="ordersHeading">Status</th>
                <th scope="col" class="ordersHeading">Edit</th>
            </tr>
            </thead>
            <tbody>
            ${renderedOrders}
            </tbody>
        </table>
    </div>
</div>`})
}