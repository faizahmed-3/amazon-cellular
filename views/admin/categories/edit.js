const layout = require('../layout');
const title = 'Edit Category';
const {getError} = require('../../../middlewares/otherFunctions');

module.exports = ({category, error}) => {
    return layout({
        title: title,
        content: `
        <div id="add-product" class="container card my-5">
    <div class="card-header">
        Category Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/categories/edit/${category.id}">
            <div class="mb-3 form-group">
                <label for="name" class="form-label">Category Name</label>
                <input name="category_name" value="${category.category_name}" type="text" class="form-control" id="name" aria-describedby="category name">
                <div class="inputError">${getError(error, 'category_name')}</div>
            </div>
            <div class="my-3 d-flex justify-content-center">
                <button class="btn btn-success save" type="submit" value="submit" >SAVE</button>
            </div>
        </form>
    </div>
</div>
        `})
}