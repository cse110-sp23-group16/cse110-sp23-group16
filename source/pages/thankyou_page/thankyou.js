import { setShootingStars } from "../shootingStar.js";

let backgroundMusic;

import * as analyticsManager from "../analyticsmanager.js";
const analyticsPageName = "thankYou";
const analyticsStatus = 0;
analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

/**
 * @property {Function} toLandingPage sends user back to landing page
 * @property {Function} init initalize name to landing page.
 */
/**
 * Directs user back to the landing page
 */
function toLandingPage() {
  localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  playClickSound(
    localStorage.getItem("questionType"),
    () => (window.location.href = "../landing_page/landing.html")
  );
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 * Directs user back to the landing page
 */
async function init() {
  // get the music play time of the last page from local storage, then play at that time
  backgroundMusic = document.getElementById("background-music");
  backgroundMusic.currentTime = localStorage.getItem("musicPlayTime");
  backgroundMusic.play();

  new setShootingStars(document);
  window.toLandingPage = toLandingPage;
}

// play click sound, optional callback function to be called after sound ends
function playClickSound(category, callback = null) {
  console.log(category);
  const categoryToSoundPath = {
    daily: "../../assets/music/dailyClick.mp3",
    relationship: "../../assets/music/relationshipClick.mp3",
    career: "../../assets/music/careerClick.mp3",
    health: "../../assets/music/healthClick.mp3",
  };
  const clickSound = document.getElementById("clickSound");
  clickSound.src = categoryToSoundPath[category];
  clickSound.onended = callback;
  clickSound.play();
}
