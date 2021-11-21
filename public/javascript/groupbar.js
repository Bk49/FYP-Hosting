var groupBarOpen = false;
var groupBar = document.getElementById("groupBar");
var headingName = document.getElementById("heading")
groupId = urlSearchParams.get("groupId");

$(document).ready(function(){
    console.log("testing123")

    $("#heading").html($(".active").children(".row").children(".col").children(".sectionName").html());

    if (!groupId) window.location.href = "group.html";

    $.ajax({
        url: `/group/${groupId}`,
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            console.log(data)
            document.getElementById("groupName").innerHTML = data.group_name;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
            window.location.href = "/404.html";
        }
    });


});


function displayGroupBar() {
    if (groupBarOpen == false) {
        groupBar.style.transition= "width 0.3s"
        groupBar.style.transitionTimingFunction= "ease"
        groupBar.style.width = "220px"
        groupBarOpen = true;
    }
    else {
        groupBar.style.width = "0px"
        groupBarOpen = false;
    }

}

function switchSection(sectionNo) {
    $(".row.section").eq(sectionNo).css('background-color', '#ff0000')
    console.log($(".sectionName").eq(sectionNo));
}