const {extraNav, footer, getCount} = require('../middlewares/otherFunctions');

module.exports = ({title, content}) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">

    <!--    Favicon -->
    <link rel="icon" href="/img/favicon.ico">

    <!--    Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Montserrat&display=swap"
          rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css">

    <!--    Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

    <!--    Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

    <!-- Maps   -->
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>


    <title>${title} | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>

<!--extra navbar-->
<div class="container-fluid" id="extraNav">
    
    <div class="d-flex" id="cred">
        ${extraNav()}
    </div>
    
</div>

<!--Navbar -->
<nav class=" navbar navbar-expand-lg navbar-light bg-white py-0 border-bottom">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="/img/logo.jpg" alt="" class="img-fluid" id="logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-column flex-lg-row mt-1" id="navbarSupportedContent">

            <div id="nav-icons" class="order-lg-last ml-lg-auto row justify-content-center">
                <form class="form-inline d-flex col-10 col-md-7 col-lg-10 col-xl-11">
                    <div class="input-group">
                        <label for="search-nav"></label>
                        <input type="text" class="form-control" placeholder="Search" id="search-nav">
                        <div class="input-group-append">
                    <span class="input-group-text notification">
                        <i class="bi bi-search mx-2 "></i>
                    </span>
                        </div>
                    </div>
                    
                    <i class="bi bi-heart mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#wishlist"><span class="tip">${getCount('wishlistCount')}</span></i>
                       

                    <i class="bi bi-cart3 mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#cart"><span class="tip">${getCount('cartCount')}</span></i>
                </form>
            </div>

            <ul class="navbar-nav mb-2 order-lg-first mx-lg-auto">
                <li class="nav-item mx-2">
                    <a class="nav-link pb-0" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item mx-2 dropdown">
                    <a class="nav-link dropdown-toggle pb-0" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="cases.html">Cases</a></li>
                        <li><a class="dropdown-item" href="#">Power</a></li>
                        <li><a class="dropdown-item" href="#">Audio</a></li>
                        <li><a class="dropdown-item" href="#">Protectors</a></li>
                        <li><a class="dropdown-item" href="#">Smart Watches</a></li>
                        <li><a class="dropdown-item" href="#">Camera Accessories</a></li>
                        <li><a class="dropdown-item" href="#">Car Accessories</a></li>
                        <li><a class="dropdown-item" href="#">Computer Accessories</a></li>
                        <li><a class="dropdown-item" href="#">TV Accessories</a></li>
                        <li><a class="dropdown-item" href="#">Others</a></li>
                    </ul>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link pb-0" href="faqs.html">FAQ's</a>
                </li>
            </ul>


        </div>
    </div>
</nav>


${content}



<!--Footer-->
<section id="footer" class="container-fluid px-0">
    <div class="footer1 p-2 p-md-4">
        <div class="row">
            <div class="col-md-3 col-lg-2 offset-xl-2 offset-md-1">
                <div class="info-heading mb-md-2">
                    Help
                </div>
                <ul class="info-list">
                    <li><a href="#">About us</a></li>
                    <li><a href="#">How to order</a></li>
                    <li><a href="#">Payment</a></li>
                    <li><a href="#">Delivery</a></li>
                    <li><a href="#">Return policy</a></li>
                    <li><a href="#">Customer care</a></li>
                </ul>
            </div>
            <div class="col-md-5 col-lg-4 offset-lg-1 offset-xl-0">
                <div class="text-center">
                    <p id="reach">Contact us</p>
                    <p>
                        <button class="btn btn-primary phone"><a href="tel:+254705063256"><i
                                class="bi bi-telephone-fill"></i> Call </a></button>
                        <button class="btn btn-primary phone"><a href="mailto:amazoncelullar@gmail.com"><i
                                class="bi bi-envelope-fill"></i> Mail</a></button>
                        <button class="btn btn-primary phone"><a href="sms:+254705063256"><i
                                class="bi bi-chat-dots-fill"></i> SMS</a></button>
                    </p>
                    <p>
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-whatsapp"></i>
                    </p>
                </div>
            </div>
            <div class="col-md-2 offset-lg-1">
                <div class="d-flex justify-content-evenly justify-content-md-between flex-md-column ">
                    ${footer()}
                </div>
            </div>
        </div>
    </div>

    <div class="footer2 text-center p-2">
        &copy; Amazon Cellular <span id="copyright"> 2021</span>. All Rights Reserved.
    </div>
</section>


<!--Back to top -->
<a href="#" class="to-top">
    <i class="fas fa-chevron-up"></i>
</a>



<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>

<!--Custom JS -->
<script src="/js/app.js"></script>

<!--Modals-->
<script>
    let myModal = document.getElementById('myModal')
    let myInput = document.getElementById('myInput')

    if (myModal) {
        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus()
        })
    }
</script>


</body>
</html>

`}