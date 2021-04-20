const layout = require('../layout');
const title = 'Edit Brand';
const {getInput, getError} = require('../../../middlewares/otherFunctions');

function subBrand(brand) {
    if (brand.subBrands.length>0){
        return ` 
                <select class="form-select" aria-label="Select Category" id="subBrand" name="subBrand">
                    <option value="false">Not applicable</option>
                    <option value="true" selected>Present</option>
                </select>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary subBrandBtn">Add sub-brand</button>
                </div>
                <ul class="subBrandsList">
                    <div class="d-flex my-2">
                        <div class="rectangle border border-warning"></div>
                        <div class="text-muted ms-1 "> shows already existing sub brands</div>
                    </div>
                    ${loopSubBrands(brand)}
                </ul>
        `
    } else {
        return `
                <select class="form-select" aria-label="Select Category" id="subBrand" name="subBrand">
                    <option value="false" selected>Not applicable</option>
                    <option value="true" >Present</option>
                </select>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary subBrandBtn" disabled>Add sub-brand</button>
                </div>
                <ul class="subBrandsList"></ul>
        `
    }
}

function loopSubBrands(brand) {
    return brand.subBrands.map(subBrand => {
        return `
            <li class="d-flex justify-content-evenly">
                <input type="text" class="form-control mb-2 subBrandItem border border-warning" name="${subBrand._id}" value="${subBrand.subBrandName}">
                <i class="fas fa-trash-alt subBrandDelete"></i>
            </li>
        `
    }).join('');
}

module.exports = ({brand, error}) => {
    return layout({
        title: title,
        content: `
        <div id="add-product" class="container card my-5">
    <div class="card-header">
        Brand Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/brands/edit/${brand.id}">
            <div class="mb-3 form-group">
                <label for="name" class="form-label">Brand Name</label>
                <input name="brand_name" type="text" class="form-control" id="brand_name" aria-describedby="brand_name" value="${getInput(brand, 'brand_name')}">
                <div class="inputError">${getError(error, 'brand_name')}</div>
            </div>
            <div class="mb-3 form-group">
                <label for="sub-brand" class="form-label">Sub Brand</label>
                ${subBrand(brand)}
            </div>
            <div class="my-3 d-flex justify-content-center">
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
            </div>
        </form>
    </div>
</div>
        `})
}