const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Special Categories'

module.exports = ({specials}) => {
    const renderedSpecials = specials.map(
        special => {
            return `<tr>
    <td class="view_table_name">${special.special_name}</td>
    <td>${displayDate(special.dateCreated)}</td>
    <td>${special.quantity}</td>
    <td>${special.unitsSold}</td>
    <td>${special.income}</td>
    <td>${special.topPicks}</td>
    <td>
        <a href="/admin/special/edit/${special._id}"><i class="far fa-edit"></i></a>
        <form method="POST" action="/admin/special/delete/${special._id}" class="deleteForm ms-4">
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
    <button type="button" class="btn btn-primary mt-3 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/special/new'">Add New Special Category</button>
    </div> 
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig">Brand Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Quantity</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Top Picks</th>
                <th scope="col" class="tableHeader">Actions</th>
            </tr>
            </thead>
            <tbody>
            ${renderedSpecials}
            </tbody>
        </table>
    </div>
</div>`})
}