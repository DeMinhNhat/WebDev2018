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

var i = 3;

$('#btnAdd').on('click', function () {
    var newRow = `
		<tr style="display: none">
			<td>` + i + `</td>
			<td>Trần Văn A</td>
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

var getState = function () {
    var state = document.getElementsByName('state');
    var theState;

    for (var i = 0; i < state.length; i++) {
        if (state[i].checked) {
            theState = state[i].value;
            break;
        }
    }

    $('#state').modal('hide');

    return theState;
}

var theState = getState();

$('#list').on('click', 'a.update', function () {
    $('#state').modal('show');

    $(this).closest('tr').find('td:nth-child(4)').text(theState);
});

$('.modal .modal-footer .save').on('click', getState);


$('#list')
    .on('mouseenter', 'tr', function () {

        if ($(this).closest('tr').find('td:nth-child(4)').text() === 'Đã giao')
            $(this).css("background", "#94D6DB");
        else if ($(this).closest('tr').find('td:nth-child(4)').text() === 'Đang giao')
            $(this).css("background", "#C99797");
        else
            $(this).css("background", "#28A745");

    })
    .on('mouseleave', 'tr', function () { $(this).css("background", ""); });
