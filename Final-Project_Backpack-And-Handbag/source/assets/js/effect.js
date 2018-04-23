$(document).ready(function () {
    $('#recipeCarousel').carousel({
        interval: 10000
      })
      
      $('.carousel .carousel-item').each(function(){
          var next = $(this).next();
          if (!next.length) {
          next = $(this).siblings(':first');
          }
          next.children(':first-child').clone().appendTo($(this));
          
          for (var i=0;i<3;i++) { //display 4 item at one
              next=next.next();
              if (!next.length) {
                  next = $(this).siblings(':first');
                }
              
              next.children(':first-child').clone().appendTo($(this));
            }
      });
      
});
