var i = 2;

$('#btnAdd').on('click', function() {
    var newRow = `
		<tr style="display: none">
			<td>` + i + `</td>
            <td>Trần Văn A</td>
            <td>Quận 1, TP HCM</td>
            <td>vana@gmail.com</td>
            <td>234290489</td>
            <td>1 000 000</td>
			<td>
				<a class="update btn btn-xs btn-danger" href="javascript:;" role="button">
					<span class="fa fa-wrench"></span>
                </a>
                <a class="remove btn btn-xs btn-success" href="javascript:;" role="button">
					<span class="fa fa-window-close"></span>
				</a>
			</td>
		</tr>`;
    i++;
    $('#list').append(newRow);
    $('#list tr:last').show(1000);
});

$('#list').on('click', 'a.remove', function() {
    $(this).closest('tr').remove();
});

$('#list').on('click', 'a.update', function() {

});