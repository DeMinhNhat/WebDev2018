$(document).ready(function () {
    //Count child div in productView div
    var count = Math.ceil($('#productView > div').length / 3.0);
    var bp_items = $('.backpack-item');
    var win = $(window);

    var resizeProductView = function(){
        var p = $('#productView');
        if(bp_items.length > 0){
            console.log(bp_items.length)
            var firstChild = bp_items.first();
            if(win.width()< 1200){
                p.css('height',  (
                    parseInt(firstChild.css('height')) 
                    + parseInt(firstChild.css('margin-bottom'))*2
                    ) * (count+1)
                );
            }
            else{
                p.css('height',  (
                    parseInt(firstChild.css('height')) 
                    + parseInt(firstChild.css('margin-bottom'))*2
                    ) * (count)
                );
            }
        }
    }
   resizeProductView();

    //Adapting height of #productView
    $(window).on('resize',function(){
        console.log($(window).width())
        resizeProductView()
    })
    
});