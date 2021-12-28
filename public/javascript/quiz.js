var intervalId, countdown, quizData, questionArray = [];

/* EVENT LISTENER */
$(document).ready(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let path = 'level';
    let id = '';

    $(".header").load("topbar.html", function () {
        document.getElementById("profile-image").src = img_info()
        document.getElementById("name").innerHTML = getName();
    });

    if (window.location.toString().includes("ongoing")) {
        location.href = '404.html';
    }

    if (params != null) {
        for (key in params) {
            if (params[key] != "" && params[key] != undefined && params[key] != null) {
                if (key != "assignment") {
                    path = key;
                    id = params[key];
                }
            }
            else {
                alert('ERROR!');
                location.href = 'quiz.html'
            }
        }
    }
    getQuizAjax(path, id);
})

function allowDrop(ev) {
    ev.preventDefault();


}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
    ev.dataTransfer.setData("id", ev.target.parentElement.parentElement.parentElement.id);
    ev.dataTransfer.setData("optionId", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var originalElementText = ev.dataTransfer.getData("text");
    var originalElementId = ev.dataTransfer.getData("id");
    var originalElement = document.getElementById(originalElementId);
    var optionId = ev.dataTransfer.getData("optionId");
    var targetInnerHTML = ev.currentTarget.children[0].innerHTML;

    // Swap values if drag and drop in the same question
    if (ev.currentTarget.parentElement.parentElement.id == originalElement.id) {
        ev.currentTarget.children[0].innerHTML = originalElementText;
        var originalElementText = originalElement.children[1].children[parseInt(optionId.charAt(3)) - 1];
        originalElementText.children[0].innerHTML = targetInnerHTML;
    }

}

//On back press
window.onpopstate = function (e) {
    //Clear timer 
    clearInterval(intervalId);

    //Checking for history state
    if (e.state != null) {
        let path = e.state.path;
        let id = e.state.id;

        getQuizAjax(path, id);
    }
    else {
        getQuizAjax("level", "");
    }
};

$(document).on("click", ".dropDownOptions", function () {
    let path;
    let id = this.id;
    let array = ['level', 'topic', 'skill'];

    for (let i = 0; i < array.length; i++) {
        // let check = $(".dropDownOptions").hasClass(`${array[i]}`);
        // if (check == true) {
        path = array[i];
        break;
        // }
    }
    console.log(path);
    if (path != null || path != undefined) {
        // if (path != 'skill') {
        //     let state = {
        //         path: path,
        //         id: id,
        //     }
        //     history.pushState(state, null, `?${path}=${id}`);
        //     getQuizAjax(path, id);
        // }
        // else {
        path = "trial";
        if (window.location.toString().includes("quiz")) {
            path = "quiz";
        }
        window.open(`${path}.html?skill=${id}`);
        //}
    }
    else {
        alert("ERROR!");
    }

    // if (path != null || path != undefined) {
    //     if (path != 'skill') {
    //         $("body").html()
    //     }
    // }
    // else {
    //     alert("ERROR!");
    // }

})

$(document).on("click", "#dropdownMenuLink", function () {
    $(".levelNo").width($("#dropdownMenuLink").innerWidth());
})

$(document).on("click", "#secondaryDropDown", function () {
    $(".secondaryLvlNo").width($("#secondaryDropDown").innerWidth());
})

$(document).on("click", ".form-check-inline .form-check-input", function () {
    var id = this.id;

    if (id == 4) {
        for (var i = 0; i < 4; i++) {
            this.parentElement.parentElement.children[i].children[0].checked = false;
        }
    }
    else {
        this.parentElement.parentElement.children[4].children[0].checked = false;
    }
})

$(document).on("click", ".cancelBtn", function () {
    window.location.href = "/overview.html"
})

$(document).on("click", ".click", function () {
    let id = this.id;

    if (id == "beginBtn") { //Start quiz
        questionArray = [];
        funcs[quizData.topic_name].generateQuestion(quizData);
        displayQuestion();
    }
    else {
        // Submit quiz
        let id;
        let isFill = true;
        let isNumber = true;

        //Checking for empty field
        $('input').each(function () {
            if ($.trim($(this).val()) == "" && quizData.topic_name != "Rational Numbers") {
                id = this.id;
                isFill = false;

                return false;
            }
            //Checking for invalid input
            if (isNaN($(this).val()) && quizData.topic_name != "Rational Numbers") {
                id = this.id;
                isNumber = false;

                return false;
            }
        });


        if (isFill && isNumber || countdown < 1) {
            // var c = document.getElementById('the_canvas_element_id');
            // var t = c.getContext('2d');
            //Stop the timer
            clearInterval(intervalId);

            //Calculating time taken
            let timeTaken = quizData.duration * 60 - countdown;
            let time = Math.floor(timeTaken / 60) + "." + (timeTaken - (Math.floor(timeTaken / 60) * 60));

            //Marking quiz
            let result = funcs[quizData.topic_name].markQuiz(quizData, questionArray);
            let user = JSON.parse(localStorage.getItem("userInfo"));
            let quizMessage;
            let status;
            if (result[1].total >= 90) {
                quizMessage = 'Congratulations!';
                status = 'Now try more quizzes to boost your ranking on the leaderboard!';
            }
            else if (result[1].total >= 60) {
                quizMessage = 'Good Work!'
                status = 'Review your mistakes below and try again! Aim for perfection.';
            }
            else {
                quizMessage = 'You can do better!'
                status = 'Review your mistakes below and try again.';
            }
            // let status = (result[1].total >= 50) ? 'pass' : 'fail';
            //Displaying results
            $('#skillName').remove();
            $('#skillLevel').remove();
            $('.cancelBtn').remove();
            $('#support').before(
                `
                <h2 class="text-center mt-4 mb-2" id="quizMessage">${quizMessage}</h2>
                <div class="row justify-content-center align-items-center text-center">
                    <div class="col-12 px-3">
                        <h6 id="scoreMessage">Your score is <b>${Math.round(result[1].total)}</b>!</h6>
                        <br>
                        <h5 class="text-center" id="statusMessage">${status}</h5>
                    </div>                    
                </div>
                <div class="container">
                    <div class="row justify-content ">
                        <div class="col-4 d-flex justify-content-end">
                            <a class="my-3" href="overview.html"><button class="btn btn-lg text-light ml-4" id="returnBtn">Return</button></a>
                        </div>
                        <div class="col-4 d-flex justify-content-center">
                            <a class="my-3" href="https://www.instagram.com/"><button class="btn btn-lg text-light" id="instagram"><i class="fab fa-instagram"></i> Share Instagram</button></a><br>
                        </div>
                        <div class="col-4 d-flex ">

                            <!-- Load Facebook SDK for JavaScript -->
                            <div id="fb-root"></div>
                            <script>
                                (function(d, s, id) {
                                    console.log("get s");

                                    console.log(s);
                                    console.log(d);
                                    console.log(id);

                                    var js, fjs = d.getElementsByTagName(s)[0];
                                    if (d.getElementById(id)) return;
                                    js = d.createElement(s); js.id = id;
                                    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
                                    fjs.parentNode.insertBefore(js, fjs);
                                }(document, 'script', 'facebook-jssdk'));
                            </script>
                                             
                            <a class="my-3 share-btn" href="#"><button class="btn btn-lg text-light" id="facebook"><i class="fab fa-facebook"></i> Share Facebook</button></a><br>
                            <script type="text/javascript">
                            function fb_share() {
                                // facebook share dialog
                                FB.ui( {
                                    method: 'feed',
                                    caption: "regreg",
                                    description: "testtest",
                                    name: "testing123",
                                    picture: "http://fbrell.com/f8.jpg"
                                });

                            }
                            // add click event to link using jQuery
                            $(document).ready(function(){
                            $('.share-btn').on( 'click', fb_share );
                            });
                            </script>

                        </div>
                    </div>
                </div>
                <br>
                <div class="text-center" id="progressText"> Take a look at your progress:</div>
                `
            );
            // <i class="col-2 fas fa-glass-cheers fa-4x"></i>

            //Creating canvas
            createCanvas(5, ['Score', 'Time Taken', 'Easy Score', 'Medium Score', 'Hard Score'], "support");

            //Check if its trial
            if (!window.location.toString().includes("trial")) {

                //Preparing data for posting quiz
                const data = {
                    "skill_id": quizData.skillId,
                    "level": quizData.level,
                    "skill_name": quizData.skill_name,
                    "topic_name": quizData.topic_name,
                    "done_by": user._id,
                    "score": result[1],
                    "questions": result[0],
                    "num_of_qn": quizData.num_of_qn,
                    "percent_difficulty": quizData.percent_difficulty,
                    "time_taken": time,
                    "isCompleted": true,
                    "created_at": Date.now,
                }
                var urlSearchParams = new URLSearchParams(window.location.search);
                var assignment_id = urlSearchParams.get("assignment");
                if (assignment_id != null && assignment_id != undefined) {
                    data.assignment_id = assignment_id;
                }
                submitQuiz(data);

                updateUserInfo(result[2]);
                updateGameInfo(result[2]);
            }
            else {

                for (let i = 0; i < 5; i++) {
                    displayChart([50, 60, 10], i);
                }

                // //Prompt user to signup for more
                let modalHtml =
                    `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body text-center mb-3">
                                <h5 class="modal-title my-3" id="staticBackdropLabel">Want more? Sign up now for Free!!</h5>
                                <a href="signup.html"><button class="btn btn-outline-primary">Sign up!</button></a>
                                <a href="index.html"><button class="btn btn-outline-primary">Return to index</button></a>
                            </div>
                            </div>
                        </div>
                    </div>`
                $("body").append(modalHtml);
                $(".modal").modal('show');

                //Bluring out contetnt
                $('body>*:not(.modal)').css('filter', 'blur(10px)');
            }
            window.scrollTo(0, 0);
        }
        else {
            let err = "Complete the quiz!";
            if (isFill == true) err = "Numbers only!";

            //Focusing on field input
            document.getElementById(id).focus();

            //Showing alerts
            $.alert({
                icon: 'fas fa-exclamation-triangle',
                type: 'red',
                title: 'Alert!',
                content: err,
            });
        }
    }
})

$(document).on("click", ".returnBtn", function () {
    $.confirm({
        icon: 'fas fa-exclamation-triangle',
        title: 'Are you sure?',
        content: 'This quiz will not be saved and the action cannot be undone.',
        type: 'red',
        buttons: {
            ok: {
                text: "Confirm",
                btnClass: 'btn-outline-danger',
                keys: ['enter'],
                action: function () {
                    window.close();
                }
            },
            cancel: function () {
            }
        }
    });
})

// $(function() { 
//     $("#shareBtn").click(function() { 
//         html2canvas($("#scoreMessage"), {
//             onrendered: function(canvas) {
//                 theCanvas = canvas;
//                 document.body.appendChild(canvas);

//                 canvas.toBlob(function(blob) {
// 					saveAs(blob, "Dashboard.png"); 
// 				});
//             }
//         });
//     });
// }); 
/* API CALLS */
function getQuizAjax(path, id) {
    $.ajax({
        url: `${path}/${id}`,
        dataType: 'JSON',
        success: function (data, textStatus, xhr) {
            if (id == "") {
                path = 'alevel';
                url = "/quiz";
            }
            after(path, data);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("ERROR!");
            location.href = '404.html';
        }
    });
}

function submitQuiz(newQuiz) {
    console.log(newQuiz)
    $.ajax({
        url: `quiz`,
        type: 'POST',
        data: JSON.stringify(newQuiz),
        contentType: 'application/json',
        success: function (data, textStatus, xhr) {
            $('.submitBtn').remove();
            $('.returnBtn').remove();

            getDetailedBenchmark("", "support");

            let container = document.getElementById("support");

            container.className = "row m-0 m-auto justify-content-center";
            $(container).after('<h4 class="my-5 text-center" id="reviewQuiz">Review Quiz</h4>');


            if (newQuiz.score.total >= 80) {
                // add animation
                confetti();

                setTimeout(() => {
                    confetti.reset();
                }, 40000);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log("fail quiz")
        }
    })
};
function updateUserInfo(points) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo.exp_points < 0) {
        userInfo.exp_points = 0;
    }

    let data = {
        "exp_points": points + userInfo.exp_points
    }

    userInfo.exp_points = data.exp_points;

    let max = false;
    let final = 0;

    // while (!max) {
    //     let x = Math.floor(data.exp_points / (1000 * mulitplier));
    //     if (x >= 1) {
    //         final++;
    //         mulitplier++;
    //         data.exp_points -= (1000 * mulitplier);
    //     }
    //     else {
    //         max = true;
    //     }
    // }

    if (userInfo.exp_points >= 100) {
        userInfo.rank_level += Math.floor(userInfo.exp_points / 100);
        userInfo.exp_points -= Math.floor(userInfo.exp_points / 100) * 100;
    }

    // userInfo.rank_level = final;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    data["rank_level"] = userInfo.rank_level;

    $.ajax({
        url: `/user/${userInfo._id}`,
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data, textStatus, xhr) {
            console.log(data)
            // localStorage.setItem('userInfo', JSON.stringify(data.result));
            console.log("Successfully Updated User Info")
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    })
};

function updateGameInfo(points) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    $.ajax({
        url: `/game?user_id=${userInfo._id}`,
        type: 'GET',
        success: function (data, textStatus, xhr) {
            points += data.points;

            let updated = {
                "points": points
            }

            $.ajax({
                url: `/game?user_id=${userInfo._id}`,
                type: 'PUT',
                data: updated,
                dataType: 'JSON',
                success: function (data, textStatus, xhr) {
                    console.log('Successfully Updated Game Info');
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error!');
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    })
};

function after(path, data) {
    let vname;
    let head = '';
    let notes = [];
    let end = '_name';
    let topicsArray = [];
    let level = '';
    console.log(data);
    if (path != "skill") {
        if (path == 'level') {
            data = data.topics;
            vname = "topic";
        }
        else if (path == 'topic') {
            data = data.skills;
            vname = "skill";
        }
        else {
            vname = "level";
            end = '';
        }

        for (let i = 0; i < data.length; i++) {

            if (data[i].level > 0 && data[i].level < 7) {
                head = "Primary "
            }
            else {
                head = "Secondary "
            }

            notes.push({
                "id": data[i]._id,
                "display": head + data[i][vname + end],
                "topic": data[i].topics,
                // "skill": data[i].topics[0]
            })


        }

        displayCard(notes, vname);
    }
    else {
        if (data.level > 0 && data.level < 7) {
            head = 'Primary '
            level = data.level
        }
        else {
            head = 'Secondary '
            level = data.level - 6
        }

        $("body").html(
            `<div class="row justify-content-center m-2">
                <div  class="d-flex justify-content-center">
                   <img src="images/Psleonline_logo_transparent.png" alt="Logo" style="width: 35%">
                </div>
                <div class="col-12 col-sm-10 " id="content">
                    <div class="row flex-nowrap noBar justify-content-center">
                        <div class="d-flex flex-column justify-content-center align-items-center py-5 px-3 p-sm-5" ">       
                            <h4 class="text-center" id="levelTxt">${head} ${level}</h4>
                            <h1 class="text-center" id="skillTxt">${data.skill_name}</h4>
                            <h5 class="text-center" id="durationTxt"><i class="fas fa-clock"></i> Time Limit: ${data.duration} Minutes</h4><br/>
                            <div class="col-6 border p-sm-5 p-3 mt-2" style="border-radius:15px;" id="instructionsBox">
                                <div class="pl-5">
                                    <p class="h5 text-center mb-5" id="instructionsHeader">Instructions</p>
                                    <p class="text-center" id="instructionsTxt">Test will be saved and submit automatically when timer is up</p>
                                    <p class="m-1 text-center" id="instructionsTxt">You are required to finish the test in one sitting</p>
                                    <br/><br/>
                                    <p class="text-center" id="instructionsTxt">There are a total of ${data.num_of_qn} questions in the quiz</p>
                                    <p class="text-center" id="instructionsTxt">Answer all of the questions</p>
                                </div>
                            </div>
                            <div class="text-end mt-5">
                                <button class="btn btn-lg btn-primary click" id="beginBtn">Begin Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>`);
        quizData = data;
    }
}

// Display Data
function displayQuestion() {
    let container = document.getElementById("content");
    let head = 'Primary'
    container.innerHTML =
        `
        <div class="h5 text-center my-3" id="skillLevel">${head} ${quizData.level}</div>
        <div class="h4 text-center my-3" id="skillName">${quizData.skill_name}</div>
            <div class="container row m-auto">
                <div class="col-10 container m-auto justify-content-center" id="support">
                    <div class="row align-items-center">
                        <div class="col-2 text-end">
                            <i class="fas fa-stopwatch fa-lg"></i>
                        </div>
                        <div class="progress col-10 p-0">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="timebar"></div>
                        </div>
                    </div>
                    <p class="text-center" style="font-family: Roboto">Remaining Time <span id='time' class='text-center'> ${quizData.duration}:00</span></p>
                </div>
            </div>
       `;

    let content = funcs[quizData.topic_name].arrangeQuestion(quizData, questionArray);
    container.innerHTML += content + '</div><br><br><div class=" justify-content-center d-flex text-center mb-3"><button class="btn btn btn-lg cancelBtn me-2">Cancel</button><button class="btn btn btn-lg click submitBtn">Submit</button></div>';
    $(".reviewClass").css("display", "none");

    //Starting timer
    startCountdown();
}

function displayCard(data, name) {
    let primaryContainer = document.getElementById("container");
    let secondaryContainer = document.getElementById("container2")
    let lvlName = "";
    let lvl = 0;
    primaryContainer.innerHTML = '';
    //Checking if quiz is available
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            lvl = (data[i].display.charAt(data[i].display.length - 2) + data[i].display.charAt(data[i].display.length - 1)).trim();

            if (lvl > 0 && lvl < 7) {
                lvlName = "Primary " + lvl;
            }
            else {
                lvlName = "Secondary " + (lvl - 6);
            }

            let content =
                `
                <div class="row p-0">
                    <a class="btn btn-block dropdown mt-2" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                        ${lvlName}<i class="fas fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu ${name} levelNo" aria-labelledby="dropdownMenuLink" style="width:${$("#opdownMenuLink").width()}">`
            var topics = "";
            if (data[i].topic.length <= 0) {
                topics +=
                    `
                    <li><a class="dropdown-item dropDownOptions disabled" href="">No Topics Available</a></li>
                    `
            }
            else {
                for (x = 0; x < data[i].topic.length; x++) {
                    console.log(data[i].topic[x].skills)
                    if (data[i].topic[x].skills.length <= 0) {
                        topics +=
                            `
                            <li><a class="dropdown-item dropDownOptions disabled">No Topics Available</a></li>
                            `
                        continue
                    }
                    for (y = 0; y < data[i].topic[x].skills.length; y++) {
                        topics +=
                            `
                        <li><a class="dropdown-item dropDownOptions" id = ${data[i].topic[x].skills[y]._id} href="">${data[i].topic[x].skills[y].skill_name}</a></li>
                        `
                    }
                }
            }
            content += topics;
            content += "</ul></div></div>";

            if (lvl > 0 && lvl < 7) {
                primaryContainer.innerHTML += content;
            }
            else {
                secondaryContainer.innerHTML += content;
            }
        }
    }
    else {
        primaryContainer.innerHTML =
            `<div class='d-flex flex-column align-items-center justify-content-center notAvailable'>
                <i class="icon-blue fas fa-atom fa-4x"></i>
                <p class="h5 mt-3">No Quiz Available!</p>
            </div>`;
    }
}

//Function for countdown 
function startCountdown() {
    let seconds;
    let minutes;
    let duration = 60 * quizData.duration - 1;//Duration in seconds

    displayCountdown = document.getElementById('time');
    displayTimebar = document.getElementById('timebar');

    countdown = duration;

    intervalId = setInterval(function () {
        minutes = parseInt(countdown / 60, 10);
        seconds = parseInt(countdown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //Display countdown in html
        displayCountdown.innerHTML = minutes + ":" + seconds
        displayTimebar.style.width = ((duration - countdown) / duration) * 100 + '%';

        //When timer reaches 0
        if (--countdown < 0) {
            clearInterval(intervalId); //Stop countdown
            $('.submitBtn').trigger('click'); //Trigger submit 
        }

    }, 1000);
}

// Function to generated number between min and max (both included)
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generated decimal between min, max and precision (both included)
function generateRandomDecimal(min, max, precision) {
    var value = Math.random() * (max - min + 1) + min;

    return value.toFixed(precision);
}

function generateRandomString(array) {
    var value = array[generateRandomNumber(0, array.length - 1)];

    return value;
}

const funcs = {
    'Fractions': fraction,
    'Rounding Off': roundingOff,
    'Integers': integers,
    // 'Algebra': algebra,
    'Ordering Numbers': ordering,
    'Rational Numbers': rationalNumbers
};


// misc functions
function confetti() {
    console.log("calling confetti")
    var myCanvas = document.createElement('canvas');
    document.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        particleCount: 80,
        spread: 200
    });
}