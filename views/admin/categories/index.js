const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Categories'

module.exports = ({categories}) => {
    const renderedCategories = categories.map(
        category => {
            return `<tr>
    <td class="view_table_name"><a href="/admin/products/categories/${category._id}">${category.category_name}</a></td>
    <td>${displayDate(category.dateCreated)}</td>
    <td>${category.unitsSold}</td>
    <td>${category.income}</td>
    <td>${category.topPicks}</td>
    <td>
        <a href="/admin/categories/edit/${category._id}"><i class="far fa-edit"></i></a>
        <div  class="deleteForm ms-4">
            <button type="button" data-bs-toggle="modal" data-bs-target="#_${category._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
        
        <div class="modal fade" id="_${category._id}" tabindex="-1" aria-labelledby="categoryModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>DELETE</b> ${category.category_name}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/admin/categories/delete/${category._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
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