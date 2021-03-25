const layout = require('./layout');
const title = 'Home';

module.exports = ({products}) => {
    const renderedProducts = products.map(
        product => {
            return `<div class="col-6 col-md-4 col-lg-2">
    <div class="card">
        <img src="/img/home/featured/5.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#product-view">
        <div class="card-body">
            <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">${product.productName}</h6>
            <p class="card-text mb-0">ksh. ${product.discountPrice} <span>${product.price}</span></p>
            <div class="action">
                <i class="bi bi-heart"></i>
                <i class="bi bi-cart3"></i>
            </div>
        </div>
    </div>
</div>
            `}).join('');

    return layout({
        title: title,
        content: `<div class="index">
<!--Tiles-->
<section id="tiles">
    <div class="container-fluid">
        <div class="row mt-2 mt-lg-0  my-lg-4">
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/phones.jfif" class="card-img-top image-tile" alt="..."
                         onclick="location.href='findby.html'">
                    <div class="card-footer text-center">
                        Find By Device
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='brands.html'">
                    <img src="/img/home/brands.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Brands
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/cases.jfif" class="card-img-top image-tile" alt="..."
                         onclick="location.href='cases.html'">
                    <div class="card-footer text-center">
                        Cases
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/protector.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Protectors
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/power.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Power
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/audio.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Audio
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-lg-4">
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/watches.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Smart Watch and Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/camera.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Camera <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/car.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Car <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/comp.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Computer <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/tv.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Tv <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card">
                    <img src="/img/home/others.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Other <br> Categories
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--Why -->
<section id="why" class="container-fluid text-center p-3">
    <h4 class="why-title">
        Why Amazon Cellular?
    </h4>
    <div class="row ">
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Secure Payments </h5>
                <i class="fas fa-user-shield"></i>
            </div>
            <p>Payments are only done upon delivery. Receive what you had actually ordered.
                <span>*Applies for orders within Nairobi and it environs</span></p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Quick Deliveries </h5>
                <i class="fas fa-shipping-fast"></i>
            </div>
            <p>Receive your product within 24 hours of placing your order, just as you like it! <span>*Applies for orders within Nairobi and
                its environs</span></p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Genuine Products </h5>
                <i class="fas fa-check-circle"></i>
            </div>
            <p>Be assured of quality products as we provide only the best and genuine products</p>
        </div>
        <div class="col-md-6 col-lg-3 mt-2">
            <div class="why-subtitle">
                <h5>Best Prices </h5>
                <i class="fas fa-money-bill-alt"></i>
            </div>
            <p>A true value for your money as we provide quality products at the most affordable rates.</p>
        </div>
    </div>
</section>

<!--Test Products-->
<section class="container featured">
    <h4 class="section-title">
         Products Test
    </h4>
    <button type="button" class="btn btn-sm see-all" onclick="location.href='featured.html'">SEE ALL</button>
    <div class="row">
        ${renderedProducts}
    </div>
</section>

<!--Featured Products-->
<section class="container featured">
    <h4 class="section-title">
        Featured Products
    </h4>
    <button type="button" class="btn btn-sm see-all" onclick="location.href='featured.html'">SEE ALL</button>
    <div class="row">
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/watches.jfif" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin Amazing 2-in-1
                        HD full screen tempered glass</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/2.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin CamShield Armor case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 800 </p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/3.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin CamShield Pro cover case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 1800 <span>ksh. 2500</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/4.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin CamShield Silky Magnetic silicon case for Apple iPhone 12, iPhone 12 Pro</h6>
                    <p class="card-text mb-0">ksh. 1500 <span>ksh. 2000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/5.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/6.jpg" class="card-img-top" alt="..." data-bs-toggle="modal"
                     data-bs-target="#product-view">
                <div class="card-body">
                    <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#product-view">Nillkin Flex PURE Pro MagSafe cover case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 500 <span>ksh. 1000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--New Arrivals-->
<section class="container featured">
    <h4 class="section-title">
        New Arrivals
    </h4>
    <button type="button" class="btn btn-sm see-all">SEE ALL</button>
    <div class="row">
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/6.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Amazing 2-in-1 HD full screen tempered glass</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/5.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Armor case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 800 </p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/4.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Pro cover case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 1800 <span>ksh. 2500</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/3.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Silky Magnetic silicon case for Apple iPhone 12, iPhone 12
                        Pro</h6>
                    <p class="card-text mb-0">ksh. 1500 <span>ksh. 2000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/2.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Flex PURE Pro MagSafe cover case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 500 <span>ksh. 1000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--Sale-->
<section class="container featured mb-4">
    <h4 class="section-title">
        Sale
    </h4>
    <button type="button" class="btn btn-sm see-all">SEE ALL</button>
    <div class="row">
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/2.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Amazing 2-in-1 HD full screen tempered glass</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/4.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Armor case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 800 </p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/6.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Pro cover case for Apple iPhone 12</h6>
                    <p class="card-text mb-0">ksh. 1800 <span>ksh. 2500</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin CamShield Silky Magnetic silicon case for Apple iPhone 12, iPhone 12
                        Pro</h6>
                    <p class="card-text mb-0">ksh. 1500 <span>ksh. 2000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/3.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Textured nylon fiber case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 3200 <span>ksh. 4000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
                <img src="/img/home/featured/5.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">Nillkin Flex PURE Pro MagSafe cover case for Apple iPhone 12 Mini</h6>
                    <p class="card-text mb-0">ksh. 500 <span>ksh. 1000</span></p>
                    <div class="action">
                        <i class="bi bi-heart"></i>
                        <i class="bi bi-cart3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</div>       `})
}