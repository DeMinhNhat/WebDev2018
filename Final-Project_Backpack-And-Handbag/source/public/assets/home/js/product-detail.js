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
            console.log('before: sub' + quantity[0].value);
            quantity[0].value = parseInt(quantity[0].value) - 1;
            console.log('after sub: ' + quantity[0].value);
        }
    });
    
    $('#addByOne').on('click', function() {
        var quantity = $('#numItems');
        if (quantity && parseInt(quantity[0].value) < 10) {

            console.log('before: add' + quantity[0].value);
            quantity[0].value = parseInt(quantity[0].value) + 1;

            console.log('after: add' + quantity[0].value);
        }
    })
});