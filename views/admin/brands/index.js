const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Brands'
function subCheck(brand) {
    if (brand.subBrands.length>0){
        return `
            <td class="hasSub view_table_name" data-bs-toggle="collapse" data-bs-target="#_${brand._id}" >${brand.brand_name} <i class="fas fa-caret-down ms-1"></i></td>
        `
    } else {
        return `
            <td class="view_table_name">${brand.brand_name} </td>
        `
    }
}

function subBrandsPrint(brand) {
    let renderedSubBrands;
    if (brand.subBrands.length>0){
        renderedSubBrands = brand.subBrands.map(subBrand => {
            return `
                        <tr  class="collapse" id="_${brand._id}">
                            <td class="subBrandsCollapse text-muted">${subBrand.subBrandName}</td>
                            <td></td>
                            <td>${subBrand.quantity}</td>
                            <td>${subBrand.unitsSold}</td>
                            <td>${subBrand.income}</td>
                            <td></td>
                            <td></td>
                        </tr>
                `
        }).join('');
    } else {
        renderedSubBrands = ''
    }
    return renderedSubBrands;
}

module.exports = ({brands}) => {

    const renderedBrands = brands.map(
        brand => {
            return `
    <tr>
    ${subCheck(brand)}
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
    ${subBrandsPrint(brand)}

    `}).join(``);

    return layout({
        title: title,
        content: `<div id="viewProducts" class="card ">
        <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary mt-3 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/brands/new'">Add New Brand</button>
    </div>  
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig ">Brand Name</th>
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