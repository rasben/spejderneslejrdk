(function ($, Drupal) {

  /**
   * Accordion paragraph js.
   */
  Drupal.behaviors.accordion = {
    attach: function (context, settings) {

      // Enable toggle of the accoridon content of each type of
      // accordion.
      $('.accordion').each(function() {
        var element = $(this);
        element.find('.accordion__header', context).click(function() {
          $(this).toggleClass('active');
          element.find('.accordion__content').slideToggle();
        });
      });
    }
  };
})(jQuery, Drupal);

