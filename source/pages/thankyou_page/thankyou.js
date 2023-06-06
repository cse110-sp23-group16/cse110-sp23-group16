function toLandingPage() {
  window.location.href = "../landing_page/landing.html";
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

async function init() {
  setShootingStars();
}

function setShootingStars() {
  const starsDiv = document.getElementById('stars-div');
  function createStar() {
    for(let i=0; i<8; i++) {
      let star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * window.innerWidth}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starsDiv.appendChild(star);
    }
  }
  createStar();
  setInterval(() => { createStar() }, 3000);
}
