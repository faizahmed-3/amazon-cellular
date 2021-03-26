const layout = require('../layout');
const title = 'Add Product';

module.exports = () => {
    return layout({
        title: title,
        content: `

<div id="add-product" class="container card my-5">
    <div class="card-header">
        Product Information
    </div>
    <div class="card-body">
        <form id="addProductsForm" method="POST" action="/admin/products">
            <div class="mb-3 form-group">
                <label for="productName" class="form-label">Product Name</label>
                <input name="productName" type="text" class="form-control" id="productName" aria-describedby="product name">
            </div>
            <div>
                <!--                    <div class="row">-->
                <!--                        <div class="mb-3 col-md-4 form-group ">-->
                <!--                            <label for="category" class="form-label" >Category</label>-->
                <!--                            <select class="form-select" aria-label="Select Category" id="category" name="categoryID">-->
                <!--                                <option value="cases">Cases</option>-->
                <!--                                <option value="protectors">Protectors</option>-->
                <!--                                <option value="power">Power</option>-->
                <!--                                <option value="power">Audio</option>-->
                <!--                                <option value="watches">Smart Watches and Accesories</option>-->
                <!--                                <option value="camera">Camera Accesories</option>-->
                <!--                                <option value="car">Car Accesories</option>-->
                <!--                                <option value="computer">Computer Accesories</option>-->
                <!--                                <option value="tv">TV Accesories</option>-->
                <!--                                <option value="others">Others</option>-->
                <!--                            </select>-->
                <!--                        </div>-->
                <!--                        <div class="mb-3 col-md-4 form-group ">-->
                <!--                            <label for="special" class="form-label" >Special Category</label>-->
                <!--                            <select class="form-select" aria-label="Special Category" id="special" name="specialID">-->
                <!--                                <option value="none">None</option>-->
                <!--                                <option value="featured">Featured Products</option>-->
                <!--                                <option value="newArrivals">New Arrivals</option>-->
                <!--                                <option value="sale">Sale</option>-->
                <!--                            </select>-->
                <!--                        </div>-->
                <!--                        <div class="mb-3 col-md-4 form-group ">-->
                <!--                            <label for="brand" class="form-label" >Brand</label>-->
                <!--                            <input type="text" class="form-control" id="brand" aria-describedby="product name" name="brandID"-->
                <!--                                   placeholder="Nillkin">-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--            <div class="row">-->
                <!--                <div class="mb-3 col-md-6 form-group ">-->
                <!--                    <label for="colour" class="form-label">Colour <span-->
                <!--                            class="optional">(optional)</span></label>-->
                <!--                    <input type="text" class="form-control" id="colour" aria-describedby="colour" name="colour"-->
                <!--                           placeholder="Black">-->
                <!--                </div>-->
                <!--                <div class="mb-3 col-md-6 form-group">-->
                <!--                    <label for="material" class="form-label">Material <span-->
                <!--                            class="optional">(optional)</span></label>-->
                <!--                    <input type="text" class="form-control" id="material" aria-describedby="material" name="material"-->
                <!--                           placeholder="Leather">-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div class="mb-3 col form-group">-->
                <!--                <div class="d-flex">-->
                <!--                    <label for="description" class="form-label">Description</label>-->
                <!--                    <button type="button" data-command="insertUnorderedList" class="ulButton">-->
                <!--                        <i class=' fas fa-list-ul'></i>-->
                <!--                    </button>-->
                <!--                </div>-->
                <!--                <div id="description" contenteditable="true" class="ulList border form-control">-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div class="mb-3 col form-group">-->
                <!--                <div class="d-flex">-->
                <!--                    <label for="inBox" class="form-label">What's in the box</label>-->
                <!--                    <button type="button" data-command="insertUnorderedList" class="ulButton">-->
                <!--                        <i class=' fas fa-list-ul'></i>-->
                <!--                    </button>-->
                <!--                </div>-->
                <!--                <div id="inBox" contenteditable="true" class="ulList border form-control">-->
                <!--                </div>-->
                <!--            </div>-->
            </div>
            <div class="my-5 table-responsive-md">
                <div class="subHeading">PRICING</div>
                <table class="table table-bordered mt-3">
                    <thead>
                    <tr class="table-primary">
                        <th scope="col">Quantity</th>
                        <th scope="col">Price (ksh)</th>
                        <th scope="col">Discount Price (ksh)</th>
                        <th scope="col">Discount Start</th>
                        <th scope="col">Discount End</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="number" name="quantity"></td>
                        <td><input type="number" name="price"></td>
                        <td><input type="number" name="discountPrice"></td>
                        <td><input type="date" name="discountStart"></td>
                        <td><input type="date" name="discountEnd"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
<!--            <div class="my-5">-->
<!--                <div class="subHeading">IMAGES</div>-->
<!--                <div class="row imgRow">-->
<!--                    <div class="col-2 card imageCard">-->
<!--                        <img src="..." class="imgCol">-->
<!--                        <div class="card-body d-flex justify-content-between">-->
<!--                            <div>Main</div>-->
<!--                            <div>-->
<!--                                <i class="far fa-edit"></i>-->
<!--                                <i class="fas fa-plus addImage"></i>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
</div>
            <div class="my-3 d-flex justify-content-evenly">
                <div>
                    <span id="visibility" class="mt-3">Visibility</span>
                    <label class="switch">
                        <input type="checkbox" name="status" class="visibilitySwitch" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
                <button class="btn btn-warning save">SAVE AND CREATE COPY</button>
            </div>
        </form>
    </div>
</div>
        `});
};