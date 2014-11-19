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

  .directive('changeMenu', [function() {
    return {
      restrict: 'A',
      
      link: function(scope, element, attrs, controller) {
        var $window = $(window);
        var $body = $(document.body);
        var $html = $('html');
        var $use = ((bowser.firefox || bowser.msie) ? $html : $body);

        try {
          $window.scroll(function() {
            if ($use) {

              if ($use.scrollTop())
                $('header').addClass('dark');
              else
                $('header').removeClass('dark');
            }
          });
        } catch (e) {
          console.log(e);
        }
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
  }])

  .directive('owlEquipmentGallery', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        element.owlCarousel({
          autoPlay: true,
          items: 4
        });
      }
    };
  }])

  .directive('owlFreebies', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        element.owlCarousel({
          autoPlay: true,
          singleItem: true
        });
      }
    };
  }])

  .directive('stopVideo', [function () {
    return {
      restrict: 'A',

      link: function (scope, element, attrs, controller) {
        element.on('hide.bs.modal', function (e) {
          var video = $("#playerid").attr("src");
          $("#playerid").attr("src","");
          $("#playerid").attr("src", video);
        });
      }
    };
  }]);

}());