window.addEventListener("DOMContentLoaded", init);
var selectedCategory = "";

/**
 * initialize function, called once whole DOM is parsed
 */
function init() {
  // localStorage cleared to reset question type and constellation
  localStorage.clear();
  
  const continueButton = document.getElementById("continue-button");
  const categoryIconSet = document.getElementById("category-icon-set");
  const categoryIconChange = document.getElementById("category-icon-change");

  continueButton.classList.add("hidden");

  const dailyButton = document.getElementById("daily-horoscope-button");
  dailyButton.addEventListener("click", function () {
    selectedCategory = "daily";
    categoryIconSet.style.backgroundImage = "url('daily.png')";
    setSelection(dailyButton, continueButton);
  });
  dailyButton.addEventListener("mouseover", function () {
    categoryIconChange.style.backgroundImage = "url('daily.png')";
    categoryIconChange.classList.remove("transparent");
    categoryIconChange.classList.remove("fade-out-fast");
    categoryIconChange.classList.add("fade-in-fast");
  })
  dailyButton.addEventListener("mouseout", function () {
    categoryIconChange.classList.add("transparent");
    categoryIconChange.classList.remove("fade-in-fast");
    categoryIconChange.classList.add("fade-out-fast");
  })
  const relationshipButton = document.getElementById("relationship-button");
  relationshipButton.addEventListener("click", function () {
    selectedCategory = "relationship";
    categoryIconSet.style.backgroundImage = "url('relationship.png')";
    setSelection(relationshipButton, continueButton);
  });
  relationshipButton.addEventListener("mouseover", function () {
    categoryIconChange.style.backgroundImage = "url('relationship.png')";
    categoryIconChange.classList.remove("transparent");
    categoryIconChange.classList.remove("fade-out-fast");
    categoryIconChange.classList.add("fade-in-fast");
  })
  relationshipButton.addEventListener("mouseout", function () {
    categoryIconChange.classList.add("transparent");
    categoryIconChange.classList.remove("fade-in-fast");
    categoryIconChange.classList.add("fade-out-fast");
  })
  const careerButton = document.getElementById("career-button");
  careerButton.addEventListener("click", function () {
    selectedCategory = "career";
    categoryIconSet.style.backgroundImage = "url('career.png')";
    setSelection(careerButton, continueButton);
  });
  careerButton.addEventListener("mouseover", function () {
    categoryIconChange.style.backgroundImage = "url('career.png')";
    categoryIconChange.classList.remove("transparent");
    categoryIconChange.classList.remove("fade-out-fast");
    categoryIconChange.classList.add("fade-in-fast");
  })
  careerButton.addEventListener("mouseout", function () {
    categoryIconChange.classList.add("transparent");
    categoryIconChange.classList.remove("fade-in-fast");
    categoryIconChange.classList.add("fade-out-fast");
  })
  const healthButton = document.getElementById("health-button");
  healthButton.addEventListener("click", function () {
    selectedCategory = "health";
    categoryIconSet.style.backgroundImage = "url('health.png')";
    setSelection(healthButton, continueButton);
  });
  healthButton.addEventListener("mouseover", function () {
    categoryIconChange.style.backgroundImage = "url('health.png')";
    categoryIconChange.classList.remove("transparent");
    categoryIconChange.classList.remove("fade-out-fast");
    categoryIconChange.classList.add("fade-in-fast");
  })
  healthButton.addEventListener("mouseout", function () {
    categoryIconChange.classList.add("transparent");
    categoryIconChange.classList.remove("fade-in-fast");
    categoryIconChange.classList.add("fade-out-fast");
  })
}

function setCategoryEffect() {
  const categoryIcon = getElementById("category-icon");
  const dailyHoloscopeButton = getElementById("daily-horoscope-button");
  dailyHoloscopeButton.addEventListener("onmouseover", () => {
    categoryIcon.src = "./daily-holoscope.png";
  })
  dailyHoloscopeButton.addEventListener("onmouseover", () => {
    categoryIcon.src = "./daily-holoscope.png";
  })
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
 * Adds the type of question into localStorage under the key "questionType",
 * and routes to skymap page
 */
function toSkyMapPage() {
  // Transition Animation
  const actionDiv = document.getElementById('action-div');
  const coverDiv = document.getElementById('cover-div');
  const tellerEffect = document.getElementById('teller-effect');
  actionDiv.classList.add("fade-out");
  actionDiv.addEventListener("animationend", (event) => {
    actionDiv.classList.add("transparent");
    tellerEffect.classList.remove("hidden");
    tellerEffect.classList.add("teller-effect-animation");
  })
  coverDiv.classList.remove("hidden");
  coverDiv.classList.add("turn-dark");
  tellerEffect.addEventListener("animationend", () => {
    tellerEffect.classList.remove("half-transparent");
    tellerEffect.classList.add("transparent");
    // Go to next page
    window.location.href = "../skymap_page/skymap.html";
  })
  // Set category
  localStorage.setItem("questionType", selectedCategory);
  console.log(selectedCategory);
}

function getCategory() {
  return QuestionCategories.Work;
}

function handleStart() {
  const startButton = document.getElementById('start-button');
  const actionDiv = document.getElementById('action-div');
  const categoriesDiv = document.getElementById('categories-div');
  const promptDiv = document.getElementById('prompt-div');
  const title = document.querySelector('header');
  const clawsDiv = document.getElementById('claws-div');
  const categoryIconDiv = document.getElementById('category-icon-div');
  actionDiv.classList.remove('hidden');
  categoriesDiv.classList.add('fade-in');
  promptDiv.classList.add('fade-in');
  categoryIconDiv.classList.add('fade-in');
  title.classList.add('transparent');
  title.classList.add('fade-out');
  startButton.classList.remove('glow');
  startButton.classList.add('fade-out');
  clawsDiv.classList.add('fade-out');
  startButton.addEventListener("animationend", () => {
    startButton.classList.add('removed');
  })
}
