window.addEventListener("DOMContentLoaded", init);
var selectedCategory = "";

/**
 * initialize function, called once whole DOM is parsed
 */
function init() {
  // localStorage cleared to reset question type and constellation
  localStorage.clear();
  populateDropdown();
  initializeVoicing();

  const continueButton = document.getElementById("continue-button");
  continueButton.classList.add("hidden");

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

// Helper function that populates the dropdown menu for the voice selection
function populateDropdown() {
  let select = document.getElementById("voice-select");
  let synth = window.speechSynthesis;
  synth.addEventListener("voiceschanged", () => {
    let list = synth.getVoices();
    for (let i in list) {
      let voice = list[i];
      let option = document.createElement("option");
      option.text = voice.name;
      option.value = i;
      select.add(option);
    }
  });
  console.log("populated");
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
      btn.classList.remove("selected");
    }
  });
  // if button was already selected, make it deselected
  if (passedButton.classList.contains("selected")) {
    passedButton.classList.remove("selected");
    selectedCategory = "";
    continueButton.classList.add("hidden");
  } else {
    passedButton.classList.add("selected");
    continueButton.classList.remove("hidden");
  }
}

/**
 * Adds the type of question into localStorage under the key "questionType",
 * and routes to skymap page
 */
function toSkyMapPage() {
  localStorage.setItem("questionType", selectedCategory);
  const voiceButton = document.getElementById("voice-button");
  if (voiceButton.classList.toggle("crossed-out") == true) {
    let choice = document.querySelector("select").value;
    if (choice != "select") {
      localStorage.setItem("voiceChoice", choice);
    }
  } else {
    localStorage.setItem("voiceChoice", -1);
  }
  window.location.href = "../skymap_page/skymap.html";
  console.log(selectedCategory);
}

function initializeVoicing() {
  //Initialize the voicing text selection
  const option = document.querySelector("#voice-select");
  option.classList.add("hidden");
  const voiceButton = document.getElementById("voice-button");
  voiceButton.classList.toggle("crossed-out");
  voiceButton.addEventListener("click", function () {
    voiceButton.classList.toggle("crossed-out");
    option.classList.toggle("hidden");
  });
}

function getCategory() {
  return QuestionCategories.Work;
}
