const layout = require('../layout');
const title = 'New Order';
const {getInput, getError}= require('../../../middlewares/otherFunctions');

module.exports = ({input, error}) => {
    return layout({
        title: title,
        content: `<div id="add-product" class="container card my-5">
    <div class="card-header">
        Order Information
    </div>
    <div class="card-body">
        <form method="get" >
            <div class="row mb-4">
                <div class="mb-3 col-md-6 form-group">
                <label for="email" class="form-label" required>Email</label>
                <input name="email" type="text" class="form-control" id="email" aria-describedby="email" value="${getInput(input, 'email')}" required>
                <div class="inputError">${getError(error, 'email')}</div>
            </div>
                <div class="mb-3 col-md-6 form-group">
                <label for="phone" class="form-label" required>Phone</label>
                <input name="phone" type="text" class="form-control" id="phone" aria-describedby="phone" value="${getInput(input, 'phone')}" required>
                <div class="inputError">${getError(error, 'phone')}</div>
            </div>
            </div>
            <div class="mb-3 col-md-4 form-group">
                <label for="email" class="form-label" required>Email</label>
                <input name="email" type="text" class="form-control" id="email" aria-describedby="email" value="${getInput(input, 'email')}" required>
                <div class="inputError">${getError(error, 'email')}</div>
            </div>
            <div class="my-3 d-flex justify-content-evenly">
                <button class="btn btn-success save" type="submit" value="submit" formaction="/admin/orders">SAVE</button>
                <button class="btn btn-warning save" type="submit" value="submit" formaction="/admin/orders">SAVE AND CREATE COPY</button>
                <a class="btn btn-secondary save" onclick="location.href='/admin/orders'">CANCEL</a>
            </div>
        </form>
    </div>
</div>`})
}