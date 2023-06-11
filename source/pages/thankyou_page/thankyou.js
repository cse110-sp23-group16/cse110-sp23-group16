import { setShootingStars } from "../shootingStar.js";
/**
 * @property {Function} toLandingPage sends user back to landing page
 * @property {Function} init initalize name to landing page.
 */
/**
 * Directs user back to the landing page
 */
function toLandingPage() {
  window.location.href = "../landing_page/landing.html";
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 * Directs user back to the landing page
 */
async function init() {
  new setShootingStars(document);
  window.toLandingPage = toLandingPage;
}
