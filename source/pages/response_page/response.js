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

/*
Once called, this function hides away the triggering button, displays 
the fortune teller response as well as the next page button.
*/
function toggleText() {
  let buttonClicked = document.getElementById("visibleButton");
  let explanation = document.getElementById("explanation");
  let text = document.getElementById("hiddenText");
  let button = document.getElementById("hiddenButton");
  buttonClicked.classList.add("removed");
  text.style.display = "block";
  button.style.display = "block";

  const chosenConstellation = localStorage.getItem("chosenConstellation");
  const questionInput = localStorage.getItem("questionType");

  fetch("all_responses.json")
    .then((response) => response.json())
    .then((data) => {
      const answer = data[questionInput][chosenConstellation];
      const span = document.createElement("span");
      span.textContent = answer;
      text.appendChild(span);
      explanation.classList.remove("hidden");
      button.classList.remove("hidden");
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
Once called, the window will be showing the thankyou page.
*/
function goToPage() {
  window.location.href = "../thankyou_page/thankyou.html";
}
