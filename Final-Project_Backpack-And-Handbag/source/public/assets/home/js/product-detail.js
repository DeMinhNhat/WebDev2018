$(document).ready(function() {
    $('#overviewSlide').carousel({
        interval: 5000
    })
    $('#recipeCarousel').carousel({
        interval: 5000
    })

    $('.detail.carousel .carousel-inner .carousel-item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 1; i++) { //display 4 item at one
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });
    $('#subByOne').on('click',function(){
        var quantity = $('#numItems');
        if(quantity && parseInt(quantity[0].value) > 1){
                quantity[0].value = parseInt(quantity[0].value) - 1;
        }
    });
    $('#addByOne').on('click',function(){
        var quantity = $('#numItems');
        if(quantity && parseInt(quantity[0].value) < 10){
                quantity[0].value = parseInt(quantity[0].value) + 1;
        }
    })
});