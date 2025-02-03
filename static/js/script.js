jQuery(document).ready(function ($) {
   // Initialize sequences
   resize_box();
   set_summary();
   set_textarea();
   initializeCards();  // Add card flip initialization

   $(window).on('reload', function () {
      resize_box();
      set_summary();
      set_textarea();
   });

   // Cache selectors
   var topMenu = $("#top-menu"),
      topMenuHeight = topMenu.outerHeight() + 15,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
         var item = $($(this).attr("href"));
         if (item.length) { return item; }
      });

   var fromTop = $(this).scrollTop() + 5;

   // Get id of current scroll item
   var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
         return this;
   });

   // Get the id of the current element
   cur = cur[cur.length - 1];
   var id = cur && cur.length ? cur[0].id : "";

   // Bind to scroll
   $(window).scroll(function () {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + 5;

      // Get id of current scroll item
      var cur = scrollItems.map(function () {
         if ($(this).offset().top < fromTop)
            return this;
      });

      // Get the id of the current element
      cur = cur[cur.length - 1];
      id = cur && cur.length ? cur[0].id : "";

      // make navbar opaque
      if (id != 'Home') {
         $(".navbar").addClass("opaque");
      } else {
         $(".navbar").removeClass("opaque");
      }

      // Set/remove active class      
      menuItems
         .removeClass("active")
         .filter("[href='#" + id + "']").addClass("active");
   });

   // Card flip functionality
   function initializeCards() {
      const $cards = $('.card');

      $cards.each(function () {
         const $card = $(this);
         const $front = $card.find('.front');
         const $back = $card.find('.back');

         // Flip card when clicking front
         $front.on('click', function (e) {
            e.stopPropagation();
            // Unflip all other cards
            $cards.not($card).removeClass('flipped');
            // Flip this card
            $card.addClass('flipped');
         });

         // Add click handler to back side to unflip
         $back.on('click', function (e) {
            // Only unflip if clicking the back container directly (not its children)
            if (e.target === this) {
               $card.removeClass('flipped');
            }
         });
      });

      // Add click handler to document to close card when clicking outside
      $(document).on('click', function () {
         $cards.removeClass('flipped');
      });

      // Prevent clicks inside cards from closing all cards
      $cards.on('click', function (e) {
         e.stopPropagation();
      });
   }

   // Ensures Portfolio grids are always square
   function resize_box() {
      var grids = $('.portfolio-item');
      grids.height(grids.width());
   }

   // Makes form widths equal
   function set_textarea() {
      $("textarea").width($("#contactSubject").width());
      $(".contact-form").width($("#contactSubject").width());
   }

   // Sets height of summary to prevent overflow
   function set_summary() {
      var summary_height = $(".back").height() - ($(".summary-heading").height() + 15);
      $(".summary").height(summary_height);
   }

   // Sets height of the landing page to viewport height
   $('header').css({ 'height': $(window).height() });

   // resize callbacks
   $(window).on('resize', function () {
      $('header').css({ 'height': $(window).height() });
      $('body').css({ 'width': $(window).width() });
      resize_box();
      set_summary();
      set_textarea();
   });

   $(".navbar-toggler").click(function () {
      if (id == 'Home') {
         $(".nav-me").toggleClass("opaque");
      }
   });
});
