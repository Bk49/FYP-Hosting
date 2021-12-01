let userInfo = JSON.parse(localStorage.getItem('userInfo'));

$(document).ready(function(){
    getSchool();
    
    $("#account-fn").html(userInfo.first_name);
    $("#account-ln").html(userInfo.last_name);
    $("#account-email").val(userInfo.email);
    $("input:radio[name=inlineRadioOptions][value=" + userInfo.gender + "]").attr('checked',true);
    $("#account-role").val(userInfo.role);
    $("#levelOption").val(userInfo.grade);

    if(userInfo.role != "student"){
        document.getElementById("schoolOption").style.display = "none";
        document.getElementById("levelOption").style.display = "none";
        document.getElementById("account-role").style.display = "none";
        // $("#schoolOption").attr('disabled', 'disabled');
        // $("#levelOption").attr('disabled', 'disabled');
    }
    else{
        document.getElementById("account-role").style.display = "none";
    }
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
})

$(document).on("change","#account-role", function(){
    let role = $("#account-role").val();

    if(role != 'student'){
        $("#schoolOption").attr('disabled', 'disabled');
        $("#levelOption").attr('disabled', 'disabled');
    }
    else{
        $("#schoolOption").removeAttr('disabled');
        $("#levelOption").removeAttr('disabled');
    }
})

$(document).on("click", "#editBtn", function() {
    let fn = $("#account-fn");
    let ln = $("#account-ln");
    let newFn = $("#accountFn").val();
    let newLn = $("#accountLn").val();

    if (newFn == "" || newLn == "") {
        $("#errorForm").css("display", "block")
    }
    else {

        $("#errorForm").css("display", "none")
        $("#editNameModal").modal('toggle');

        fn.text(newFn);
        ln.text(newLn);
    }
});

$(document).on("click", "#editName", function() {
    let fn = $("#account-fn").text();
    let ln = $("#account-ln").text();

    $("#accountFn").val(fn);
    $("#accountLn").val(ln);
});

$(document).on("click", "#updateBtn", function(){
    let first_name = $("#account-fn").text();
    let last_name = $("#account-ln").text();
    let gender = $('input:radio:checked').val();
    let role = $("#account-role").val();

    let data = {
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        // "role": role
    }

    if(role == 'student'){
        data["school"] = $("#schoolOption").val();
        data["grade"] = $("#levelOption").val();
    }

    updateAccount(data);
})

$(document).on("click", "#logoutBtn", function () {
    $.ajax({
        url: '/user/logout',
        method: 'POST',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            //Clearing token and userinfo
            localStorage.clear();
            //Redirect to login
            location.href = 'login.html';
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("YOU HAVE BEEN PROHIBITED TO LEAVE!");
        }
    });
})

$(document).on("click", "#deleteBtn", function () {
    var userid = JSON.parse(localStorage.getItem("userInfo"))._id;
    $.ajax({
        url: '/user/'+userid,
        method: 'DELETE',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            //Clearing token and userinfo
            localStorage.clear();
            //Redirect to login
            location.href = 'login.html';
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("YOU HAVE BEEN PROHIBITED TO DELETE YOUR ACCOUNT!");
        }
    });
})

function getSchool() {
    let data = {
        resource_id: 'ede26d32-01af-4228-b1ed-f05c45a1d8ee', // the resource id
        q: 'primary', // query for 'primary'
        limit: 200 // Recieving limit
    };
    $.ajax({
        url: 'https://data.gov.sg/api/action/datastore_search',
        data: data,
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            let schoolOption = document.getElementById("schoolOption");
            
            for (let i = 0; i < data.result.records.length; i++) {
                schoolOption.innerHTML += `<option value='${data.result.records[i].school_name}'>${data.result.records[i].school_name}</option>`;
            }

            $("#schoolOption").val(userInfo.school);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function updateAccount(data){
    let id = userInfo._id;
    $.ajax({
        url: `/user/${id}`,
        data: data,
        method: "PUT",
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            $.alert({
                title: 'Updated!',
                content: 'Profile successfully updated!',
            });
            localStorage.setItem("userInfo", JSON.stringify(data.user))
        },
        error: function (xhr, textStatus, errorThrown) {
            let key;
            var error;
            console.log(xhr.responseText)
            if (JSON.parse(xhr.responseText).code == "INVALID_REQUEST") {
                error = JSON.parse(xhr.responseText).error[0];

                switch (error.split(" ")[0]) {
                    case 'First':
                        key = "account-fn";
                        break;
                    case 'Last':
                        key = "account-ln";
                        break;
                    // case 'Role':
                    //     key = "account-role";
                    //     break;
                    case 'Gender':
                        key = "account-gender";
                        break;
                    case 'School':
                        key = "schoolOption";
                        break;
                    case 'Grade':
                        key = "levelOption";
                        break;
                }
                $(`#${key}`).focus();
            }
            else {
                error = JSON.parse(xhr.responseText).error;
            }
            document.getElementById("err").innerHTML = error;
        }
    })
}