const {printProductModal, printMainImage, printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');

module.exports = ({req, query, products, brands, wishlist, cart}) => {
    function renderProducts(products, wishlist, cart) {
        if (products.length>0) {

            return products.map(product => {
                return `
            <div class="col-6 col-md-3 col-lg-2">
                    <div class="card">
                        <img src="/img/products/${printMainImage(product)}" class="card-img-top" alt="..." data-bs-toggle="modal"
             data-bs-target="#_${product._id}">
                        <div class="card-body">
                            <h6 class="card-title" data-bs-toggle="modal"
             data-bs-target="#_${product._id}">${product.product_name}</h6>
                            <p class="card-text mb-0">ksh. ${product.price}</p>
                            <div class="action">
                                ${wishlistButton(product._id, wishlist)}      
                                ${cartButton(product._id, cart)}  
                            </div>
                        </div>
                    </div>
                </div>
                
            ${printProductModal(product, wishlist, cart)}
        `}).join('')

        } else {
            return `<h6 class="no-results text-muted">Didn't find any products with that filter. <br> Try another filter.</h6>`
        }

    }

    // function printBrands(brands, category) {
    //     return brands.map(brand => {
    //         switch (brand.subBrands.length>0) {
    //             case true:
    //                 const brandCheck = brand.subBrands.some(subBrand =>
    //                     subBrand.subBrandCategoryID.toString() === category._id.toString()
    //                 )
    //
    //                 if (brandCheck){
    //                     return `
    //                     <div class="form-check">
    //                         <label class=" form-check-label mb-1" type="button" data-bs-toggle="collapse"
    //                                data-bs-target="#_${brand._id}" aria-expanded="false" aria-controls="ipaky">
    //                             ${brand.brand_name} <i class="fas fa-caret-down"></i>
    //                         </label>
    //                         <div class="collapse" id="_${brand._id}">
    //                             <div class="card card-body">
    //                                 ${printSubBrands(brand, category)}
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `}
    //
    //
    //                 break;
    //
    //             default:
    //                 if (brand.brandCategoryID.toString() === category._id.toString()){
    //                     return `
    //                     <div class="form-check">
    //                         <input class="form-check-input" type="checkbox" value="${brand._id}" id="${brand._id}" name="${brand._id}">
    //                         <label class="form-check-label" for="${brand._id}">
    //                             ${brand.brand_name}
    //                         </label>
    //                     </div>
    //                     `}
    //         }
    //     }).join('')
    // }

    // function printSubBrands(brand, category) {
    //     brand.subBrands.sort((a,b) => a.subBrandName.localeCompare(b.subBrandName))
    //     return brand.subBrands.map(subBrand => {
    //         if (subBrand.subBrandCategoryID.toString() === category._id.toString()){
    //             return `
    //            <div class="form-check">
    //                 <input class="form-check-input" type="checkbox" value="${subBrand._id}" id="${subBrand._id}" name="${brand._id}">
    //                 <label class="form-check-label" for="${subBrand._id}">
    //                     ${subBrand.subBrandName}
    //                 </label>
    //             </div>
    //         `}
    //     }).join('')
    //
    // }

    return layout({
        title: query,
        req: req,
        content: `
<!--Cases Main-->
<section class="category-main">
    <!--    Display-->
    <div class="container-fluid" id="category-display">
        <div class="card">
            <div class="card-header">
                <div class="queryDisplay">Search results for: ${query}</div>
<!--                <div class="sortBy mt-2">-->
<!--                    Sort by:-->
<!--                    <span class="dropdown">-->
<!--                    <a class="dropdown-toggle" href="#" role="button"-->
<!--                       data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                        Latest-->
<!--                    </a>-->
<!--                    <ul class="dropdown-menu" aria-labelledby="SortDropdown">-->
<!--                        <li><a class="dropdown-item" href="#">Alphabetically</a></li>-->
<!--                        <li><a class="dropdown-item" href="#">Latest</a></li>-->
<!--                        <li><a class="dropdown-item" href="#">Price - Low to High</a></li>-->
<!--                        <li><a class="dropdown-item" href="#">Price - High toLow</a></li>-->
<!--                    </ul>-->
<!--                </span>-->
<!--                </div>-->
            </div>
            <div class="card-body  mainContent row">
                ${renderProducts(products, wishlist, cart)}
            </div>
        </div>
    </div>
</section>

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)} 
  
        `})
}