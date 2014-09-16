(function(){
  var app = angular.module('store', [ ]);

  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('PanelController', function(){
    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };
    this.isSelected = function(checkTab){
      return this.tab === checkTab;
    };
  });

  var gems = [
    {
      name: 'Dodecahedron',
      price: 2.95,
      description: '...',
      canPurchase: true,
      reviews: [
        {
          stars: 5,
          body: "I love this product!",
          author: "joe@thomas.com"
        },
        {
          stars: 1,
          body: "This product sucks",
          author: "tim@hater.com"
        }
      ]
    },
    {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: '...',
      canPurchase: false,
      reviews: [
        {
          stars: 3,
          body: "Okay...",
          author: "joe@thomas.com"
        },
        {
          stars: 3,
          body: "Not bad...",
          author: "tim@hater.com"
        }
      ]
    }
  ];

})();
