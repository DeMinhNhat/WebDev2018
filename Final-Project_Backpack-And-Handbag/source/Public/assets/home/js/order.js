$('.checkTrade').on('click', function() {
	var id = $(this).data('orderid');
	$('#frmCheckTrade #orderId').val(id);
	$('#frmCheckTrade').submit();
});
$('.deleteTrade').on('click', function() {
	var id = $(this).data('orderid');
	$('#frmDeleteTrade #orderId').val(id);
	$('#frmDeleteTrade').submit();
});