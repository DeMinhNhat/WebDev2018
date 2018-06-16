
$(document).ready(function () {
    //Count child div in productView div
    var count = Math.ceil($('#productView > div').length / 3.0);
    var bp_items = $('.backpack-item');
    console.log($('#productView'));
    if(bp_items.length > 0){
        var firstChild = bp_items.first();
        firstChild.css('height')
        firstChild.css('margin-bottom')
        $('#productView').css('height', 
            (
                parseInt(firstChild.css('height')) 
                + parseInt(firstChild.css('margin-bottom'))*2
            ) * count
        );
    }
});