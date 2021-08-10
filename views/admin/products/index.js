const layout = require('../layout');

module.exports = ({title, products}) => {

    function visibility(status) {
        if (status){
          return `
            <input type="checkbox" name="status" class="visibilitySwitch" value="status" checked disabled>
            <span class="slider round products-view-switch"></span>
          `
        } else {
            return `
            <input type="checkbox" name="status" class="visibilitySwitch" value="status" disabled>
            <span class="slider round products-view-switch"></span>
          `
        }
    }

    const renderedProducts = products.map(product => {
            return `
<tr class="product-row">
    <td class="product-name">${product.product_name}</td>
    <td>${product.shop_price}</td>
    <td>${product.price}</td>
    <td>${product.unitsSold}</td>
    <td>${product.income}</td>
    <td>${product.quantity}</td>
    <td>
        <label class="switch">
            ${visibility(product.status)}
        </label>
    </td>
    <td >
        <a href="/admin/products/edit/${product._id}"><i class="far fa-edit"></i></a>
        <div  class="deleteForm ms-4">
            <button type="button" data-bs-toggle="modal" data-bs-target="#_${product._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
        
        <div class="modal fade" id="_${product._id}" tabindex="-1" aria-labelledby="deleteProductModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>DELETE</b> ${product.product_name}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/admin/products/delete/${product._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
            
    </td>
</tr>
           `;
        }).join('');


    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="card-body table-responsive-md ">
        <table class="table table-hover table-bordered mt-2">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="product-name-heading">Product Name</th>
                <th scope="col" class="product-others">Shop Price</th>
                <th scope="col" class="product-others">Price</th>
                <th scope="col" class="product-others">Units Sold</th>
                <th scope="col" class="product-others">Income</th>
                <th scope="col" class="product-others">Quantity</th>
                <th scope="col" class="product-others">Status</th>
                <th scope="col" class="product-others">Actions</th>
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