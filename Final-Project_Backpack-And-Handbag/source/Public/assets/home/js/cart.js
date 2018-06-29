$(document).ready(function() {
	$('.removeItem').on('click', function() {
		var id = $(this).data('proid');
		$('#frmRemoveItem #txtP').val(id);
		$('#frmRemoveItem').submit();
	});
	$('#addByOne').on('click', function() {
		var quantity = $('#numItem').val();
		var id = $(this).data('proid');
		$('#frmGetAmount #txtP').val(id);
		$('#frmGetAmount #txtQ').val(quantity + 1);
		$('#frmGetAmount').submit();
	});
	$('#subByOne').on('click', function() {
		var quantity = $('#numItem').val();
		var id = $(this).data('proid');
		$('#frmGetAmount #txtP').val(id);
		$('#frmGetAmount #txtQ').val(quantity - 1);
		$('#frmGetAmount').submit();
	});
	$('#payment').on('click', function() {
		$('#frmPayment #orderDate').val((new Date()).toISOString());
		$('#frmPayment').submit();
	});
});