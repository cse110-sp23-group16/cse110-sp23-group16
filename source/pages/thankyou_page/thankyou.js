import { setShootingStars } from "../shootingStar.js";
import * as analyticsManager from "../analyticsmanager.js";
import playClickSound from "../../utils/playClickSound.js";

const analyticsPageName = "thankYou";
const analyticsStatus = 0;
let backgroundMusic;
analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

/**
 * @property {Function} toLandingPage sends user back to landing page
 * @property {Function} init initalize name to landing page.
 */
/**
 * Directs user back to the landing page
 */
function toLandingPage() {
  const clickSound = document.getElementById("clickSound");
  playClickSound(
    clickSound,
    localStorage.getItem("questionType"),
    backgroundMusic.currentTime,
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
  try {
    backgroundMusic = document.getElementById("background-music");
    backgroundMusic.currentTime = localStorage.getItem("musicPlayTime") | 0;
    backgroundMusic.play();
  } catch (e) {
    console.error(e);
  }

  new setShootingStars(document);
  window.toLandingPage = toLandingPage;
}
