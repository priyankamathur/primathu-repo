/* This is  configuration file *
 * @version 1.0
 */
/* Why do we need config?
 * All URLs needed by the JavaScript
 * Any strings that are displayed to the user
 * Any HTML that needs to be created from JavaScript
 * Settings (i.e., items per page)
 * Repeated unique values
 * Any value that may change in the future
 */
(function (shopping, undefined) {
    shopping.config = {
        language: 'english',
        debug: true,
        data: {
            //products: 'data/carousel_data.xml',
            productList: '../../data/product-list.json',
			productCarouselList: '../../data/product-carousel.json'
        },
        templates: {
            productListTemplate : './js/templates/productCart.html',
            productCarouselTemplate : './js/templates/productCarousel.html',
            editProductTemplate : './js/templates/editProduct.html'
        },
        caruoselElements: {
            desktopItem: 3,
            ipadItem: 2,
            mobileItem: 1
        }
    };

    /**
     * Check to evaluate whether 'shopping' exists in the global namespace - if not, assign window.shopping an object literal.
     */
}(window.shopping = window.shopping || {}, jQuery));