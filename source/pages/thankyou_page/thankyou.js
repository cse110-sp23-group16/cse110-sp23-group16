import { setShootingStars } from "../shootingStar.js";

import * as analyticsManager from "../analyticsmanager.js";
const analyticsPageName = "thankYou";
const analyticsStatus = 0;
analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

function toLandingPage() {
  window.location.href = "../landing_page/landing.html";
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

async function init() {
  new setShootingStars(document);
  window.toLandingPage = toLandingPage;
}
