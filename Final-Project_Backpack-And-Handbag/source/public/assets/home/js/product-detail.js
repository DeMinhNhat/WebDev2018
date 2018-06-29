$(document).ready(function() {
    $('#overviewSlide').carousel({
        interval: 5000
    })
    $('#recipeCarousel').carousel({
        interval: 5000
    })

    $('#subOne').on('click', function() {
        var quantity = $('#numItems').val();
        if (+quantity > 1) {
            quantity = +quantity - 1;
            $('#numItems').val(quantity);
        }
    });

    $('#addOne').on('click', function() {
        var quantity = $('#numItems').val();
        if (+quantity < 10) {
            quantity = +quantity + 1;
            $('#numItems').val(quantity);
        }
    })
});