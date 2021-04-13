const layout = require('./layout');
const title = 'Wishlist';

module.exports = ({wishlist}) => {
    const renderedWishlist = wishlist.map(
        wishItem => {
            return `
                <div class="row">
                    <div class="col-3">
                        <img src="/img/home/featured/3.jpg" alt="" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <h5 class="prod-title">${wishItem._id.productName}</h5>
                        <div class="mt-3 mt-lg-4">
                            <div class="price"><span>  ksh.</span> ${wishItem._id.discountPrice}<span class="priceSpan">${wishItem._id.price}</span></div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mt-lg-4">
                            <form method="post" action="/wishlist/delete/${wishItem._id._id}"><button type="submit" class="remove btn btn-sm btn-danger" >Remove <i class="bi bi-trash"></i></button></form>
                            <div class="remove btn btn-sm btn-success">Add to cart <i class="bi bi-cart3"></i>
                            </div>
                        </div>
                    </div>
                    <span class="my-2 border-bottom border-2">
                </span> 
            </div>
            `}
    ).join('');


    return layout({
        title: title,
        content: `
            <div  id="wishlist" aria-labelledby="Wishlist" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header border-bottom border-2">
                <h5 class="modal-title" id="favsTitle">Wishlist</h5>
                <button type="button" class="btn-close"  aria-label="Close" onclick="location.href='/'"></button>
            </div>
            <div class="modal-body">
            ${renderedWishlist}
               
            <div class="modal-footer d-flex justify-content-end">
                <button type="button" class="btn btn-success favs-footer">Add all to cart</button>
            </div>
        </div>
    </div>
</div>
        `})
}