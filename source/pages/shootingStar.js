export function setShootingStars(document) {
  const starsDiv = document.getElementById("stars-div");
  function createStar() {
    for (let i = 0; i < 16; i++) {
      let star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * window.innerWidth}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starsDiv.appendChild(star);
    }
  }
  createStar();
  setInterval(() => {
    createStar();
  }, 3000);
}
