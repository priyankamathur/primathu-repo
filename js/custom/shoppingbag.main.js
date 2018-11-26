/* shopping (our namespace name) and undefined are passed here*/
/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */
/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */
(function(shopping, $, undefined) {
  shopping.cartProducts = (function() {
    function _cartProducts() {
      var _this = this,
        /**Private variables */
        productListURL = shopping.config.data.productList,
        productCarousalListURL = shopping.config.data.productCarouselList,
        productDetails = $("#productDetails"),
        productCarousalDetails = $("#productCarousel"),
        templateContainer = $(".template-container"),
        /*Private Functions*/
        doJSON,
        renderTemplate,
        renderVisualTemplate;

      /** Main Product List auto executed function goes here**/
      this.setProductList = function() {
        if (templateContainer.length) {
            renderTemplate();
            return true;
            
        }
      };
      // this method gets the data from the Product List JSON file and renders it
      doJSON = function(theTemplate, targetDiv, url) {
        $.getJSON(url, function(data) {
          var context = data;
          // Pass our data to the template
          var theCompiledHtml = theTemplate(context);

          // Add the compiled html to the page
          targetDiv.append(theCompiledHtml);
        });
      };

      // renders the compiled handlebar template
      renderTemplate = function() {
        var templateSrc,
            url;
        if (productDetails.length) {
            url = productListURL;
            templateSrc = $("#cart-template"); 
            renderVisualTemplate(productDetails, url, templateSrc);
          }
          if (productCarousalDetails.length) {
            url = productCarousalListURL;
            templateSrc = $("#carousal-template");
            renderVisualTemplate(productCarousalDetails, url, templateSrc);
          }
      };

      renderVisualTemplate = function(targetDiv, url, templateSrc){
            var theTemplateScript = templateSrc.html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            doJSON(theTemplate, targetDiv, url);
      };

      /*** Init call*/
      this.init = function() {
        _this.setProductList();
        return this; /*this refere to shopping.cartProducts*/
      };
      return this.init(); /*this refere to shopping.cartProducts.init()*/
    }
    return new _cartProducts(); /*creating a new object of cartProducts rather then a funtion*/
  })();
  /*** Check to evaluate whether 'shopping' exists in the global namespace - if not, assign window.shopping an object literal*/
})((window.shopping = window.shopping || {}), jQuery);
