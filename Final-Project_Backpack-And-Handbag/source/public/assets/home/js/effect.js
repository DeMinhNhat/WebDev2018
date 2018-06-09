$(document).ready(function() {

  $('#recipeCarousel').carousel({
    interval: 10000
  });

  $('.carousel .carousel-item').each(function() {
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < 3; i++) { //display 4 item at one
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }

      next.children(':first-child').clone().appendTo($(this));
    }
  });

  $('.carousel-inner :first-child').classList.addClass('active');

  $('.carousel :first-child').classList.addClass('active');
  
  //Sticky header
  var navBar = $('#mainNav');
  var sticky = navBar.offset().top;

  $(window).on('scroll', function() {
    if (window.pageYOffset >= sticky) {
      navBar.addClass('sticky-nav');
      navBar.addClass('bg-dark')
    } else {
      navBar.removeClass('sticky-nav');
      navBar.removeClass('bg-dark')
    }
    console.log(navBar);
    console.log(window.pageYOffset + ' ' + sticky);
  });
});