module.exports = ({title, content}) => {
    return `<!DOCTYPE html>
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


    <title>${title} | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>

<!--extra navbar-->
<div class="container-fluid" id="extraNav">
    <div class="d-flex justify-content-center" id="cred">
        <div class="clickable" onclick="location.href='/register'">Register</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='/login'">Log In</div>
        <div class="separator mx-2">|</div>
        <div class="clickable" onclick="location.href='track.html'">Track Order</div>
    </div>
    <div>
        <div class="">Need Help?</div>
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
                    <a class="formBtn" href="/wishlist">
                    <i class="bi bi-heart mx-2 notification mt-1">
                    <span class="tip">4</span>
                       </i>
                       </a>

                    <a class="formBtn" href="/cart">
                        <i class="bi bi-cart3 mx-2 notification mt-1" ><span class="tip">2</span></i></a>
                </form>
            </div>

            <ul class="navbar-nav mb-2 order-lg-first mx-lg-auto">
                <li class="nav-item mx-2">
                    <a class="nav-link active pb-0" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item mx-2 dropdown">
                    <a class="nav-link dropdown-toggle pb-0" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="bydevice.html">Find By Device</a></li>
                        <li><a class="dropdown-item" href="brands.html">Brands</a></li>
                        <li><a class="dropdown-item" href="cases.html">Cases</a></li>
                        <li><a class="dropdown-item" href="#">Power</a></li>
                        <li><a class="dropdown-item" href="#">Audio</a></li>
                        <li><a class="dropdown-item" href="#">Protectors</a></li>
                        <li><a class="dropdown-item" href="#">Smart Watch Accessories</a></li>
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
                    <button type="button" class="btn btn-success reg" onclick="location.href='/'">CHECKOUT
                    </button>
                    <button type="button" class="btn btn-warning reg" onclick="location.href='/register'">REGISTER
                    </button>
                    <button type="button" class="btn btn-warning reg" onclick="location.href='/login'">LOGIN
                    </button>

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

<!-- Modals -->

<!--Cart Modal-->


<!--Product view Modal-->
<div class="modal fade" id="product-view" tabindex="-1" aria-labelledby="Product view" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="product-title">Nillkin CamShield Pro cover case for Apple iPhone 12</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="container-fluid">
                    <div class="row ">
                        <div class="col-md-7 col-lg-8">
                            <img src="/img/home/featured/1.jpg" alt="" id="prod-main-img">
                        </div>
                        <div class="col-md-5 col-lg-4 d-flex flex-column justify-content-between">
                            <div class="row small-img-row">
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/1.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/watches.jfif" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/3.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/4.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/5.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/6.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/3.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/4.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/5.jpg" alt="" class="prod-small-img">
                                </div>
                                <div class="col-2 small-img-col">
                                    <img src="/img/home/featured/6.jpg" alt="" class="prod-small-img">
                                </div>
                            </div>
                            <div>
                                <div id="prod-price"><span>ksh.</span> 2500</div>
                                <div class="mt-2 mt-md-1 mt-lg-2 count">
                                    <input type="number" placeholder="Quantity" class="form-control">
                                    <div class="count-sub"><span>Subtotal (ksh.):</span> 3250</div>
                                </div>
                                <div class="mt-2 mt-md-1 mt-lg-2  d-flex justify-content-evenly">
                                    <button class="btn btn-outline-success prod-start"> Wishlist <i
                                            class="bi bi-heart"></i></button>
                                    <button class="btn btn-outline-success prod-start"> Cart <i
                                            class="bi bi-cart3"></i></button>
                                </div>
                                <div class="mt-2 mt-md-1 mt-lg-2  d-flex justify-content-center">
                                    <button class="btn btn-success checkout" onclick="location.href='checkout.html'">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                            <div id="share" class="text-center">
                                <i class="bi bi-share-fill px-2"></i>
                                <i class="fab fa-facebook-f"></i>
                                <i class="fab fa-instagram"></i>
                                <i class="fab fa-twitter"></i>
                                <i class="fab fa-whatsapp"></i>
                                <p class="mb-0 mt-1 scroll d-none d-lg-block">Scroll down for more details</p>
                            </div>

                        </div>
                        <div>
                            <div class="description mt-3"> Description</div>
                            <ul class="bullets">
                                <li>Quality matte cover that protects the back and the edges</li>
                                <li>Anti-scratch and wear-resistant surface</li>
                                <li>All ports and controls are easily accessible</li>
                                <li>High protection from usual damages in combination with a modern design</li>
                                <li>Material: Highly durable polycarbonate</li>
                            </ul>
                            <div class="description">What's in the box</div>
                            <ul class="bullets">
                                <li>Nillkin Super Frosted Shield Case</li>
                                <li>Screen Protector Film</li>
                                <li>Cleaning Cloth</li>
                                <li>De-dust Sticker</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

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