window.addEventListener("DOMContentLoaded", init);
var selectedCategory = "";

/**
 * initialize function, called once whole DOM is parsed
 */
function init() {
  // localStorage cleared to reset question type and constellation
  localStorage.clear();

  const continueButton = document.getElementById("continue-button");
  continueButton.style.visibility = "hidden";

  const dailyButton = document.getElementById("daily-horoscope-button");
  dailyButton.addEventListener("click", function () {
    selectedCategory = "daily";
    setSelection(dailyButton, continueButton);
  });
  const relationshipButton = document.getElementById("relationship-button");
  relationshipButton.addEventListener("click", function () {
    selectedCategory = "relationship";
    setSelection(relationshipButton, continueButton);
  });
  const careerButton = document.getElementById("career-button");
  careerButton.addEventListener("click", function () {
    selectedCategory = "career";
    setSelection(careerButton, continueButton);
  });
  const healthButton = document.getElementById("health-button");
  healthButton.addEventListener("click", function () {
    selectedCategory = "health";
    setSelection(healthButton, continueButton);
  });
}

/**
 * All buttons besides the passed button are set to deselected, if the
 * passed button is already selected, its colors become deselected and the
 * selected question type is reset, the button to continue only becomes
 * available when a button is set to selected
 * @param {Button} passedButton
 * @param {Button} continueButton
 */
function setSelection(passedButton, continueButton) {
  var categoryButtons = document.getElementsByClassName("category");
  // set all other buttons to deselected
  [].forEach.call(categoryButtons, function (btn) {
    if (btn !== passedButton) {
      btn.style.color = "beige";
      btn.style.background = "transparent";
    }
  });
  // if button was already selected, make it deselected
  if (passedButton.style.background == "beige") {
    passedButton.style.color = "beige";
    passedButton.style.background = "transparent";
    selectedCategory = "";
    continueButton.style.visibility = "hidden";
  } else {
    passedButton.style.color = "black";
    passedButton.style.background = "beige";
    continueButton.style.visibility = "visible";
  }
}

/**
 * Adds the type of question into localStorage under the key "questionType",
 * and routes to skymap page
 */
function toSkyMapPage() {
  localStorage.setItem("questionType", selectedCategory);
  window.location.href = "../skymap_page/skymap.html";
}

function getCategory() {
  return QuestionCategories.Work;
}
