const {printDetailedModal} = require('../../../middlewares/otherFunctions')
const layout = require('../layout');
const title = 'Detailed Price List'

module.exports = ({products}) => {

    const renderedProducts = products.map(product => {
        if (product.shop_price<= product.selling){
            return `
<tr class="product-row pricelist-row" style="color: red" data-bs-toggle="modal" data-bs-target="#_${product._id}">
    <td class="product-name">${product.product_name}</td>
    <td>${printPrice(product.bp) }</td>
    <td>${printPrice(product.rate) }</td>
    <td>${printPrice(product.shipping) }</td>
    <td>${printPrice(product.buying) }</td>
    <td>${printPrice(product.profitP) }</td>
    <td>${printPrice(product.selling) }</td>
    <td>${product.shop_price}</td>
    <td>${product.price}</td>
</tr>
           `;
        } else {
            return `
<tr class="product-row pricelist-row" data-bs-toggle="modal" data-bs-target="#_${product._id}">
    <td class="product-name">${product.product_name}</td>
    <td>${printPrice(product.bp) }</td>
    <td>${printPrice(product.rate) }</td>
    <td>${printPrice(product.shipping) }</td>
    <td>${printPrice(product.buying) }</td>
    <td>${printPrice(product.profitP) }</td>
    <td>${printPrice(product.selling) }</td>
    <td>${product.shop_price}</td>
    <td>${product.price}</td>
</tr>
           `;
        }

    }).join('');

    function printPrice(price) {
        if (price){
            return `${price}`
        } else {
            return `-`
        }
    }

    const renderedProductModals = products.map(product => {
        return `
${printDetailedModal(product)}
           `;
    }).join('');

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/detailed/new'">Add Product (Price Only)</button>
    </div>
    <div class="card-body table-responsive-lg ">
        <table class="table table-hover table-bordered mt-2" id="priceListT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="product-name-heading">Product Name</th>
                <th scope="col" class="detailedCol">BP</th>
                <th scope="col" class="detailedCol">Rate</th>
                <th scope="col" class="detailedCol">Shipping</th>
                <th scope="col" class="detailedCol">Buying </th>
                <th scope="col" class="detailedCol">Profit % </th>
                <th scope="col" class="detailedCol">Selling </th>
                <th scope="col" class="detailedCol">W/Sale </th>
                <th scope="col" class="detailedCol">Website </th>
            </tr>
            </thead>
            <tbody>
            ${renderedProducts}
            </tbody>
        </table>
    </div>
</div>

${renderedProductModals}

`});
}