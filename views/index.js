const {printProductModal, printMainImage, printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Home';

module.exports = ({featured_products, new_arrivals, sale, wishlist, cart}) => {

    function renderSpecial(products, wishlist, cart) {
        return products.map(
            product => {

                return `
<div class="col-6 col-md-4 col-lg-2">
    <div class="card">
        <img src="/img/products/${printMainImage(product)}" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#_${product._id}">
        <div class="card-body">
            <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#_${product._id}">${product.product_name}</h6>
            <p class="card-text mb-0 featured-card-price">ksh. ${product.price}</p>
            <div class="action">
                ${wishlistButton(product._id, wishlist)}      
                ${cartButton(product._id, cart)}      
            </div>
        </div>
    </div>
</div>

<!--Product view Modal-->
${printProductModal(product, wishlist, cart)}

            `}).join('');
    }

    return layout({
        title: title,
        content: `
<div class="index">
<!--Tiles-->
<section id="tiles">
    <div class="container-fluid">
        <div class="row mt-2 mt-lg-0  my-lg-4">
            <div class="offset-lg-1 col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/6088049365de8726600704af'">
                    <img src="/img/home/cases.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Cases
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/608922137c058834a8fa35e8'">
                    <img src="/img/home/protector.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Protectors
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/6089221f7c058834a8fa35e9'">
                    <img src="/img/home/power.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Power
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/6088049f65de8726600704b0'">
                    <img src="/img/home/audio.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Audio
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/608922917c058834a8fa35f0'">
                    <img src="/img/home/watches.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Smart Watches
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-lg-4">
            <div class="offset-lg-1 col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/608922477c058834a8fa35eb'">
                    <img src="/img/home/camera.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Camera <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/6089224d7c058834a8fa35ec'">
                    <img src="/img/home/car.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Car <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/608922557c058834a8fa35ed'">
                    <img src="/img/home/comp.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Computer <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/6089225e7c058834a8fa35ee'">
                    <img src="/img/home/tv.jfif" class="card-img-top image-tile" alt="...">
                    <div class="card-footer text-center">
                        Tv <br> Accessories
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-lg-0 ">
                <div class="card" onclick="location.href='/608922687c058834a8fa35ef'">
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

<!--Featured Products-->
<section class="container featured">
    <h4 class="section-title">
        Featured Products
    </h4>
<!--    <button type="button" class="btn btn-sm see-all" onclick="location.href='/special/6088050e65de8726600704b6'">SEE ALL</button>-->
    <div class="row">
        ${renderSpecial(featured_products, wishlist, cart)}
    </div>
</section>

<!--New Arrivals-->
<section class="container featured">
    <h4 class="section-title">
        New Arrivals
    </h4>
<!--    <button type="button" class="btn btn-sm see-all" onclick="location.href='/special/6088051765de8726600704b7'">SEE ALL</button>-->
    <div class="row">
        ${renderSpecial(new_arrivals, wishlist, cart)}
    </div>
</section>

<!--Sale-->
<section class="container featured pb-5">
    <h4 class="section-title">
        Sale
    </h4>
<!--    <button type="button" class="btn btn-sm see-all" onclick="location.href='/special/60891d6820824d1308bc6946'">SEE ALL</button>-->
    <div class="row">
        ${renderSpecial(sale,wishlist, cart)}
    </div>
</section>
</div> 

${printWishlistModal(wishlist)}
      
${printCartModal(cart)}      
`})
}