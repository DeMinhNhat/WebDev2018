$(document).ready(function() {
    $('#overviewSlide').carousel({
        interval: 5000
    })
    $('#recipeCarousel').carousel({
        interval: 5000
    })

    // $('.sameTypeProducts .carousel .carousel-item').each(function() {
    //     var next = $(this).next();
    //     if (!next.length) {
    //         next = $(this).siblings(':first');
    //     }
    //     next.children(':first-child').clone().appendTo($(this));

    //     for (var i = 0; i < 3; i++) { //display 4 item at one
    //         next = next.next();
    //         if (!next.length) {
    //             next = $(this).siblings(':first');
    //         }

    //         next.children(':first-child').clone().appendTo($(this));
    //     }
    // });
    // $('.sameVendorProducts .carousel .carousel-item').each(function() {
    //     var next = $(this).next();
    //     if (!next.length) {
    //         next = $(this).siblings(':first');
    //     }
    //     next.children(':first-child').clone().appendTo($(this));

    //     for (var i = 0; i < 3; i++) { //display 4 item at one
    //         next = next.next();
    //         if (!next.length) {
    //             next = $(this).siblings(':first');
    //         }

    //         next.children(':first-child').clone().appendTo($(this));
    //     }
    // });
    /////////////// TESTING
    //Toggle Signup modal for TESTING
    // $('#signupModal').modal({
    //     backdrop: 'static',
    //     keyboard: false
    // });
    ////////////////////////
});