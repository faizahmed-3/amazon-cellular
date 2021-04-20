const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Categories'

module.exports = ({categories}) => {
    const renderedCategories = categories.map(
        category => {
            return `<tr>
    <td class="view_table_name">${category.category_name}</td>
    <td>${displayDate(category.dateCreated)}</td>
    <td>${category.quantity}</td>
    <td>${category.unitsSold}</td>
    <td>${category.income}</td>
    <td>${category.topPicks}</td>
    <td>
        <a href="/admin/categories/edit/${category._id}"><i class="far fa-edit"></i></a>
        <form method="POST" action="/admin/categories/delete/${category._id}" class="deleteForm ms-4">
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
    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary mt-3 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/categories/new'">Add New Category</button>
    </div>    
    <div class="card-body table-responsive-md ">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig">Category Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Quantity</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Top Picks</th>
                <th scope="col" class="tableHeader">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${renderedCategories}
            </tbody>
        </table>
    </div>
</div>`})
}