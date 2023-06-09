jQuery(document).ready(function ($) {

   // Initialize sequences
   resize_box();
   set_summary();
   set_textarea();

   $(window).on('reload', function () {
      resize_box();
      set_summary();
      set_textarea();
   })

   // console.log(3 + 5)
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
   id = cur && cur.length ? cur[0].id : "";

   var id;
   // console.log(topMenuHeight)
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
         $(".navbar").addClass("opaque")
      } else {
         $(".navbar").removeClass("opaque")

      }

      // Set/remove active class      
      menuItems
         .removeClass("active")
         .filter("[href='#" + id + "']").addClass("active");
   });



   // Ensures Portfolio grids are always square
   function resize_box() {
      grids = $('.portfolio-item');
      grids.height(grids.width())
   }

   // Makes form widths equal
   function set_textarea() {
      console.log("--------------------textarea resized---------------------")
      $("textarea").width($("#contactSubject").width());
      $(".contact-form").width($("#contactSubject").width());

   }

   // Sets height of summary to prevent overflow
   function set_summary() {
      var summary_height = $(".back").height() - ($(".summary-heading").height() + 15);
      $(".summary").height(summary_height)
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
   })




});





