const {printPricelistModal} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'Price List'

module.exports = ({products}) => {

    const renderedProducts = products.map(product => {
        return `
<tr class="product-row pricelist-row" data-bs-toggle="modal" data-bs-target="#_${product._id}">
    <td class="product-name">${product.product_name}</td>
    <td>${product.shop_price}</td>
</tr>

${printPricelistModal(product)}
           `;
    }).join('');


    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="card-body table-responsive-lg ">
        <table class="table table-hover table-bordered mt-2">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="product-name-heading">Product Name</th>
                <th scope="col" class="product-others">Wholesale Price</th>
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