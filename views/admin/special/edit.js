const layout = require('../layout');
const title = 'Edit Special Categories';
const {getError} = require('../../../middlewares/otherFunctions');

module.exports = ({special, error}) => {
    return layout({
        title: title,
        content: `
        <div id="add-product" class="container card my-5">
    <div class="card-header">
        Special Categories Information
    </div>
    <div class="card-body">
        <form method="POST" action="/admin/special/edit/${special.id}">
            <div class="mb-3 form-group">
                <label for="special_name" class="form-label">Special Category Name</label>
                <input name="special_name" value="${special.special_name}" type="text" class="form-control" id="name" aria-describedby="special name">
                <div class="inputError">${getError(error, 'special_name')}</div>
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit">SAVE</button>
            </div>
        </form>
    </div>
</div>
        `})
}