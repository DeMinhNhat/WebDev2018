$(document).ready(function() {

  $('#recipeCarousel').carousel({
    interval: 10000
  });

  $('.carousel.product .carousel-inner .carousel-item').each(function() {
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

  $('.carousel-inner :first-child').addClass('active');

  //Sticky header
  var navBar = $('#mainNav');
  var sticky = navBar.offset().top;
  var searchBar = $('.searchBar');

  $(window).on('scroll', function() {
    if (window.pageYOffset >= sticky) {
      navBar.addClass('sticky-nav');
      navBar.addClass('bgdark');
    } else {
      navBar.removeClass('sticky-nav');
      navBar.removeClass('bgdark');
    }
    if (window.pageYOffset >= 110) {
      searchBar.addClass('onTop');
    } else {
      searchBar.removeClass('onTop');
    }
  });

  $('.Bra1').on('click', function() {
    window.location.href = "/product/byBra/1";
  });

  $('.Bra2').on('click', function() {
    window.location.href = "/product/byBra/2";
  });

  $('.Bra3').on('click', function() {
    window.location.href = "/product/byBra/3";
  });

  $('.Bra4').on('click', function() {
    window.location.href = "/product/byBra/4";
  });

  $('.Bra5').on('click', function() {
    window.location.href = "/product/byBra/5";
  });
});