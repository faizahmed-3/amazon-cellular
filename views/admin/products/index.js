const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Products'

module.exports = ({products}) => {

    const renderedProducts = products.map(
        product => {
            return `
<tr>
    <td>${product.productName}</td>
    <td>${displayDate(product.dateCreated)}</td>
    <td>${product.quantity}</td>
    <td>${product.price}</td>
    <td>${product.discountPrice}</td>
    <td>${product.unitsSold}</td>
    <td>${product.income}</td>
    <td>
        <label class="switch">
            <input type="checkbox" name="status" class="visibilitySwitch" value="${product.status}">
            <span class="slider round"></span>
        </label>
    </td>
    <td >
        <a href="/admin/products/edit/${product._id}"><i class="far fa-edit"></i></a>
        <form method="POST" action="/admin/products/delete/${product._id}" class="deleteForm ms-4">
            <button type="submit" value="submit" class="deleteBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </form>
    </td>
</tr>
           `;
        }).join('');


    return layout({
        title: title,
        content: `        
        <div id="viewProducts" class="card ">
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig">Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Quantity</th>
                <th scope="col" class="tableHeader">Price</th>
                <th scope="col" class="tableHeader">Discount Price</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Status</th>
                <th scope="col" class="tableHeader">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${renderedProducts}
            </tbody>
        </table>
    </div>
</div>
`});
};