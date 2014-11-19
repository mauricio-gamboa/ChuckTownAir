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
        var headerHeight = $('header').outerHeight();

        try {
          $window.scroll(function() {
            if ($use) {
              var marginTop = element.css('margin-top').replace('px', '') * 1;
              var marginBottom = element.css('margin-bottom').replace('px', '') * 1;
              var height = (element.outerHeight() - headerHeight) + marginBottom + marginTop;
              
              if ($use.scrollTop() > height)
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

  .directive('scroll', [function () {
    return {
      restrict: 'A',
      scope : false,

      link: function (scope, element, attrs, controller) {
        var $window = $(window);
        var $body = $(document.body);
        var $html = $('html');
        var $both = $html.add($body);
        var $use = ((bowser.firefox || bowser.msie) ? $html : $body);
        var $header = $('header');
        var $toggle = element.find('.down-arrow');
        var $content = element.next();
        var $carousel = element.find('.text-wrapper');
        var previousScrollPosition = 0;

        try {
          $window.scroll(function() {
            if ($use) {
              if ($use.scrollTop() > 0) {
                $toggle.fadeOut();
                $carousel.fadeOut();
              } else {
                $toggle.fadeIn();
                $carousel.fadeIn();
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
        
        var toggleActive = false;

        $toggle.click(function() {

          toggleActive = true;

          $both.animate({
            scrollTop: $content.offset().top - 85
          }, {
            duration: 800,
            easing: 'linear',
            complete: function() {
              toggleActive = false;
            }
          });
        });

        if (! ('ontouchstart' in window) && ! ('onmsgesturechange' in window) && ! bowser.msie) {
          var animating = false;

          var delta = function(e) {
            var evt = e.originalEvent;

            var delta = evt.detail? evt.detail*(-120) : evt.wheelDelta;

            return delta;
          };

          $window.scroll(function (e) {

            if ($use) {
              var currentScrollPosition = $use.scrollTop();

              if (animating) {
                e.preventDefault();
                return;
              }

              var deltas = [];

              var isMagicMouseFunction = function(e) {
                e.preventDefault();
                e.returnValue = false;

                var d = delta(e);

                deltas.push(d);

                return false;
              };

              if (! toggleActive && previousScrollPosition === 0 && currentScrollPosition >= 0) {
                $body.on('mousewheel', isMagicMouseFunction);
                
                $both.animate({
                  scrollTop: $content.offset().top - 85
                }, {
                  duration: 800,
                  easing: 'linear',
                  complete: function() {
                    setTimeout(function() {
                      animating = false;
                      $body.off('mousewheel', isMagicMouseFunction);
                    }, deltas.length > 10 ? 500 : 0);
                  }
                });
              }

              previousScrollPosition = currentScrollPosition;
            }
          });
        }

        scope.$on('$destroy', function() {
          $window = null;
          $body = null;
          $html = null;
          $both = null;
          $use = null;
          $toggle = null;
          $content = null;
          previousScrollPosition = null;
          toggleActive = null;
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
  }]);

}());