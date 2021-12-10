$(document).ready(function () {
    let role = JSON.parse(localStorage.getItem('userInfo')).role
    if (role == "admin") {
        window.location.href = "/control.html";
    }
    else if (role == "parent" || role == "teacher") {
        window.location.href = "/group.html";
    }
    $(".header").load("topbar.html", function () {
        document.getElementById("name").innerHTML = getName();
    });
    getRecommendation();

    let user = JSON.parse(localStorage.getItem("userInfo"));
    let width = (user.exp_points / ((user.rank_level + 1) * 1000)) * 100;

    $('.progress-bar').css("width", width + '%');
    $('.progress-bar').html(Math.floor(width) + "%");
    getAssignmentByUser();

    console.log(user._id)
    getNotification(user._id);



})

function getNotification(userId) {
    $.ajax({
        url: `/notification/user?userId=${userId}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            console.log(data)
            console.log(data[0].teacher_id)
            console.log(data.length)
            for (var i = 0; i < data.length; i++) {
                console.log('testing')
                getNotificationByUser(data[i]);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("ERROR!" + xhr.responseText);
        }
    });
}

function getRecommendation() {
    let newSkills = [];
    $.ajax({
        url: `/quiz/recommendation?userId=${getUserId()}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            let content = "";
            console.log(data)
            newSkills = data.newSkills;
            if (data.weakest3.length > 0) {
                for (let i = 0; i < data.weakest3.length; i++) {
                    if (i == 0) {
                        $('.dailyquizbutton').wrap(`<a href="quiz.html?skill=${data.weakest3[i]._id}"></a>`)
                    }
                    content += `<div><a href="quiz.html?skill=${data.weakest3[i]._id}">${data.weakest3[i].skill_name}</a></div>`
                }

                $('.trynowbox').html(content);
            }
            else {
                getPopularQuiz(newSkills);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("ERROR!" + xhr.responseText);
        }
    });
}

function getPopularQuiz(fallback) {
    $.ajax({
        url: `/quiz/popular`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            let content = "";

            if (data.length >= 1) {
                for (let i = 0; i < data.length; i++) {
                    if (i == 0) {
                        $('.dailyquizbutton').wrap(`<a href="quiz.html?skill=${data[i]._id}"></a>`)
                    }
                    content += `<div><a href="quiz.html?skill=${data[i]._id}">${data[i].skill_name}</a></div>`
                }
            }
            else {
                for (let i = 0; i < fallback.length; i++) {
                    if (i == 0) {
                        $('.dailyquizbutton').wrap(`<a href="quiz.html?skill=${fallback[i].skillId}"></a>`)
                    }
                    content += `<div><a href="quiz.html?skill=${fallback[i].skillId}">${fallback[i].skill_name}</a></div>`
                }
            }




            $('.trynowbox').html(content);

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("ERROR!" + xhr.responseText);
        }
    });
}

$(document).on("click", ".assignmentbutton", function () {
    window.location.href = "assignment.html";
})

$(document).on("click", ".leaderboard-button", function () {
    window.location.href = "leaderboard.html";
})



function getAssignmentByUser() {
    let userId = decodeToken().sub;

    $.ajax({
        url: `/assignment/user?userId=${userId}`,
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {

            console.log(data)
            displayAssignments(data);



        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getNotificationByUser(notification) {
    console.log(notification)

    $.ajax({
        url: `/user/${notification.teacher_id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            console.log(data)
            console.log(data.first_name)
            console.log(data.last_name)
            displayNotifications(data, notification);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function displayAssignments(data) {
    var title1 = document.getElementById("Title-1");
    var skill1 = document.getElementById("Skill-1");
    var date1 = document.getElementById("Date-1");

    var title2 = document.getElementById("Title-2");
    var skill2 = document.getElementById("Skill-2");
    var date2 = document.getElementById("Date-2");

    var title3 = document.getElementById("Title-3");
    var skill3 = document.getElementById("Skill-3");
    var date3 = document.getElementById("Date-3");

    title1.innerHTML = data[0].title
    skill1.innerHTML = data[0].skill_name
    date1.innerHTML = `<i class="fas fa-clock"></i>${displayDate(data[0].deadline)}`

    title2.innerHTML = data[1].title
    skill2.innerHTML = data[1].skill_name
    date2.innerHTML = `<i class="fas fa-clock"></i>${displayDate(data[1].deadline)}`

    title3.innerHTML = data[2].title
    skill3.innerHTML = data[2].skill_name
    date3.innerHTML = `<i class="fas fa-clock"></i>${displayDate(data[2].deadline)}`

    $(document).on("click", ".small-assignment-side-button-1", function () {
        window.location.href = "/quiz.html?skill=" + data[0].skill_id + "&assignment=" + data[0]._id;
    });

    $(document).on("click", ".small-assignment-side-button-2", function () {
        window.location.href = "/quiz.html?skill=" + data[1].skill_id + "&assignment=" + data[1]._id;

    });

    $(document).on("click", ".small-assignment-side-button-3", function () {
        window.location.href = "/quiz.html?skill=" + data[2].skill_id + "&assignment=" + data[2]._id;
    });
}

function displayNotifications(data, notification) {
    var notificationBox = document.getElementById("notification-box");
    console.log(data);
        const type =
            content.slice(0, 5) === "There"
                ? "leaderboard"
                : content.slice(9, 20) === "uncompleted"
                    ? "recurring"
                    : "new";
        
        console.log(data);
        let href, imageUrl;
        switch (type) {
            case "recurring":
            case "new":
                href = `quiz.html?skill=${data.skill_id}&assignment=${data.assignment_id}`;
                // Temporary image to represent pfp of TEACHER
                imageUrl = `./images/testing.jpg`;
                break;
            case "leaderboard":
                href = `group_leaderboard.html?groupId=${data.group_id}`;
                // Temporary image to represent GROUP image
                imageUrl = `./images/sample_groupimg.png`;
                break;
        }
    
    notificationBox.innerHTML +=
        `
    <div onclick="window.location.href= '${href}'"class="row d-flex small-notification-box">
        <div class="col">
            <div class="row m-auto">
                <div class="col d-flex small-notification-header">
                    <img src="images/profile.png" class="notificationimg1"
                        alt="...">
                    <h4 class="text-center"> 
                        <p id="NotificationTitle-1">${data.first_name}&nbsp;${data.last_name}</p>       
                    </h4>
                </div>
            </div>
            <div class="row m-auto">
                <div class="col small-notification-normal-text">
                    <p>${content}</p>
                </div>
            </div>
        </div>
        <button class="small-notification-side-button-1 col-1 d-flex align-items-center justify-content-center">
            <i class="fas fa-angle-right link-light fa-lg"></i>
        </button>
    </div>
    `

}

const displayDate = (dt) => `${(((new Date(dt)).toDateString())).split(" ")[2]} ${(((new Date(dt)).toDateString())).split(" ")[1]} ${(((new Date(dt)).toDateString())).split(" ")[3]} ${(((new Date(dt)).toDateString())).split(" ")[0]}`

let userInfo = JSON.parse(localStorage.getItem('userInfo'));


$(document).ready(function () {

    $("#account-fn").html(userInfo.first_name);
    $("#account-ln").html(userInfo.last_name);


})

$(document).on("click", "#editBtn", function () {
    let fn = $("#account-fn");
    let ln = $("#account-ln");
    let newFn = $("#accountFn").val();
    let newLn = $("#accountLn").val();


    fn.text(newFn);
    ln.text(newLn);

});


$(document).on("click", ".assignment", function () {
    if (this.classList.contains("completed")) {
        window.location.href = "/viewpastquiz.html?quizId=" + this.dataset.quizId;
    }
    else {
        window.location.href = "/quiz.html?skill=" + this.id + "&assignment=" + this.dataset.assignment;
    }
});


