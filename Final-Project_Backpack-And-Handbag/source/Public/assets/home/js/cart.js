$(document).ready(function () {
	$('.removeItem').on('click', function() {
		var id = $(this).data('proid');
		$('#frmRemoveItem #txtP').val(id);
		$('#frmRemoveItem').submit();
	});
	$('.addByOne').on('click', function() {
		var quantity = $('#numItem');
		if (quantity && parseInt(quantity[0].value) < 10) {

            console.log('before add: ' + quantity[0].value);
            quantity[0].value = parseInt(quantity[0].value) + 1;

            console.log('after add: ' + quantity[0].value);
        }
		var id = $(this).data('proid');
		$('#frmGetAmount #txtP').val(id);
		$('#txtQ').val(quantity[0].value);
		$('#frmGetAmount').submit();
	});
	$('.subByOne').on('click', function() {
		var quantity = $('#numItem');
		if (quantity && parseInt(quantity[0].value) > 1) {
            console.log('before sub:' + quantity[0].value);
            quantity[0].value = parseInt(quantity[0].value) - 1;
            console.log('after sub: ' + quantity[0].value);
        }
		var id = $(this).data('proid');
		$('#frmGetAmount #txtP').val(id);
		$('#txtQ').val(quantity[0].value);
		$('#frmGetAmount').submit();
	});
	$('#payment').on('click', function() {
		$('#frmPayment #orderDate').val((new Date()).toISOString());
		$('#frmPayment').submit();
	});
});