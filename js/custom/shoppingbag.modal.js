/* shopping (our namespace name) and undefined are passed here*/
/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */
/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */
(function(shopping, $, undefined) {
  shopping.lightbox = (function() {
    function _cartLightbox() {
      var _this = this,
        /**Private variables */
        myModal = $("#myModal"),
        product,
        /*Private Functions*/
        renderModal,
        emptyModal,
        updateQtyFromModal;

      /** Main Product List auto executed function goes here**/
      this.viewProductItem = function() {
        if(myModal.length){
          renderModal();
          updateQtyFromModal();
        }
      };
      renderModal = function() {
        emptyModal();
        myModal.on("show.bs.modal", function(e) {
          var link = $(e.relatedTarget);
          product = {
            id: link.data("id"),
            title: link.data("title"),
            image: link.data("img"),
            price: link.data("price"),
            currency: link.data("currency"),
            qty: link.data("qty"),
            size: link.data("size")
          };

          $(this)
            .find(".modal-body")
            .load(link.attr("href"), function() {
              $(".modal-body .product-section").attr("data-productId",product.id);
              $(".modal-body #productTitle").html(product.title);
              $(".modal-body #productImage").attr("src", product.image);
              $(".modal-body #productImage").attr("alt", product.title);
              $(".modal-body .price sup").html(product.currency);
              $(".modal-body .price span").html(product.price);
              $(".modal-body #qtyDropdown").val(product.qty);
              $(".modal-body #sizeDropdown").val(product.size);
            });
        });
      };
      emptyModal =function(){
        myModal.on("hide.bs.modal", function(e) {
          $(this)
            .find(".modal-body")
            .empty();
        });
      }
      updateQtyFromModal = function(){
        $(document).on("click", "#editProduct", function(e){
          e.preventDefault();
          var currQty = $("#qtyDropdown").val();
          var currSize = $("#sizeDropdown").val();
          var totalPrice = parseInt(currQty) * parseInt(product.price);
          var updateProduct = $(this).closest(".product-section").attr("data-productId");
          $("#" + updateProduct).find(".qty-input").val(currQty);
          $("#" + updateProduct).find(".item-size").html(currSize);
          $("#" + updateProduct).find(".price").html(parseFloat(totalPrice).toFixed(2));
          myModal.modal("hide");
        });
      }
      

      /*** Init call*/
      this.init = function() {
        _this.viewProductItem();
        return this; /*this refere to shopping.lightbox*/
      };
      return this.init(); /*this refere to shopping.lightbox.init()*/
    }
    return new _cartLightbox(); /*creating a new object of lightbox rather then a funtion*/
  })();
  /*** Check to evaluate whether 'shopping' exists in the global namespace - if not, assign window.shopping an object literal*/
})((window.shopping = window.shopping || {}), jQuery);
