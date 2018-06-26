$(document).ready(function() {
    $('#overviewSlide').carousel({
        interval: 5000
    })
    $('#recipeCarousel').carousel({
        interval: 5000
    })

    $('#subByOne').on('click', function() {
        var quantity = $('#numItems');
        if (quantity && parseInt(quantity[0].value) > 1) {
            quantity[0].value = parseInt(quantity[0].value) - 1;
        }
    });
    
    $('#addByOne').on('click', function() {
        var quantity = $('#numItems');
        if (quantity && parseInt(quantity[0].value) < 10) {
            quantity[0].value = parseInt(quantity[0].value) + 1;
        }
    })
});