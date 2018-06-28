$('.removeItem').on('click', function() {
	var id = $(this).data('proid');
	$('#frmRemoveItem #txtP').val(id);
	$('#frmRemoveItem').submit();
});
$('.addByOne').on('click', function() {
	var quantity = $('#numItems');
	var id = $(this).data('proid');
	$('#frmGetAmount #txtP').val(id);
	$('#txtQ').val(quantity[0].value);
	$('#frmGetAmount').submit();
});
$('.subByOne').on('click', function() {
	var quantity = $('#numItems');
	var id = $(this).data('proid');
	$('#frmGetAmount #txtP').val(id);
	$('#txtQ').val(quantity[0].value);
	$('#frmGetAmount').submit();
});
$('#payment').on('click', function() {
	$('#frmPayment #orderDate').val((new Date()).toISOString());
	$('#frmPayment').submit();
});