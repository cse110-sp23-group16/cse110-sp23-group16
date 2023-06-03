const categories = ["relationship", "career", "health", "daily"];
const constellations = [
  "Crux",
  "Aries",
  "Orion",
  "CanisMajor",
  "Ursa Major",
  "Carnia",
  "Ophiuchus",
  "Armadillo Dragon",
];
const errorMsg =
  "Please try again later by selecting both your question and your constellation. You will now be taken to the home page.";

/*
Once called, this function hides away the triggering button, displays 
the fortune teller response as well as the next page button.
*/
function toggleText() {
  let explanation = document.getElementById("explanation");
  let buttonClicked = document.getElementById("visibleButton");
  let text = document.getElementById("hiddenText");
  let button = document.getElementById("hiddenButton");
  explanation.classList.add("glow");
  buttonClicked.style.display = "none";
  text.style.display = "block";
  button.style.display = "block";
  const chosenConstellation = localStorage.getItem("chosenConstellation");
  const questionInput = localStorage.getItem("questionType");
  if (chosenConstellation != null && questionInput != null) {
    fetch("all_responses.json")
      .then((response) => response.json())
      .then((data) => {
        const answer =
          data[questionInput][chosenConstellation][
            Math.floor(Math.random() * 3)
          ];
        let index = 0;
        let interval;
        let words = answer.split(" ");
        interval = setInterval(showNextCharacter, 100);
        function showNextCharacter() {
          if (index < words.length) {
            text.textContent += words[index] + " ";
            index++;
          } else {
            clearInterval(interval);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const answer = errorMsg;
    text.textContent = answer;
    setTimeout(function () {
      window.location.href = "../landing_page/landing.html";
    }, 5000);
  }
}

/*
Once called, the window will be showing the thankyou page.
*/
function goToPage() {
  window.location.href = "../thankyou_page/thankyou.html";
}

/*
As an animated transition, main section rising to its position
*/
window.addEventListener("load", function () {
  var mainContent = document.querySelector("main");
  var desiredPosition = 0;

  setTimeout(function () {
    mainContent.style.top = desiredPosition + "px";
  }, 100);
});
