const layout = require('./layout');
const title = 'Register';

module.exports = () =>{
    return layout({
        title: title,
        content: `<section class="register">
    <div class="card">
        <div class="card-header">
            Register
        </div>
        <div class="card-body">
            <form method="POST" action="/register">
                <div class="mb-2 form-group">
                    <label for="fullName" class="form-label" required>Full Name</label>
                    <input name="fullName" type="text" class="form-control" id="fullName" aria-describedby="name" placeholder="Name">
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="email" class="form-label" required>Email Address</label>
                        <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                               placeholder="someone@email.com">
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="phone" type="number" class="form-control" id="phone"
                               aria-describedby="phone number" placeholder="0712345678">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="password" class="form-label" required>Password</label>
                        <input name="password" type="password" class="form-control" id="password"
                               placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="passwordRepeat" class="form-label" required>Confirm Password</label>
                        <input name="passwordRepeat" type="password" class="form-control" id="passwordRepeat"
                               placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                    </div>
                </div>
                <div class="form-group">
                    <label for="county" class="form-label" required="">County</label>
                    <select name="county" class="form-select mb-3" aria-label="Select County" id="county">
                        <option value="Nairobi" type="text" selected>Nairobi</option>
                        <option value="Mombasa" type="text">Mombasa</option>
                        <option value="Kisumu" type="text">Kisumu</option>
                    </select>
                </div>
                <div class="mb-2 form-group">
                    <label for="town" class="form-label" required>Town/ City</label>
                    <input name="town" type="text" class="form-control" id="town" aria-describedby="town"
                           placeholder="e.g Embakasi, Kasarani etc.">
                </div>
                <div class="mb-2 form-group">
                    <label for="street" class="form-label" required>Street Address</label>
                    <input name="street" type="text" class="form-control" id="street" aria-describedby="street"
                           placeholder="Estate/ Building/ Floor">
                </div>
                <div class="text-center mt-4">
                    <button type="submit" value="submit" class="btn btn-success">SUBMIT</button>
                    <p class="mt-2">Already have an account? <a href="/login">Log in here</a></p>
                </div>
            </form>
        </div>
    </div>
</section>
        `})
}