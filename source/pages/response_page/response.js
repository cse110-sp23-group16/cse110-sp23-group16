const categories = ["relationship", "career", "health", "daily"];
const constellations = [
  "Crux",
  "Aries",
  "Orion",
  "Canis Major",
  "Ursa Major",
  "Carnia",
  "Ophiuchus",
  "Armadillo Dragon"
];

// Randomly select a category
const randomCategory = categories[Math.floor(Math.random() * categories.length)];
// Randomly select a constellation
const randomConstellation = constellations[Math.floor(Math.random() * constellations.length)];

/*
Once called, this function hides away the triggering button, displays 
the fortune teller response as well as the next page button.
*/
function toggleText() {
  let buttonClicked = document.getElementById("visibleButton");
  let text = document.getElementById("hiddenText");
  let button = document.getElementById("hiddenButton");
  buttonClicked.style.display = "none";
  text.style.display = "block";
  button.style.display = "block";

  fetch('all_responses.json')
  .then(response => response.json())
  .then(data => {
    const answer = data[randomCategory][randomConstellation];
    const span = document.createElement("span");
    span.textContent = answer;
    text.appendChild(span);
  })
  .catch(error => {
    console.error(error);
  });
}

/*
Once called, the window will be showing the thankyou page.
*/
function goToPage() {
  window.location.href = "../thankyou_page/thankyou.html";
}
