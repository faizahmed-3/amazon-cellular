const layout = require('../layout');

module.exports = () => {
    return layout({
        content: `
            <div id="add-product" class="container card my-5">
            <div class="card-header">
                Product Information
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3 form-group">
                        <label for="name" class="form-label" required>Product Name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="product name"
                               placeholder="Product example">
                    </div>
                    <div class="row">
                        <div class="mb-3 col-md-4 form-group ">
                            <label for="category" class="form-label" required="">Category</label>
                            <select class="form-select" aria-label="Select Category" id="category">
                                <option value="cases">Cases</option>
                                <option value="protectors">Protectors</option>
                                <option value="power">Power</option>
                                <option value="power">Audio</option>
                                <option value="watches">Smart Watches and Accesories</option>
                                <option value="camera">Camera Accesories</option>
                                <option value="car">Car Accesories</option>
                                <option value="computer">Computer Accesories</option>
                                <option value="tv">TV Accesories</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div class="mb-3 col-md-4 form-group ">
                            <label for="special" class="form-label" required="">Special Category</label>
                            <select class="form-select" aria-label="Special Category" id="special">
                                <option value="none">None</option>
                                <option value="featured">Featured Products</option>
                                <option value="newArrivals">New Arrivals</option>
                                <option value="sale">Sale</option>
                            </select>
                        </div>
                        <div class="mb-3 col-md-4 form-group ">
                            <label for="brand" class="form-label" required>Brand</label>
                            <input type="text" class="form-control" id="brand" aria-describedby="product name"
                                   placeholder="Nillkin">
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-md-6 form-group ">
                            <label for="colour" class="form-label">Colour <span
                                    class="optional">(optional)</span></label>
                            <input type="text" class="form-control" id="colour" aria-describedby="colour"
                                   placeholder="Black">
                        </div>
                        <div class="mb-3 col-md-6 form-group">
                            <label for="material" class="form-label">Material <span
                                    class="optional">(optional)</span></label>
                            <input type="text" class="form-control" id="material" aria-describedby="material"
                                   placeholder="Leather">
                        </div>
                    </div>
                    <div class="mb-3 col form-group">
                        <div class="d-flex">
                            <label for="description" class="form-label" required>Description</label>
                            <button type="button" data-command="insertUnorderedList" class="ulButton">
                                <i class=' fas fa-list-ul'></i>
                            </button>
                        </div>
                        <div id="description" contenteditable="true" class="ulList border form-control">
                        </div>
                    </div>
                    <div class="mb-3 col form-group">
                        <div class="d-flex">
                            <label for="inBox" class="form-label" required>What's in the box</label>
                            <button type="button" data-command="insertUnorderedList" class="ulButton">
                                <i class=' fas fa-list-ul'></i>
                            </button>
                        </div>
                        <div id="inBox" contenteditable="true" class="ulList border form-control">
                        </div>
                    </div>
                    <div class="my-5 table-responsive-md">
                        <div class="subHeading">PRICING</div>
                        <table class="table table-bordered mt-3">
                            <thead>
                            <tr class="table-primary">
                                <th scope="col">Quantity</th>
                                <th scope="col">Price (ksh)</th>
                                <th scope="col">Sale Price (ksh)</th>
                                <th scope="col">Sale Start</th>
                                <th scope="col">Sale End</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>212</td>
                                <td>2500</td>
                                <td>2200</td>
                                <td>date</td>
                                <td>date</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="my-5">
                        <div class="subHeading">IMAGES</div>
                        <div class="row imgRow">
                            <div class="col-2 card imageCard">
                                <img src="..." class="imgCol">
                                <div class="card-body d-flex justify-content-between">
                                    <div>Main</div>
                                    <div>
                                        <i class="far fa-edit"></i>
                                        <i class="fas fa-plus addImage"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-3 d-flex justify-content-evenly">
                        <div>
                            <span id="visibility" class="mt-3">Visibility</span>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <button class="btn btn-success save">SAVE</button>
                        <button class="btn btn-warning save">SAVE AND CREATE COPY</button>
                    </div>
                </form>
            </div>
        </div>
        `
    });
};