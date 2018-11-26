describe("Cart Product list response testing ", function() {
  var returnedJSON = {},
    items;

  beforeEach(function(done) {
    $.getJSON(shopping.config.data.productList).done(function(result) {
      returnedJSON = result;
      items = returnedJSON.product.length;
      // Invoke the special done callback
      done();
    });
  });

  it("Should have returned JSON if the async call has completed", function() {
    expect(returnedJSON).not.toEqual({});
    expect(returnedJSON).not.toBeUndefined();
  });

  it("Should have atleast a single product in the cart list", function() {
    expect(items).toBeGreaterThan(0);
  });
});

describe("Product carousal list response testing", function() {
  var returnedJSON = {},
    items;

  beforeEach(function(done) {
    $.getJSON(shopping.config.data.productCarouselList).done(function(result) {
      returnedJSON = result;
      items = returnedJSON.product.length;
      // Invoke the special done callback
      done();
    });
  });

  it("Should have returned JSON if the async call has completed", function() {
    expect(returnedJSON).not.toEqual({});
    expect(returnedJSON).not.toBeUndefined();
  });

  it("Should have atleast a single product in the carousal list", function() {
    expect(items).toBeGreaterThan(0);
  });
});

describe("A spy, confirgured to check the products in cart", function() {
  var productCart, productCount, fetchProducts;
  beforeEach(function() {
    productCart = {
      setProducts: function() {
        //bar = value;
        productCount = $("#productDetails .product-item").length;
      },
      getProducts: function() {
        return productCount;
      }
    };

    spyOn(productCart, "getProducts").and.returnValue(productCount);

    productCart.setProducts();
    fetchProducts = productCart.getProducts();
  });

  it("Tracks that the spy was called", function() {
    expect(productCart.getProducts).toHaveBeenCalled();
  });

  it("Checks that cart has the product", function() {
    expect(fetchProducts).toBeGreaterThan(0);
  });
});

describe("A spy, confirgured to check the products in carousal", function() {
  var productCarousal, productCount, fetchProducts;
  beforeEach(function() {
    productCarousal = {
      setProducts: function() {
        productCount = $("#productCarousel .carousel-item").length;
      },
      getProducts: function() {
        return productCount;
      }
    };

    spyOn(productCarousal, "getProducts").and.returnValue(productCount);

    productCarousal.setProducts();
    fetchProducts = productCarousal.getProducts();
  });

  it("Tracks that the spy was called", function() {
    expect(productCarousal.getProducts).toHaveBeenCalled();
  });

  it("Checks that carousal has a product", function() {
    expect(fetchProducts).toBeGreaterThan(0);
  });
});

describe("testing of the edit link of a Product in the Cart section of the page", function() {
  var productEdit,
    myModal = $("#myModal"),
    showsModal = false,
    newQtyVal = "2",
    newSizeVal = "M",
    productQtyPageVal;
  beforeEach(function() {
    productEdit = {
      openEditModal: function() {
        myModal.on("show.bs.modal", function(e) {
          showsModal = true;
          setTimeout(function() {
            $("#qtyDropdown")
              .val(newQtyVal)
              .trigger("change");

            $("#sizeDropdown")
              .val(newSizeVal)
              .trigger("change");

            setTimeout(function() {
              // Triggers click on the Edit button on modal window
              $("#editProduct").trigger("click");
            }, 1000);
          }, 1000);
        });

        // Checks the edit link of the first product in the cart section
        $("#productDetails .product-item:first-child")
          .find(".edit")
          .trigger("click");
      },
      checkModal: function() {
        return {
          showsModal: showsModal,
          newQtyVal: newQtyVal
        };
      }
    };

    spyOn(productEdit, "checkModal").and.returnValue(
      productEdit.checkModal.showsModal
    );

    productEdit.checkModal();

    productEdit.openEditModal();
  });
  it("Tracks that the spy for Edit link modal was called", function() {
    expect(productEdit.checkModal).toHaveBeenCalled();
  });
  it("Checks the Modal functionallity for the first product", function() {
    expect(showsModal).toEqual(true);
  });

  it("Checks for the edited qty and size of the product from modal window", function(done) {
    setTimeout(function() {
      productQtyPageVal = $("#productDetails .product-item:first-child")
        .find(".qty-input")
        .val();
      productSizePageVal = $("#productDetails .product-item:first-child")
        .find(".item-size")
        .html();
      expect(newQtyVal).toEqual(productQtyPageVal);
      expect(newSizeVal).toEqual(productSizePageVal);
      done();
    }, 3000);
  });
});

describe("Tests the carousal functionality in the page", function() {
  var nextLink = $(".carousel-control-next"),
    nextShown = false,
    fetchNext;

  beforeEach(function(){
    checkCarousal = {
      setNext: function(){
        nextLink.trigger("click");
        nextShown = true;
        
      },
      getNext : function(){
        return nextShown;
      }
    }
    spyOn(checkCarousal, "getNext").and.returnValue(
      nextShown
    );
    checkCarousal.setNext();
    fetchNext = checkCarousal.getNext();
    
  })
  it("Tracks that the spy for carousal has been called", function() {
    expect(checkCarousal.getNext).toHaveBeenCalled();
  });
  it("Checks the carousal functionality on click on next button", function() {
  
    expect(fetchNext).toEqual(true);

   
  });
  
})