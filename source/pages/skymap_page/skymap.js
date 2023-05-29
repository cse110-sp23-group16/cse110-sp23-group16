import { Constellation } from "./Constellation.js";
import { Background } from "./Background.js";

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

function setRatio() {
  let defaultWidth = 1920;
  let defaultHeight = 1080;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let desiredWidth = screenWidth * 2;
  let desiredHeight = screenHeight * 2;
  return Math.max(
    Math.ceil(desiredHeight / defaultHeight),
    Math.ceil(desiredWidth / defaultWidth)
  );
}
let ratio = setRatio();

// Starts the program, all function calls trace back here
async function init() {
  const { cloc, connect } = await loadJsonData();
  // Get Canvas, Context, and set the canvas width and height
  let canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  // Create background object
  let sky_background = new Background(ctx, ratio, canvas.width, canvas.height);
  let cameraOffset = setCanvasPanning(canvas, sky_background);
  // Create an array of constellation from json file data
  let constellation_arr = Object.keys(cloc).map(
    (name) => new Constellation(name,connect[name],ctx,cloc[name],ratio,canvas.width,canvas.height)
  );
  canvas.addEventListener("click", (event) =>
    handleClickCanvas(event, constellation_arr, sky_background)
  );
  // Hard code user coord
  let user_x = 0;
  let user_y = 0;
  // Begin animation
  animate(user_x,user_y,canvas,ctx,constellation_arr,sky_background,cameraOffset);
  document.getElementById("next-button").onclick = goToPage;
}

/**
 * Set up canvas with panning
 * @returns canvas
 * Reference: https://codepen.io/chengarda/pen/wRxoyB
 */
function setCanvasPanning(canvas, sky_background) {
  let ctx = canvas.getContext("2d");
  let cameraOffset = { x: 0, y: 0 };

  // Panning
  canvas.addEventListener("mousedown", onPointerDown);
  canvas.addEventListener("touchstart", (e) => handleTouch(e, onPointerDown));
  canvas.addEventListener("mouseup", onPointerUp);
  canvas.addEventListener("touchend", (e) => handleTouch(e, onPointerUp));
  canvas.addEventListener("mousemove", onPointerMove);
  canvas.addEventListener("touchmove", (e) => handleTouch(e, onPointerMove));

  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e) {
    if (e.touches && e.touches.length == 1)
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    else if (e.clientX && e.clientY) return { x: e.clientX, y: e.clientY };
  }

  // Handle panning events
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  function onPointerDown(e) {
    isDragging = true;
    dragStart.x = getEventLocation(e).x - cameraOffset.x;
    dragStart.y = getEventLocation(e).y - cameraOffset.y;
  }

  function onPointerUp(e) {
    isDragging = false;
  }

  function onPointerMove(e) {
    if (isDragging && getEventLocation(e)) {
      cameraOffset.x = getEventLocation(e).x - dragStart.x;
      cameraOffset.y = getEventLocation(e).y - dragStart.y;
      cameraOffset.x = cameraOffset.x <= 0 ? cameraOffset.x : 0;
      cameraOffset.y = cameraOffset.y <= 0 ? cameraOffset.y : 0;
      cameraOffset.x =
        canvas.width - cameraOffset.x <= 1920 * ratio
          ? cameraOffset.x
          : canvas.width - 1920 * ratio;
      cameraOffset.y =
        canvas.height - cameraOffset.y <= 1080 * ratio
          ? cameraOffset.y
          : canvas.height - 1080 * ratio;
    }
  }

  function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
      singleTouchHandler(e);
    } else if (e.type == "touchmove" && e.touches.length == 2) {
      isDragging = false;
      handlePinch(e);
    }
  }

  return cameraOffset;
}

function handleClickCanvas(event, constellation_arr, sky_background) {
  let canvas = document.querySelector("canvas");
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
    decideConstellation(constellation_arr, sky_background);
    canvas.style.pointerEvents = "none";
  }

  // ----- DEBUG -----
  // Get constellation ratio list
  let ratios = {};
  for (const constellation of constellation_arr) {
    ratios[constellation.name] = constellation.selected_ratio;
  }
  console.log(ratios);
}

// Decide which constellation is selected based on most stars selected;
function decideConstellation(constellation_arr, sky_background) {
  let numStar = constellation_arr[0].selected_number;
  let finalConstellation = constellation_arr[0];
  let index = 0;

  for (const constellation of constellation_arr) {
    if (constellation.selected_number > numStar) {
      numStar = constellation.selected_number;
      finalConstellation = constellation;
      index = constellation_arr.indexOf(constellation);
    }
  }

  // Connect final constellation stars
  constellation_arr[index].connectAll();
  // Show final constellation image
  sky_background.load_image(
    finalConstellation,
    `../../assets/pictures/constellations/${finalConstellation.name}.png`
  );
  // Show button to next page
  document.getElementById("next-button").classList.remove("hidden");
  // Record the result
  finalConstellation.setChosen(true);
  localStorage.setItem("chosenConstellation", finalConstellation.name);
}

// Animation Loop
function animate(
  user_x,
  user_y,
  canvas,
  ctx,
  constellation_arr,
  sky_background,
  cameraOffset
) {
  requestAnimationFrame(() =>
    animate(
      user_x,
      user_y,
      canvas,
      ctx,
      constellation_arr,
      sky_background,
      cameraOffset
    )
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sky_background.update(cameraOffset.x, cameraOffset.y, ratio);
  // Update constellations
  for (const constellation of constellation_arr) {
    if (constellation.isChosen)
      constellation.updateNew(cameraOffset.x, cameraOffset.y);
    else constellation.update(cameraOffset.x, cameraOffset.y);
    // Update offset
    constellation.setOffset(cameraOffset.x, cameraOffset.y);
  }
}

// Natigation
function goToPage() {
  window.location.href = "../explanation_page/explanation.html";
}
// helper function to load json data
async function loadJsonData() {
  const clocResponse = await fetch("./constellation_location.json");

  const cloc = await clocResponse.json();

  const connectResponse = await fetch("./connected_stars_pair.json");
  const connect = await connectResponse.json();
  return { cloc, connect };
}
