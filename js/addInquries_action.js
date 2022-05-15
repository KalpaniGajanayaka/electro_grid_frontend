
$(function() {
    $("#updateBtn").hide();

	getInqueryInfo();
});

const clearForm = () => {
	$("#addInquey").trigger('reset');
};

const getInqueryInfo = () => {
    $.ajax({
		type: "GET",
		url: "http://localhost:8085/ApiManager/webapi/masterAPI/getAllInquriy",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		success: function (data) {

           // alert(JSON.stringify(data.data));
			 
			$('#tblInquery > tbody').html('');
			$.each(data.data, function (i, bill) {
				appendInqueryTable(bill);
			});
		}
	});
}

const appendInqueryTable = (item) => {
	
	let textToInsert = '';
	textToInsert += addRow(item);
	$('#tblInquery > tbody').append(textToInsert);
};

const addRow = (item) => {
	
	const delete_btn = '<button type="button" class="btn btn-danger btn-xs" id="' + item.idinquiry + 'delete" onclick="removeInqueryInfo(\'' + item.idinquiry + '\')">Remove Inquery</button>';
    //(acc_num,cont_num,descrption,action,idInq)
    const update_btn = '<button type="button"class="btn btn-warning" id="' + item.idinquiry + 'update" onclick="setUpdateData(\'' + item.accout_num+'\',\''+item.contact_num+ '\',\''+item.descrption+'\',\''+item.action+'\',\''+item.idinquiry+'\')">Update Inquery</button>';
	


	let statusBadge;
	if(item.action == "1"){
		statusBadge = "Pending";
	}else if(item.action == "2"){
		statusBadge = "On Progress";
	}else if (item.action == "3"){
        statusBadge = "Cancel";
    }else{
        statusBadge = "Done";
    }
//idpay_bill, cus_id, bill_no, month, tot_amount, status
	let row = '<tr id="' + item.idinquiry + '">'
        + '<td>' + item.idinquiry + '</td>'
		+ '<td>' + item.accout_num + '</td>'
		+ '<td>' + item.contact_num + '</td>'
		+ '<td>' + item.descrption + '</td>'
		+ '<td>' + statusBadge + '</td>'
		+ '<td>'
			+ update_btn
		+ '</td>'
		+ '<td>'
			+ delete_btn
		+ '</td>'
		+ '</tr>';
	return row;
};

const addInqueryInfo = (e) => {
    //alert("call");
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const acc_num = $("#acc_num").val();
            const cont_num = $("#cont_num").val();
            const discription = $("#discription").val();
            const action = $("#action").val();
            $.ajax({
                type: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: `accout_num=+${encodeURIComponent(acc_num)}`+`&contact_num=+${encodeURIComponent(cont_num)}`+`&descrption=+${encodeURIComponent(discription)}`+`&action=+${encodeURIComponent(action)}`,
                url: "http://localhost:8085/ApiManager/webapi/masterAPI/addInquriy",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Inquery Details Saved!',
                            'success'
                        );
                        clearForm();
                        getInqueryInfo();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to save!',
                            'error'
                        );
                    }


                }
            });
        }
    });
}

const updateInqueryInfo = (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const acc_num = $("#acc_num").val();
            const cont_num = $("#cont_num").val();
            const discription = $("#discription").val();
            const action = $("#action").val();
            const idInq = $("#inq_num").val();
            const stats = "1";
            $.ajax({
                type: "PUT",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: `accout_num=+${encodeURIComponent(acc_num)}`+`&contact_num=+${encodeURIComponent(cont_num)}`+`&descrption=+${encodeURIComponent(discription)}`+`&action=+${encodeURIComponent(action)}`+`&status=+${encodeURIComponent(stats)}`+`&idinquiry=+${encodeURIComponent(idInq)}`,
                url: "http://localhost:8085/ApiManager/webapi/masterAPI/updateInquriy",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Inquery Details Update!',
                            'success'
                        );
                        clearForm();
                        getInqueryInfo();
                        $("#addBtn").show();
                        $("#updateBtn").hide();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to update!',
                            'error'
                        );
                    }


                }
            });
        }
    });
}

const removeInqueryInfo = (ids) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const acc_num = ids;
            
            $.ajax({
                type: "DELETE",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: `idinquiry=+${encodeURIComponent(acc_num)}`,
                url: "http://localhost:8085/ApiManager/webapi/masterAPI/removeInquriy",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Inquery Details Remove!',
                            'success'
                        );
                        clearForm();
                        getInqueryInfo();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to remove!',
                            'error'
                        );
                    }


                }
            });
        }
    });
}


const setUpdateData = (acc_num,cont_num,descrption,action,idInq) => {
    $("#addBtn").hide();
    $("#updateBtn").show();
    $("#inq_num").val(idInq);
    $("#acc_num").val(acc_num);
    $("#cont_num").val(cont_num);
    $("#discription").val(descrption);
    $("#action").val(action).trigger("chosen:updated");
        
}