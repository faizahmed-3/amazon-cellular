const layout = require('../layout');
const title = 'Add Product';
const {getInput, getError} = require('../../../middlewares/otherFunctions')


module.exports = ({categories, brands, specials, input, error}) => {
    const renderedCategories = categories.map(
        category => {
            return `
                <option value="${category._id}">${category.category_name}</option>
            `
        }
    ).join('');

    const renderedBrands = brands.map(
        brand => {
            if (brand.subBrands.length > 0) {
                let subBrands = brand.subBrands.map(subBrand => {
                    return `
                    <option class="subBrandOption"  value="${subBrand._id}">${subBrand.subBrandName}</option>
                `
                }).join('')
                return `
                <optgroup label="${brand.brand_name} &#9207;">
                ${subBrands}
                </optgroup>
            `
            } else {
                return `
                <option value="${brand._id}">${brand.brand_name}</option>
            `
            }
        }
    ).join('');

    const renderedSpecials = specials.map(
        special => {
            return `
                <option value="${special._id}">${special.special_name}</option>
            `
        }
    ).join('');


    return layout({
        title: title,
        content: `<div id="add-product" class="container card my-5">
    <div class="card-header">
        Product Information
    </div>
    <div class="card-body">
        <form id="addProductsForm" method="POST" action="/admin/products">
            <div class="mb-3 form-group">
                <label for="product_name" class="form-label">Product Name</label>
                <input name="product_name" type="text" class="form-control" id="product_name"
                       aria-describedby="product_name" value="${getInput(input, 'product_name')}">
                <div class="inputError">${getError(error, 'product_name')}</div>
            </div>
            <div class="mb-3 form-group">
                <label for="colour" class="form-label">Colour</label>
                <input name="colour" type="text" class="form-control" id="colour" aria-describedby="product name"
                       value="${getInput(input, 'colour')}">
                <div class="inputError">${getError(error, 'colour')}</div>
            </div>
            <div class="row">
                <div class="mb-3 col-md-4 form-group ">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" aria-label="Select Category" id="category" name="categoryID">
                        ${renderedCategories}
                    </select>
                </div>
                <div class="mb-3 col-md-4 form-group ">
                    <label for="brand" class="form-label">Brand</label>
                    <select class="form-select" aria-label="Select Brand" id="brand" name="brandID">
                        ${renderedBrands}
                    </select>
                </div>
                <div class="mb-3 col-md-4 form-group ">
                    <label for="special" class="form-label">Special Category</label>
                    <select class="form-select" aria-label="Special Category" id="special" name="specialID">
                        ${renderedSpecials}
                    </select>
                </div>
            </div>
            <div>
<!--                <div class="row">-->
<!--                    <div class="mb-3 col-md-6 form-group ">-->
<!--                        <label for="colour" class="form-label">Colour <span-->
<!--                                class="optional">(optional)</span></label>-->
<!--                        <input type="text" class="form-control" id="colour" aria-describedby="colour" name="colour"-->
<!--                               placeholder="Black">-->
<!--                    </div>-->
<!--                    <div class="mb-3 col-md-6 form-group">-->
<!--                        <label for="material" class="form-label">Material <span-->
<!--                                class="optional">(optional)</span></label>-->
<!--                        <input type="text" class="form-control" id="material" aria-describedby="material"-->
<!--                               name="material"-->
<!--                               placeholder="Leather">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="mb-3 col form-group">-->
<!--                    <div class="d-flex">-->
<!--                        <label for="description" class="form-label">Description</label>-->
<!--                        <button type="button" data-command="insertUnorderedList" class="ulButton">-->
<!--                            <i class=' fas fa-list-ul'></i>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                    <div id="description" contenteditable="true" class="ulList border form-control">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="mb-3 col form-group">-->
<!--                    <div class="d-flex">-->
<!--                        <label for="inBox" class="form-label">What's in the box</label>-->
<!--                        <button type="button" data-command="insertUnorderedList" class="ulButton">-->
<!--                            <i class=' fas fa-list-ul'></i>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                    <div id="inBox" contenteditable="true" class="ulList border form-control">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="my-5 table-responsive-md">-->
<!--                    <div class="subHeading">PRICING</div>-->
<!--                    <table class="table table-bordered mt-3">-->
<!--                        <thead>-->
<!--                        <tr class="table-primary">-->
<!--                            <th scope="col">Quantity</th>-->
<!--                            <th scope="col">Price (ksh)</th>-->
<!--                            <th scope="col">Discount Price (ksh)</th>-->
<!--                            <th scope="col">Discount Start</th>-->
<!--                            <th scope="col">Discount End</th>-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->
<!--                        <tr>-->
<!--                            <td><input type="number" name="quantity"></td>-->
<!--                            <td><input type="number" name="price"></td>-->
<!--                            <td><input type="number" name="discountPrice"></td>-->
<!--                            <td><input type="date" name="discountStart"></td>-->
<!--                            <td><input type="date" name="discountEnd"></td>-->
<!--                        </tr>-->
<!--                        </tbody>-->
<!--                    </table>-->
<!--                </div>-->
<!--                <div class="my-5">-->
<!--                    <div class="subHeading">IMAGES</div>-->
<!--                    <div class="row imgRow">-->
<!--                        <div class="col-2 card imageCard">-->
<!--                            <img src="..." class="imgCol">-->
<!--                            <div class="card-body d-flex justify-content-between">-->
<!--                                <div>Main</div>-->
<!--                                <div>-->
<!--                                    <i class="far fa-edit"></i>-->
<!--                                    <i class="fas fa-plus addImage"></i>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <div>
                    <!--                    <span id="visibility" class="mt-3">Visibility</span>-->
                    <!--                    <label class="switch">-->
                    <!--                        <input type="checkbox" name="status" class="visibilitySwitch" checked>-->
                    <!--                        <span class="slider round"></span>-->
                    <!--                    </label>-->
                </div>
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
                <button class="btn btn-warning save">SAVE AND CREATE COPY</button>
            </div>
        </form>
    </div>


</div>
</div>
        `
    });
};