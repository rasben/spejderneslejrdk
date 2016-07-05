(function ($, Drupal) {

  /**
   * Implementation of the countdown.
   */
  Drupal.behaviors.top_menu = {
    attach: function (context, settings) {

      // Initialize the behavior.
      init();

      function init() {

        var menuElements = $('.menu-level--0 .not-clickable > a');

        // Make menu toggleable.
        $(menuElements).click(function(event) {
          // Only if not a phone.
          if ($(window).width() > 768 && $(this).parent().index() <= 1) {
            toggleSubMenu(event, $(this));
          }
        });

        // Trigger click outside.
        clickOutside(menuElements);

        // Make header sticky.
        stickyHeader($(".block-menu"), $('.page-header'));

        // ****************** //
        // Menu toggle (mobile).
        // ****************** //
        $('.menu-toggle').click(function() {

          // Make sure the burger does its animation.
          $(this).toggleClass('active');

          // Open main menu.
          $('.menu--site-menu-danish').toggleClass('js-mobile-active');
        });
      }

      /**
       * Click outside.
       * @param {object} element Dom element.
       * @return {object} the modified element.
       */
      function clickOutside(element) {
        $(element).each(function() {
          $(document).mouseup(function(event) {
            if (!$(element).is(event.target)) {
              handleToggle(event, $(this));
            }
          });
        });
        return element;

        /**
         * Toggle the main menu.
         * @param {object} event Event object.
         * @param {object} element Dom object.
         */
        function handleToggle(event, element) {
          $('.menu-level--0 .not-clickable > a')
            .each(function() {
              if (element.hasClass('open')) {
                toggleSubMenu(event, element);
              }
            });
        }
      }

      /**
       * Toggle the main menu.
       * @param {object} event Event object.
       * @param {object} element Dom object.
       */
      function toggleSubMenu(event, element) {
        event.preventDefault();
        toggleMenu(element);

          $('.menu-level--0 .not-clickable > a')
            .each(function() {
                if (!$(element).is($(this))) {
                  if ($(this).hasClass('open')) {
                    toggleMenu($(this));
                  }
                }
            });
        function toggleMenu(element) {
          $(element)
            .toggleClass('open')
            .next('.menu-level--1')
            .toggleClass("js-inactive js-active");
        }
      }

      /**
       * Make an element sticky to when it reaches the top of the browser.
       * @param {object} wrapper Dom element.
       * @param {object} target Dom element.
       */
      function stickyHeader(wrapper, target) {
        var stickyHeader = $(".page-header");
        var stickyMenuClass = "main-nav-scrolled";
        var mainMenu = $('.menu--site-menu').offset().top;

        $(window).scroll(function() {
          if( $(this).scrollTop() > mainMenu && $(window).width() > 768) {
            stickyHeader.addClass(stickyMenuClass);
          } else {
            stickyHeader.removeClass(stickyMenuClass);
          }
        });

        $(window).resize(function() {
          if ($(window).width() < 768) {
            stickyHeader.removeClass(stickyMenuClass);
          }
        });
      }
    }
  };

  Drupal.behaviors.cardGallery = {
    attach: function (context, settings) {
      $('.photo-holder').each(function(key, item) {
        $(this).hover(function() {
          $('.card-gallery-captions.__' + key).fadeIn();
          $(this).mouseout(function() {
            $('.card-gallery-captions.__' + key).fadeOut();
          });
        });
      });
    }
  };
})(jQuery, Drupal);

