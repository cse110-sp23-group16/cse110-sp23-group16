function toggleText() {
    let buttonClicked = document.getElementById("visibleButton");
    let text = document.getElementById("hiddenText");
    let button = document.getElementById("hiddenButton");
    buttonClicked.style.display = "none";
    text.style.display = "block";
    button.style.display = "block";
}

function goToPage() {
    window.location.href = "../thankyou_page/thankyou.html";
}