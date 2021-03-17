module.exports = ({content}) => {
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
    <link rel="stylesheet" href="/css/custom.css">

    <!--    Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

    <!--    Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

    <!--    Chart JS-->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>

    <title>Products | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="../img/loader.gif" alt="Loading...">
</div>

<!--Admin Layout-->
<section id="admin">
    <!--    Sidebar-->
    <div class="sidebar border border-end ">
        <div class="text-center mt-2 sidebarItem"><img src="../img/logo.jpg" alt="Logo" class="img-fluid">
        </div>
        <div class="sidebarItem ">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action  active">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </li>
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div><i class="fas fa-cart-plus"></i>Orders</div>
                    <span class="badge bg-danger rounded-pill">14</span></li>
                <li class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse"
                    data-bs-target="#productsList" aria-expanded="false" aria-controls="productsList">
                    <i class="fas fa-store-alt"></i>Products<i class="fas fa-caret-down ms-1"></i></li>
                <div class="collapse collapseMenu" id="productsList">
                    <div class="card card-body">
                        <ul class="mt-0 px-0">
                            <li class="list-group-item list-group-item-action " onclick="location.href='/products'">Add Product</li>
                            <li class="list-group-item list-group-item-action ">Phones List</li>
                            <li class="list-group-item list-group-item-action ">Brands</li>
                            <li class="list-group-item list-group-item-action ">Cases</li>
                            <li class="list-group-item list-group-item-action ">Protectors</li>
                            <li class="list-group-item list-group-item-action ">Power</li>
                            <li class="list-group-item list-group-item-action ">Audio</li>
                            <li class="list-group-item list-group-item-action ">Smart Watch</li>
                            <li class="list-group-item list-group-item-action ">Camera Accessories</li>
                            <li class="list-group-item list-group-item-action ">Car Accessories</li>
                            <li class="list-group-item list-group-item-action ">Computer Accessories</li>
                            <li class="list-group-item list-group-item-action ">TV Accessories</li>
                            <li class="list-group-item list-group-item-action ">Other Categories</li>
                        </ul>
                    </div>
                </div>
                <li class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse"
                    data-bs-target="#specialsList" aria-expanded="false" aria-controls="specialsList">
                    <i class="fas fa-award"></i></i>Special Categories<i class="fas fa-caret-down ms-1"></i></li>
                <div class="collapse collapseMenu" id="specialsList">
                    <div class="card card-body">
                        <ul class="mt-0 px-0">
                            <li class="list-group-item list-group-item-action ">Featured Products</li>
                            <li class="list-group-item list-group-item-action ">New Arrivals</li>
                            <li class="list-group-item list-group-item-action ">Sale</li>
                        </ul>
                    </div>
                </div>
                <li class="list-group-item list-group-item-action ">
                    <i class="fas fa-chart-line"></i> Reports
                </li>
                <li class="list-group-item list-group-item-action ">
                    <i class="fas fa-users"></i> Customers
                </li>
                <li class="list-group-item list-group-item-action ">
                    <i class="fas fa-user-cog"></i> Admins
                </li>
            </ul>
        </div>
    </div>

    <!--    Main Panel-->
    <div class="mainPanel">
        <!--        Navbar-->
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div class="container-fluid">
                <button class="btn btn-primary rounded-circle" id="sidebarToggle"><i class="fas fa-plus"></i></button>
                <a class="navbar-brand" href="#">Add Product</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <button class="btn btn-primary addBtn" onclick="location.href='products.html'">Add Product</button>
                        </li>
                        <li class="nav-item notiCount">
                            <i class="bi bi-bell notification"><span class="tip">4</span></i>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Faiz Ahmed
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Activity Log</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        ${content}

    </div>
</section>

<!--Footer-->
<section id="footer" class="container-fluid px-0">
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
<script src="/js/admin.js"></script>
</body>
</html>
`
}