const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Brands'

module.exports = ({brands}) => {
    const renderedBrands = brands.map(
        brand => {
            return `<tr>
    <td>${brand.brandName}</td>
    <td>${displayDate(brand.dateCreated)}</td>
    <td>${brand.quantity}</td>
    <td>${brand.unitsSold}</td>
    <td>${brand.income}</td>
    <td>${brand.topPicks}</td>
    <td>
        <a href="/admin/brands/edit/${brand._id}"><i class="far fa-edit"></i></a>
        <form method="POST" action="/admin/brands/delete/${brand._id}" class="deleteForm ms-4">
            <button type="submit" value="submit" class="formBtn">
                <i class="far fa-trash-alt "></i>
            </button>
        </form>
    </td>
</tr>
            `}).join('')

    return layout({
        title: title,
        content: `<div id="viewProducts" class="card ">
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeader">Brand Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Quantity</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Top Picks</th>
                <th scope="col" class="tableHeader">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${renderedBrands}
            </tbody>
        </table>
    </div>
</div>`})
}