import { Constellation } from "./Constellation.js";
import { Background } from "./Background.js";
import cloc from "./constellation_location.json" assert { type: "json" }; // constellation location data
import connect from "./connected_stars_pair.json" assert { type: "json" }; //constellation point connections

// ------ Setup Canvas ------
// Get Canvas, Context, and set the canvas width and height
var canvas = document.querySelector("canvas");
let ratio = 2;
canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;
var ctx = canvas.getContext("2d");

// Record the name of the final constellation
var result = "none";
// Create background object

let sky_background = new Background(ctx, canvas.width, canvas.height);
// Create an array of constellation from json file data
let constellation_arr = Object.keys(cloc).map(
  (name) =>
    new Constellation(
      ctx,
      cloc[name],
      name,
      canvas.width,
      canvas.height,
      connect[name],
      ratio
    )
);

// Hardcode user_x, user_y
let user_x = 0;
let user_y = 0;

// Capture click event
canvas.addEventListener("click", (event) => {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.x;
  let y = event.clientY - rect.y;
  let total = 0; //Keep track of total stars selected

  for (const constellation of constellation_arr) {
    constellation.click(x, y);
    total += constellation.selected_number;
  }
  //If 5 stars are selected, start calculating which constellation has the most stars.
  if (total == 5) {
    decideConstellation();
  }

  // ----- DEBUG -----
  // Get constellation ratio list
  let ratios = {};
  for (const constellation of constellation_arr) {
    ratios[constellation.name] = constellation.selected_ratio;
  }
  console.log(ratios);
});

// Decide which constellation is selected based on most stars selected;
function decideConstellation() {
  let numStar = constellation_arr[0].selected_number;
  let finalConstellation = constellation_arr[0].name;
  let index = 0;
  for (const constellation of constellation_arr) {
    if (constellation.selected_number > numStar) {
      numStar = constellation.selected_number;
      finalConstellation = constellation.name;
      index = constellation_arr.indexOf(constellation);
    }
  }
  // Connect final constellation stars
  constellation_arr[index].connectAll();
  // Show final constellation image
  sky_background.load_image(
    finalConstellation,
    `../../assets/pictures/constellations/${finalConstellation}.png`
  );
  // Show button to next page
  document.getElementById("next-button").classList.remove("hidden");
  result = finalConstellation;
}

//function

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update background
  sky_background.update(user_x, user_y);

  // Update constellations
  for (const constellation of constellation_arr) {
    if (result == constellation.name) {
      constellation.updateNew(user_x, user_y);
    } else {
      constellation.update(user_x, user_y);
    }
  }
}

// Begin animation
animate();

// Natigation
export function goToPage() {
  window.location.href = "../explanation_page/explanation.html";
}
document.getElementById("next-button").onclick = goToPage;
