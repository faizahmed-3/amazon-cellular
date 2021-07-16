const {extraNav, footer, wishlistCount, cartCount} = require('../middlewares/otherFunctions');

module.exports = ({title, req, content}) => {

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
    <link rel="preconnect" href="https://fonts.gstatic.com" >
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" >

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css" >

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css" >

    <!--        Font Awesome -->
    <link rel="preload" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous" as="style"
    onload="this.onload=null;this.rel='stylesheet'">

    <!--    Bootstrap Icons -->
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">

    <!-- Maps   -->
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>


    <title>${title} | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<!--<div class="loader">-->
<!--    <img src="/img/loader.gif" alt="Loading...">-->
<!--</div>-->

<!--extra navbar-->
<div class="container-fluid" id="extraNav">
    
    <div class="d-flex" id="cred">
        ${extraNav(req)}
    </div>
    
</div>

<!--Navbar -->
<nav class=" navbar navbar-expand-lg navbar-light bg-white py-0 border-bottom">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="/img/logo.webp" alt="" class="img-fluid" id="logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-column flex-lg-row mt-1" id="navbarSupportedContent">

            <div id="nav-icons" class="order-lg-last ml-lg-auto row justify-content-center">
                <form method="get" class="form-inline d-flex col-10 col-md-7 col-lg-10 col-xl-11" action="/search">
                    <div class="input-group">
                        <label for="search-nav"></label>
                        <input type="text" class="form-control" name="query" placeholder="Search" id="search-nav">
                        <div class="input-group-append">
                    <span class="input-group-text notification">
                        <button type="submit" class="formBtn"><i class="bi bi-search mx-2 "></i></button>
                    </span>
                        </div>
                    </div>
                    
                    <i class="bi bi-heart mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#wishlist"><span class="tip">${wishlistCount(req)}</span></i>
                       
                    <i class="bi bi-cart3 mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#cart"><span class="tip">${cartCount(req)}</span></i>
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
                        <li><a class="dropdown-item" href="/6088049365de8726600704af">Cases</a></li>
                        <li><a class="dropdown-item" href="/608922137c058834a8fa35e8">Protectors</a></li>
                        <li><a class="dropdown-item" href="/6088049f65de8726600704b0">Audio</a></li>
                        <li><a class="dropdown-item" href="/6089221f7c058834a8fa35e9">Power</a></li>
                        <li><a class="dropdown-item" href="/608922917c058834a8fa35f0">Smart Watches</a></li>
                        <li><a class="dropdown-item" href="/608922477c058834a8fa35eb">Camera Accessories</a></li>
                        <li><a class="dropdown-item" href="/6089224d7c058834a8fa35ec">Car Accessories</a></li>
                        <li><a class="dropdown-item" href="/608922557c058834a8fa35ed">Computer Accessories</a></li>
                        <li><a class="dropdown-item" href="/608922687c058834a8fa35ef">Others</a></li>
                    </ul>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link pb-0" href="/contact">FAQs</a>
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
                    ${footer(req)}
                </div>
            </div>
        </div>
    </div>

    <div class="footer2 text-center p-2">
        &copy; Amazon Cellular <span id="copyright"> 2021</span>. All Rights Reserved.
    </div>
</section>

<!--Seach overlay-->
<div id="myOverlay" class="overlay">
  <span class="closebtn" title="Close Overlay">x</span>
  <div class="overlay-content">
    <form method="get" action="/search">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" name="query">
          <button type="submit"><i class="bi bi-search mx-2 "></i></button>
        </div>
    </form>
  </div>
</div>

<!--bottom panel-->
<section id="bottom-panel" >
   <div id="wrapper">
        <div class="b-item" onclick="window.location.href='/'"><i class="fas fa-home"></i> <br>Home</div>
        <div class="b-item" onclick="window.location.href='/categories'"><i class="fas fa-list-alt"></i> <br>Categories</div>
        <div class="b-item">                    
            <i class="fas fa-heart mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#wishlist"><span class="tip">${wishlistCount(req)}</span></i>
            <br> Wishlist
        </div>
        <div class="b-item">
            <i class="fas fa-shopping-cart mx-2 notification mt-1" data-bs-toggle="modal" data-bs-target="#cart"><span class="tip">${cartCount(req)}</span></i>
            <br> Cart
        </div>
        <div class="b-item" id="bpSearch"><i class="fas fa-search"></i> <br> Search</div>
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

`
}