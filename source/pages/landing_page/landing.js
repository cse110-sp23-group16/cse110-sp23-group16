import * as analyticsManager from "../analyticsmanager.js";
import playClickSound from "../../utils/playClickSound.js";
import playBgMusic from "../../utils/playBgMusic.js";
const analyticsPageName = "landing";
const analyticsStatus = 1;
analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

window.addEventListener("DOMContentLoaded", init);
var selectedCategory = "";
let backgroundMusic;
let clickSound;
const dailyIconURL = "../../assets/Icons/DailyHoroscope.png";
const carrerIconURL = "../../assets/Icons/Career.png";
const healthIconURL = "../../assets/Icons/Health.png";
const relationshipIconURL = "../../assets/Icons/Relationship.png";

/**
 * @Property {Function} initialize function, called once whole DOM is parsed
 */
function init() {
  backgroundMusic = document.getElementById("background-music");

  // localStorage cleared to reset question type and constellation
  localStorage.clear();
  populateDropdown();
  initializeVoicing();

  // Create a new session for analytics, tag with page name
  analyticsManager.setEmptySession();

  // Hide continue button
  const continueButton = document.getElementById("continue-button");
  continueButton.classList.add("hidden");

  // Category Icon Effect
  const dailyButton = document.getElementById("daily-horoscope-button");
  const relationshipButton = document.getElementById("relationship-button");
  const careerButton = document.getElementById("career-button");
  const healthButton = document.getElementById("health-button");
  setCategoryEffect(dailyButton, "daily", dailyIconURL);
  setCategoryEffect(relationshipButton, "relationship", relationshipIconURL);
  setCategoryEffect(careerButton, "career", carrerIconURL);
  setCategoryEffect(healthButton, "health", healthIconURL);

  // Attach onclick to start and continue
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", handleStart);
  continueButton.addEventListener("click", toSkyMapPage);
}

/**
 * Set mouse evens for category button to trigger category icon effect
 * @param {HTMLButtonElement} categoryButton
 * @param {String} categoryName
 * @param {Strong} iconURL
 */
function setCategoryEffect(categoryButton, categoryName, iconURL) {
  const categoryIconSet = document.getElementById("category-icon-set");
  const categoryIconChange = document.getElementById("category-icon-change");
  const continueButton = document.getElementById("continue-button");
  categoryButton.addEventListener("click", function () {
    selectedCategory = categoryName;
    clickSound = document.getElementById("clickSound");
    playClickSound(clickSound, selectedCategory);
    categoryIconSet.style.backgroundImage = `url(${iconURL})`;
    setSelection(categoryButton, continueButton);
  });
  categoryButton.addEventListener("mouseover", function () {
    categoryIconChange.style.backgroundImage = `url(${iconURL})`;
    categoryIconChange.classList.remove("transparent");
    categoryIconChange.classList.remove("fade-out-fast");
    categoryIconChange.classList.add("fade-in-fast");
  });
  categoryButton.addEventListener("mouseout", function () {
    categoryIconChange.classList.add("transparent");
    categoryIconChange.classList.remove("fade-in-fast");
    categoryIconChange.classList.add("fade-out-fast");
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
  const categoryIconSet = document.getElementById("category-icon-set");
  const categoryButtons = document.getElementsByClassName("category");
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
    continueButton.classList.remove("fade-in");
    continueButton.classList.add("hidden");
    // remove category effect
    categoryIconSet.src = "";
  } else {
    passedButton.classList.add("selected");
    continueButton.classList.remove("hidden");
    continueButton.classList.add("fade-in");
  }
}

/**
 * @Property {Function} Adds the type of question into localStorage under the key "questionType",
 * and routes to skymap page.
 */
function toSkyMapPage() {
  // Transition Animation
  const actionDiv = document.getElementById("action-div");
  const coverDiv = document.getElementById("cover-div");
  const tellerEffect = document.getElementById("teller-effect");
  const tellerImg = document.getElementById("teller");
  //Find user's decision on using voicing text
  const voiceButton = document.getElementById("voice-button");
  if (voiceButton.classList.toggle("crossed-out") == true) {
    let choice = document.querySelector("select").value;
    if (choice != "select") {
      localStorage.setItem("voiceChoice", choice);
    }
  } else {
    localStorage.setItem("voiceChoice", -1);
  }
  // Animations
  tellerImg.classList.remove("teller-move");
  actionDiv.classList.add("fade-out");
  actionDiv.addEventListener("animationend", () => {
    actionDiv.classList.add("transparent");
    tellerEffect.classList.remove("hidden");
    tellerEffect.classList.add("teller-effect-animation");
  });
  coverDiv.classList.remove("hidden");
  coverDiv.classList.add("turn-dark");
  tellerEffect.addEventListener("animationend", () => {
    tellerEffect.classList.remove("half-transparent");
    tellerEffect.classList.add("transparent");
    // Go to next page
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
    window.location.href = "../skymap_page/skymap.html";
  });
  // Set category
  localStorage.setItem("questionType", selectedCategory);
  console.log(selectedCategory);

  //Update Analytics
  analyticsManager.addSessionCategorySelected(selectedCategory);
}

/**
 * @Property {Function} Handle click on start button
 */
function handleStart() {
  const startButton = document.getElementById("start-button");
  const actionDiv = document.getElementById("action-div");
  const categoriesDiv = document.getElementById("categories-div");
  const promptDiv = document.getElementById("prompt-div");
  const title = document.querySelector("header");
  const clawsDiv = document.getElementById("claws-div");
  const categoryIconDiv = document.getElementById("category-icon-div");
  playBgMusic(backgroundMusic);

  actionDiv.classList.remove("hidden");
  categoriesDiv.classList.add("fade-in");
  promptDiv.classList.add("fade-in");
  categoryIconDiv.classList.add("fade-in");
  title.classList.add("transparent");
  title.classList.add("fade-out");
  startButton.classList.remove("glow");
  startButton.classList.add("fade-out");
  clawsDiv.classList.add("fade-out");
  startButton.addEventListener("animationend", () => {
    startButton.classList.add("removed");
  });
}

/**
 * @Property {Function} Helper function that populates the dropdown menu for the voice selection
 */
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
 * @Property {Function} Initialize the voicing text selection and buttons
 */
function initializeVoicing() {
  const option = document.querySelector("#voice-select");
  option.classList.add("hidden");
  const voiceButton = document.getElementById("voice-button");
  voiceButton.classList.toggle("crossed-out");
  voiceButton.addEventListener("click", function () {
    voiceButton.classList.toggle("crossed-out");
    option.classList.toggle("hidden");
  });
}
