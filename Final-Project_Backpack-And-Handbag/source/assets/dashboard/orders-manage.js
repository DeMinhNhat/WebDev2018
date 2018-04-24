var getDay = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

var i = 2;

$('#btnAdd').on('click', function () {
    var newRow = `
		<tr style="display: none">
			<td>` + i + `</td>
			<td>person ` + i + `</td>
			<td>` + getDay() + `</td>
			<td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam reprehenderit</td>
			<td>
				<a class="detail btn btn-xs btn-danger" href="javascript:;" role="button">
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

$('#list').on('click', 'a.remove', function () {
    $(this).closest('tr').remove();
});

$('#list').on('click', 'a.update', function () {
    $('#myModal').modal('show');
});