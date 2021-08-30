const { printOrdersNew, displayDate } = require('../../middlewares/otherFunctions')
const layout = require('./layout');
const title = 'Dashboard';

module.exports = ({orders, income, unitsSold, totalProducts, customers, best, worst}) => {

    function printPerformer(products) {
        return products.map(
            product => {
                return `
                    <tr>
                        <td class="performerProduct">${product._id}</td>
                        <td class="performerProduct">${product.product_name}</td>
                        <td>${displayDate(product.dateCreated)}</td>
                        <td>${product.shop_price}</td>
                        <td>${product.price}</td>
                        <td>${product.income}</td>
                        <td>${product.unitsSold}</td>
                        <td>${product.quantity}</td>
                    </tr>                
                `}
        ).join('')
    }

    return layout({
        title: title,
        content: `
        <!--Recent Orders-->
        <div class="card order">
            <div class="card-header text-center">
                New Orders
            </div>
            <div class="card-body table-responsive-md">
                <table class="table table-hover table-bordered " id="dashorders">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col" class="ordersHeading">Date</th>
                        <th scope="col" class="ordersEmail">ID</th>
                        <th scope="col" class="ordersHeading">Contacts</th>
                        <th scope="col" class="ordersHeadingBig">Products</th>
                        <th scope="col" class="ordersHeading">Amount</th>
                        <th scope="col" class="ordersHeading">Payment</th>
                        <th scope="col" class="ordersHeading">Status</th>
                        <th scope="col" class="ordersHeading">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${printOrdersNew(orders)}
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    <a href="/admin/orders/" class="mb-2" style="text-decoration: none">view all orders</a>
                </div>
            </div>
        </div>

        <!--        Stats-->
        <div id="stats">
            <div class="row">
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Income</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum"><span>ksh.</span>${income}</div>
<!--                                <i class="fas fa-arrow-up profit"></i>-->
                            </div>
<!--                            <p class="percentage profit">+8.3% <span>(last 7 days)</span></p>-->
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Units Sold</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">${unitsSold}</div>
<!--                                <i class="fas fa-arrow-up profit"></i>-->
                            </div>
<!--                            <p class="percentage profit">+15% <span>(last 7 days)</span></p>-->
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Customers</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">${customers}</div>
<!--                                <i class="fas fa-arrow-down loss"></i>-->
                            </div>
<!--                            <p class="percentage loss">-0.5% <span>(last 7 days)</span></p>-->
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Products</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">${totalProducts}</div>
<!--                                <i class="fas fa-minus"></i>-->
                            </div>
<!--                            <p class="percentage">0% <span>(last 7 days)</span></p>-->
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--        Best performers-->
        <div class="card order">
            <div class="card-header text-center">
                Best Performers
            </div>
            <div class="card-body table-responsive-md">
                <table class="table table-hover table-bordered performer" id="bestp">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col" class="performerHeading">Product ID</th>
                        <th scope="col" class="performerName">Name</th>
                        <th scope="col" class="performerHeading">Created on</th>
                        <th scope="col" class="performerHeading">Shop Price</th>
                        <th scope="col" class="performerHeading">Price</th>
                        <th scope="col" class="performerHeading">Income</th>
                        <th scope="col" class="performerHeading">Units Sold</th>
                        <th scope="col" class="performerHeading">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${printPerformer(best)}
                    </tbody>
                </table>               
            </div>
        </div>

        <!--        Worst performers-->
        <div class="card order">
            <div class="card-header text-center">
                Worst Performers
            </div>
            <div class="card-body table-responsive-md">
                <table class="table table-hover table-bordered performer" id="worstp">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col" class="performerID">Product ID</th>
                        <th scope="col" class="performerName">Name</th>
                        <th scope="col" class="performerHeading">Created on</th>
                        <th scope="col" class="performerHeading">Shop Price</th>
                        <th scope="col" class="performerHeading">Price</th>
                        <th scope="col" class="performerHeading">Income</th>
                        <th scope="col" class="performerHeading">Units Sold</th>
                        <th scope="col" class="performerHeading">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${printPerformer(worst)}
                    </tbody>
                </table>               
            </div>
        </div>
        `})
}