const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'Edit Order';

module.exports = ({order}) => {

    function printStatus(order) {
        switch (order.orderStatus.toLowerCase()) {
            case "order placed":
                return `
                    <option value="Order placed" selected>Order placed</option>
                    <option value="In transit" >In transit</option>
                    <option value="Delivered" >Delivered</option>
                    <option value="Cancelled" >Cancelled</option>
                `

            case "in transit":
                return `
                    <option value="Order placed" >Order placed</option>
                    <option value="In transit" selected>In transit</option>
                    <option value="Delivered" >Delivered</option>
                    <option value="Cancelled" >Cancelled</option>
                `

            case "delivered":
                return `
                    <option value="Delivered" selected>Delivered</option>
                `

            case "cancelled":
                return `
                    <option value="Cancelled" selected>Cancelled</option>
                `
        }
    }

    function printProducts(order) {
        if (order.mpesa === 'false' && order.orderStatus.toLowerCase() !== 'delivered' && order.orderStatus.toLowerCase() !== 'cancelled'){
            const renderedProducts = order.products.map(
                product => {
                    return `
                <li class="d-flex justify-content-evenly">
                    <input type="hidden" name="productID" value="${product._id}" >
                    <input type="text" class="form-control mb-2 orderProductEdit " name="product_name" value="${product.product_name}" readonly>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderPriceEdit" name="price" value="${product.price}" readonly><span class="mt-2">X</span>
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderQtyInputs" min="1" name="quantity" value="${product.quantity}" required> <span class="mt-2">=</span>  
                    <input type="number" class="form-control mb-2 orderQuantityEdit orderSubtotalEdit"  readonly>    
                    <i class="fas fa-trash-alt orderProductDelete"></i>
                </li>                
        `}
            ).join('')

        return `
            <div class="mb-2">
                <label for="email" class="form-label" >Products</label>
                <ul class="orderListEdit">
                    ${renderedProducts}
                    <li class="otEdit">Total: <span class="editOrderTotal">${order.total}</span></li>
                    <input type="hidden" name="orderOutput" class="orderOutput">
                </ul>
            </div>   
        `}
        else return ''
    }

    return layout({
        title: title,
        content: `
<div id="add-product" class="container card my-5">
    <div class="card-header">
        Order Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/orders/edit/${order.id}">
            <div class="row">
                <div class="mb-2 col-md-6 form-group">
                    <label for="orderID" class="form-label" >Order ID</label>
                    <input type="text" class="form-control" id="orderID" aria-describedby="name" value="${order._id}" disabled>
                </div>
                <div class="mb-2 col-md-6 form-group">
                    <label for="orderDate" class="form-label" >Order Date</label>
                    <input type="text" class="form-control" id="orderDate" aria-describedby="name" value="${displayDate(order.orderDate)}" disabled>
                </div>
            </div>

            <div class="row">
                <div class="mb-2 col-md-6 form-group">
                    <label for="email" class="form-label" >Email Address</label>
                    <input type="email" class="form-control" id="email" value="${order.customerID.email}" disabled>
                </div>
                <div class="mb-2 col-md-6 form-group">
                    <label for="phone" class="form-label" >Phone Number</label>
                    <input type="number" class="form-control" id="phone" value="${order.customerID.phone}" disabled>
                </div>    
            </div>
            
            ${printProducts(order)}
         
            <div class="mb-5 form-group ">
                <label for="orderStatus" class="form-label" required>Order Status</label>
                <select class="form-select" aria-label="Select Category" id="orderStatus" name="orderStatus" required>
                    ${printStatus(order)}
                </select>
            </div>
                
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/orders/edit/${order.id}">SAVE</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/orders'">CANCEL</a>
            </div>
        </form>
    </div>
</div>
        `})
}