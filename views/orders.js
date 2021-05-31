const {printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Orders'

module.exports = function ({ wishlist, cart}) {

    return layout({
        title: title,
        content: `
<h1>At orders page</h1>

${printWishlistModal(wishlist)}

${printCartModal(cart)}

      
        `})
}

