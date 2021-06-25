const { printOrders } = require('../../middlewares/otherFunctions')
const layout = require('./layout');
const title = 'Dashboard';

module.exports = ({orders}) => {

    return layout({
        title: title,
        content: `
        <!--Recent Orders-->
        <div class="card order">
            <div class="card-header text-center">
                Recent Orders
            </div>
            <div class="card-body table-responsive-md">
                <table class="table table-hover table-bordered border-dark ">
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
                        ${printOrders(orders)}
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
                                <div class="statNum"><span>ksh.</span>28500</div>
                                <i class="fas fa-arrow-up profit"></i>
                            </div>
                            <p class="percentage profit">+8.3% <span>(last 7 days)</span></p>
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Units Sold</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">5000</div>
                                <i class="fas fa-arrow-up profit"></i>
                            </div>
                            <p class="percentage profit">+15% <span>(last 7 days)</span></p>
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Page Visitors</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">300</div>
                                <i class="fas fa-arrow-up profit"></i>
                            </div>
                            <p class="percentage profit">+2.5% <span>(last 7 days)</span></p>
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Customers</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">650</div>
                                <i class="fas fa-arrow-down loss"></i>
                            </div>
                            <p class="percentage loss">-0.5% <span>(last 7 days)</span></p>
                        </div>
                    </div>
                </div>
                <div class="card col">
                    <div class="card-body">
                        <h5 class="card-title">Products</h5>
                        <div class="card-text">
                            <div class="firstRow">
                                <div class="statNum">400</div>
                                <i class="fas fa-minus"></i>
                            </div>
                            <p class="percentage">0% <span>(last 7 days)</span></p>
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
                <table class="table table-hover table-bordered border-dark">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col">Product ID</th>
                        <th scope="col" class="itemsTh">Name</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Price (ksh.)</th>
                        <th scope="col">Units Sold</th>
                        <th scope="col">Sales Made</th>
                        <th scope="col">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>2500</td>
                        <td>400</td>
                        <td>212</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Nillkin Amazing 2-in-1 HD full screen tempered glass</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>1000</td>
                        <td>390</td>
                        <td>345</td>
                        <td>125</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Nillkin CamShield Pro cover case for Apple iPhone 12</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>850</td>
                        <td>323</td>
                        <td>192</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>5000</td>
                        <td>287</td>
                        <td>87</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Nillkin Amazing 2-in-1 HD full screen tempered glass</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>3125</td>
                        <td>249</td>
                        <td>3</td>
                        <td>65</td>
                    </tr>
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
                <table class="table table-hover table-bordered border-dark">
                    <thead>
                    <tr class="table-dark">
                        <th scope="col">Product ID</th>
                        <th scope="col" class="itemsTh">Name</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Price (ksh.)</th>
                        <th scope="col">Units Sold</th>
                        <th scope="col">Sales Made</th>
                        <th scope="col">Units Left</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>2500</td>
                        <td>400</td>
                        <td>212</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Nillkin Amazing 2-in-1 HD full screen tempered glass</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>1000</td>
                        <td>390</td>
                        <td>345</td>
                        <td>125</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Nillkin CamShield Pro cover case for Apple iPhone 12</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>850</td>
                        <td>323</td>
                        <td>192</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>5000</td>
                        <td>287</td>
                        <td>87</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Nillkin Amazing 2-in-1 HD full screen tempered glass</td>
                        <td>09.15am <span class="d-block"> 11/02/21</span></td>
                        <td>3125</td>
                        <td>249</td>
                        <td>3</td>
                        <td>65</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `})
}