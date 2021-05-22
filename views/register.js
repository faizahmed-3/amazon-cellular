const layout = require('./layout');
const title = 'Register';
const {getInput, getError}= require('../middlewares/otherFunctions');

module.exports = ({input, error, exists}) =>{
    function existsCheck(exists) {
        if (exists){
            return`
                <div class="inputError">The email you entered already exists</div>
            `}
        else {
            return ` `
        }
    }
    return layout({
        title: title,
        content: `
<section class="register">
    <div class="card">
        <div class="card-header">
            Register
        </div>
        <div class="card-body">
            <form method="POST" action="/register">
                <div class="mb-2 form-group">
                    <label for="full_name" class="form-label" required>Full Name</label>
                    <input name="full_name" type="text" class="form-control" id="full_name" aria-describedby="name" value="${getInput(input, 'full_name')}" required>
                    <div class="inputError">${getError(error, 'full_name')}</div>
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="email" class="form-label" required>Email Address</label>
                        <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${getInput(input, 'email')}" required>
                        <div class="inputError">${getError(error, 'email')}</div>
                        ${existsCheck(exists)}
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="phone" class="form-label" required>Phone Number</label>
                        <input name="phone" type="number" class="form-control" id="phone" aria-describedby="phone number" value="${getInput(input, 'phone')}" required>
                        <div class="inputError">${getError(error, 'phone')}</div>
                    </div>
                        
                </div>
                <div class="row">
                    <div class="mb-2 col-md-6 form-group">
                        <label for="password" class="form-label" required>Password</label>
                        <input name="password" type="password" class="form-control" id="password" value="${getInput(input, 'password')}" required>
                        <div class="inputError">${getError(error, 'password')}</div>
                    </div>
                    <div class="mb-2 col-md-6 form-group">
                        <label for="password_confirmation" class="form-label" required>Confirm Password</label>
                        <input name="password_confirmation" type="password" class="form-control" id="password_confirmation" value="${getInput(input, 'password_confirmation')}" required>
                        <div class="inputError">${getError(error, 'password_confirmation')}</div>
                    </div>
                </div>
                <div class="mb-2 form-group">
                    <label for="address" class="form-label" required>Shipping Address</label>
                </div>
                <input id="pac-input" class="controls border border-dark border-3" type="text" aria-describedby="address" placeholder="Search">
                <div id="map" class="form-control"></div>
                <input type="hidden" name="latitude" id="latitude">
                <input type="hidden" name="longitude" id="longitude">
                
                <div class="text-center mt-4">
                    <button type="submit" value="submit" class="btn btn-success">SUBMIT</button>
                    <p class="mt-2">Already have an account? <a href="/login">Log in here</a></p>
                </div>
            </form>
        </div>
    </div>
</section>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDP7SB8pRSs-0zGJ0ySIuhW32CUMjkvC0s&callback=initMap&libraries=places&v=weekly" async >
</script>

        `})
}