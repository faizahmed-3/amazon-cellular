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
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;display=swap" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">

    <!--    Custom CSS -->
    <link rel="stylesheet" href="/css/app.css">

    <!--    Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

    <!--    Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

    <!--    Chart JS-->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>

    <title>${title} | Amazon Cellular</title>
</head>
<body>

<!--Pre Loader-->
<div class="loader">
    <img src="/img/loader.gif" alt="Loading...">
</div>

<!--Admin Layout-->
<section id="admin">
    <!--    Sidebar-->
    <div class="sidebar border border-end ">
        <div class="text-center mt-2 sidebarItem"><img src="/img/logo.jpg" alt="Logo" class="img-fluid">
        </div>
        <div class="sidebarItem ">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/dashboard/'">
                     Dashboard
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/orders/'">
                    <div>Orders</div></li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/products/'">
                     Products
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/categories/'">
                     Categories
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/brands/'">
                     Brands
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/special/'">
                     Special Categories
                </li>
                <li class="list-group-item list-group-item-action">
                     Reports
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/customers/'" >
                     Customers
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/admins/'">
                     Admins
                </li>
                <li class="list-group-item list-group-item-action" onclick="location.href='/admin/settings/'">
                    <i class="fas fa-cog"></i> Settings
                </li>
            </ul>
        </div>
    </div>

    <!--    Main Panel-->
    <div class="mainPanel">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
        <button class="btn btn-primary rounded-circle" id="sidebarToggle"><i class="fas fa-plus"></i></button>
        <a class="navbar-brand" href="#">${title}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <button class="btn btn-primary addBtn" onclick="location.href='/admin/products/new'">Add Product</button>
                </li>
                <li class="nav-item">
                    <button class="btn btn-secondary addBtn" onclick="location.href='/admin/login/logout'">Log Out</button>
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
        crossorigin="anonymous">
</script>       

<!--Custom JS -->
<script src="/js/admin.js"></script>

</body>
</html>
`
}