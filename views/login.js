const layout = require('./layout');
const title = 'Log In';

module.exports = () => {
    return layout({
        title: title,
        content: `
<section class="register">
    <div class="card">
        <div class="card-header">
            LOG IN
        </div>
        <div class="card-body">
            <form method="post" action="/login">
                <div class="mb-2 form-group">
                    <label for="email" class="form-label" required>Email Address</label>
                    <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="someone@email.com">
                </div>
                <div class="mb-2 form-group">
                    <label for="password" class="form-label" required>Password</label>
                    <input name="password" type="password" class="form-control" id="password"
                           placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                </div>
                <div class="text-center">
                    <button type="submit" class="mt-1 btn btn-success">SUBMIT</button>
                    <p class="mt-1">Don't have an account yet? <a href="/register">Create an account</a></p>
                </div>
            </form>
        </div>
    </div>
</section>
        `})
}