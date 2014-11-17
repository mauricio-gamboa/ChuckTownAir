(function () {
  'use strict';

  angular.module('ChuckTownAir.directives')

  .directive('fullHeight', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var height = $window.innerHeight;
        
        element.css({
          'height': height
        });
        
        $(window).resize(function() {
          var newHeight = $window.innerHeight;
          element.css({
            'height': newHeight
          });
        });
      }
    };
  }])

  .directive('bounce', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        setInterval(function() {
          element.toggleClass('bounce');
        }, 1200);
      }
    };
  }])

  .directive('owl', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        element.owlCarousel({
          pagination: false,
          autoPlay: true
        });
      }
    };
  }])

  .directive('owlClients', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        element.owlCarousel({
          pagination: false,
          autoPlay: true,
          items: 8
        });
      }
    };
  }]);

}());