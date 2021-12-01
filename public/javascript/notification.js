let notificationOpen = false;
const notificationBox = document.getElementById("notificationBox");

function displayNotification() {
    if (notificationOpen == false) {
        notificationBox.style.display = "block";
        notificationOpen = true;
    } else {
        notificationBox.style.display = "none";
        notificationOpen = false;
    }
}
