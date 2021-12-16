let syllabus = {};
var urlSearchParams = new URLSearchParams(window.location.search);
var groupId = urlSearchParams.get("groupId");

var emptyContainer;
var askQnContainer;
var questionsContainer;
var questionContainer;
var questionId;

var ownerName = "";

/* WINDOWS EVENT LISTENER */
$(document).ready(function () {
    $(".header").load("topbar.html", function () {
    });

    emptyContainer = document.getElementById("emptyContainer");
    askQnContainer = document.getElementById("askQnContainer");
    questionsContainer = document.getElementById("questionsContainer");
    questionContainer = document.getElementById("questionContainer");

    const form = document.getElementById('postQnForm');

    form.onsubmit = submitted.bind(form)

    getGroupById();
});

function submitted(event) {
    event.preventDefault();

    var qnTitleInput = document.getElementById("qnTitleInput");
    var qnBodyInput = document.getElementById("qnBodyInput");
    let userId = decodeToken().sub;
    let date = new Date();

    $.ajax({
        url: `/qna/group/${groupId}`,
        type: 'POST',
        data: { 
            group_id: groupId,
            title: qnTitleInput.value,
            content: qnBodyInput.value,
            made_by: userId,
            created_at: date.toISOString()            
        },
        success: function (data, textStatus, xhr) {
            console.log("Successfully posted question");
            document.location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });

}

function ansSubmitted(event) {
    event.preventDefault();

    var ansBodyInput = document.getElementById("ansBodyInput");
    let userId = decodeToken().sub;
    let date = new Date();

    $.ajax({
        url: `/qna/question/${questionId}/answer`,
        type: 'POST',
        data: { 
            content: ansBodyInput.value,
            made_by: userId,
            created_at: date.toISOString()            
        },
        success: function (data, textStatus, xhr) {
            console.log("Successfully posted answer");
            getQuestionByQnId(questionId);
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });

}

/* ONCLICK LISTENERS */

$(document).on("click", "#askqnBtn", function() {
    emptyContainer.style.display = "none";
    questionsContainer.style.display = "none";
    askQnContainer.style.display = "block";
});

$(document).on("click", "#cancelQnBtn", function() {
    document.location.reload();
});

$(document).on("click", ".questionPost", function() {
    questionId = this.id;
    questionsContainer.style.display = "none";
    questionContainer.style.display = "block";

    getQuestionByQnId(questionId);
    
});

$(document).on("click", ".likeBtn", function() {
    var className = this.className;
    var msg;
    
    let userId = decodeToken().sub;
    
    // User cannot like their own answer
    if (userId != this.previousElementSibling.id) {
        // Unlike
        if (className == "fas fa-heart fa-2x text-danger likeBtn") {
            this.className = "fas fa-heart fa-2x text-secondary likeBtn"
            unlikeAnswer(this.id);
            msg = "unlike"
        }
        // Like
        else if (className == "fas fa-heart fa-2x text-secondary likeBtn") {
            this.className = "fas fa-heart fa-2x text-danger likeBtn"
            likeAnswer(this.id);
            msg = "like";
        }

        getQuestionByQnId(questionId);
        setTimeout(() => {
            tabulateExp(this.previousElementSibling.id, msg)
        }, 3000);
    }
    else {
        alert("You cannot like your own answer!");
    }
    
});

/* MISC FUNCTIONS */
function decodeToken() {
    const token = localStorage.getItem('token');

    let base64Url = token.split('.')[1]; // token you get
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let decodedData = JSON.parse(window.atob(base64));

    return decodedData;
}

function getQuestions(questions) {

    for (var x = 0; x < questions.length; x++) {
        getUserById(questions[x])
    }

    emptyContainer.style.display = "none";
    questionsContainer.style.display = "block";
}

function getGroupById() {
    $.ajax({
        url: `/group/${groupId}`,
        dataType: "JSON",
        success: function (data, textStatus, xhr) {
            if (data.qna.length > 0) {
                getQuestions(data.qna);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });
}

function getUserById(questions, msg) {
    $.ajax({
        url: `/user/${questions.made_by}`,
        dataType: "JSON",
        success: function (data, textStatus, xhr) {
            ownerName = data.first_name + " " + data.last_name
            if (msg == "displayQuestion") {
                displayQuestion(questions, ownerName);
            }
            else {
                displayQuestions(questions, ownerName);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });
}

function displayQuestions(questions, ownerName) {

    var questionList = document.getElementById("question-list");
    questionList.innerHTML += 
    `
    <div class="row mx-auto questionPost" id="${questions._id}">
                                <div class="col my-4">
                                    <div class="row mx-auto">
                                        <p class="mb-4 titleQn">${questions.title}</p>
                                    </div>
                                    <div class="row mx-auto d-inline">
                                        <img src="images/profile.png" alt="ownerImg" class="ownerImg img-fluid" /><p class="my-2 d-inline p-0 ownerQn">${ownerName}</p>
                                    </div>
                                </div>
                                <div class="col d-flex my-3 answerRow">
                                    <div class="answerCount d-flex justify-content-center align-items-center row">
                                        <div class="col p-0">
                                            <div class="row mx-auto">
                                                <p class="count m-0 text-center">${questions.answers.length}</p>
                                            </div>
                                            <div class="row mx-auto">
                                                <p class="countLabel m-0 p-0 text-center">answer(s)</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
    `
}

function getQuestionByQnId(questionId) {
    console.log(questionId)
    $.ajax({
        url: `/qna/${questionId}`,
        dataType: "JSON",
        success: function (data, textStatus, xhr) {
            displayQuestion(data);
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });
}

function displayQuestion(data) {
    var answers = ``; 
    var ansIndex = [];
    let userId = decodeToken().sub;
    console.log(data);
    if (data.answers[0].content) {
        if (data.answers.length > 0) {
            answers += 
            `
            <div class="row">
                <div class="col">
                    <p id="ansCount" class="mt-4 mb-4">${data.answers.length} Answers</p>
                </div>
            </div>
            `
            
            for (var x = 0; x < data.answers.length; x++) {
    
                var likeColor = "text-secondary";
    
                for (var i = 0; i < data.answers[x].likes.length; i++) {
                    if (data.answers[x].likes[i].member_id == userId) {
                        likeColor = "text-danger";
                    }
                }
    
                answers += 
                `
                <div class="row mt-4">
                    <div class="col-2 col-lg-1">
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <input type="hidden" id="${data.answers[x].made_by}" />
                                <i class="fas fa-heart fa-2x ${likeColor} likeBtn" id="${data.answers[x]._id}"></i>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <p class="likeCount">${data.answers[x].likes.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-10 col-lg-11 p-0 pe-5">
                        <p class="answerBody">${data.answers[x].content}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 col-lg-1">
                    </div>
                    <div class="col-10 col-md-8 col-lg-9 d-flex align-items-end p-0">
                        <p class="m-0 answerOwner">Answered by: ${data.answers[x].user[0].first_name + " " + data.answers[x].user[0].last_name}</p>
                    </div>
                    <div class="col d-flex answerImgContainer">
                        <img src="images/profile.png" alt="answerImg" class="answerImg" />
                    </div>
                </div>
                <div id="line"></div>
                `
            }
        }
    }

    questionContainer.innerHTML =
    `
    <div class="col">
        <div class="row">
            <div class="col mt-5">
                <p id="questionTitle">${data.title}</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p id="questionContent">${data.content}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 d-flex align-items-end">
                <p id="questionOwner" class="m-0">Asked by: ${ownerName}</p>
            </div>
            <div class="col d-flex" id="ownerImgContainer">
                <img src="images/profile.png" alt="ownerImg" class="ownerImg" />
            </div>
        </div>
        <div id="line"></div>
        ${answers}
        <div class="row">
            <div class="col">
                <p id="ansLabel" class="mt-5">Your Answer</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <form id="postAnsForm">
                    <textarea rows="10" class="form-control" id="ansBodyInput" required></textarea>
                    <button id="postAnsBtn" type="submit" class="btn btn-warning my-4">Post</button>
                </form>
            </div>
        </div>
    </div>
    
    `

    const postAnsForm = document.getElementById('postAnsForm');
    postAnsForm.onsubmit = ansSubmitted.bind(postAnsForm)

}

function likeAnswer(answerId) {
    let userId = decodeToken().sub;
    let date = new Date();

    $.ajax({
        url: `/qna/question/answer/${answerId}/like`,
        type: 'POST',
        data: { 
            member_id: userId, 
            question_id: questionId,
            created_at: date.toISOString()            
        },
        success: function (data, textStatus, xhr) {
            console.log("Successfully liked answer");
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });
}

function unlikeAnswer(answerId) {
    let userId = decodeToken().sub;
    let date = new Date();

    $.ajax({
        url: `/qna/question/answer/${answerId}/unlike`,
        type: 'DELETE',
        data: { 
            member_id: userId, 
            question_id: questionId,
            created_at: date.toISOString()            
        },
        success: function (data, textStatus, xhr) {
            console.log("Successfully unliked answer");
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });
}

function tabulateExp(id, msg) {

    $.ajax({
        url: `/user/${id}`,
        dataType: "JSON",
        success: function (data, textStatus, xhr) {
            var exp = data.exp_points;
            var rank = data.rank_level;
            if (exp != undefined) {
                if (msg == "like") {
                    exp += 20;
                }
                else {
                    exp -= 20
                }
                if (exp >= 100 || exp < 0) {
                    rank += Math.floor(exp/100);
                    exp -= Math.floor(exp/ 100) * 100;
                }


                let result = {
                    "exp_points": exp,
                    "rank_level": rank
                };

                $.ajax({
                    url: `/user/${id}`,
                    type: 'PUT',
                    data: JSON.stringify(result),
                    contentType: 'application/json',
                    success: function (data, textStatus, xhr) {
                        console.log(data)
                        console.log("Successfully Updated User Info")
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                    }
                })
            }
        },
        error: function (xhr, textStatus, errorThrown) {
           console.log(errorThrown)
        }
    });


    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // if (userInfo.exp_points < 0) {
    //     userInfo.exp_points = 0;
    // }

    // let data = {
    //     "exp_points": points + userInfo.exp_points
    // }

    // userInfo.exp_points = data.exp_points;

    // let max = false;
    // let final = 0;

    // // while (!max) {
    // //     let x = Math.floor(data.exp_points / (1000 * mulitplier));
    // //     if (x >= 1) {
    // //         final++;
    // //         mulitplier++;
    // //         data.exp_points -= (1000 * mulitplier);
    // //     }
    // //     else {
    // //         max = true;
    // //     }
    // // }

    // if (userInfo.exp_points >= 100) {
    //     userInfo.rank_level += Math.floor(userInfo.exp_points/100);
    //     userInfo.exp_points -= Math.floor(userInfo.exp_points/ 100) * 100;
    // } 

    // // userInfo.rank_level = final;
    // localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // data["rank_level"] = userInfo.rank_level;

    // $.ajax({
    //     url: `/user/${userInfo._id}`,
    //     type: 'PUT',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     success: function (data, textStatus, xhr) {
    //         console.log(data)
    //         // localStorage.setItem('userInfo', JSON.stringify(data.result));
    //         console.log("Successfully Updated User Info")
    //     },
    //     error: function (xhr, textStatus, errorThrown) {
    //         console.log(xhr);
    //     }
    // })
};