import { setShootingStars } from "../shootingStar.js";

function toLandingPage() {
  window.location.href = "../landing_page/landing.html";
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

async function init() {
  new setShootingStars(document);
  window.toLandingPage = toLandingPage;
}
