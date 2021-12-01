$(document).ready(() => {
    getNotificationsByUserId();
});

/* API CALLS */
const getNotificationsByUserId = () => {
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1]; // token you get
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const { sub, issuedRole } = JSON.parse(window.atob(base64));

    $.ajax({
        url: `notification/user?userId=${sub}`,
        dataType: "JSON",
        success: (data, textStatus, xhr) => {
            renderNotification(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Failed to retrieve notifications");
        },
    });
};

/* DISPLAY DATA */
const renderNotification = (data) => {
    if (data.length === 0) {
        $("#notificationBox")
            .append(`<div class="row container-fluid my-1 p-0 py-2 m-0 no-notification">
                            <span class="row container-fluid">No notifications!</span>
                        </div>`);
    }else{
        
    }
};
