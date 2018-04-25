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
			<td>Chưa giao</td>
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

$('#list').on('click', 'a.remove', function () {
    $(this).closest('tr').remove();
});

$('#list').on('click', 'a.update', function () {
    $('#myModal').modal('show');
});

$('.modal-footer .save').on('click', function () {
    // do changes

    $('#myModal').modal('hide');
});


// // $('#list tr').hover(
// $('#list tr')
//     .on('hover',
//         function () {
//             // $(this).closest('tr').
//             $(this).css("background", "red");

//         },
//         function () {
//             $(this).css("background", "");
//         }
//     );

$('#list')
    .on('mouseenter', 'tr', function () { $(this).css("background", "red"); })
    .on('mouseleave', 'tr', function () { $(this).css("background", ""); });
