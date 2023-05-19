import { Constellation } from "./Constellation.js";
import { Background } from "./Background.js";

// ------ Setup Canvas ------
// Get Canvas, Context, and set the canvas width and height
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Create background object
let sky_background = new Background(ctx);

// Create constellations
let constellation_arr = [
    new Constellation(ctx, [
        [483, 368],
        [844, 354],
        [909, 152],
        [662, 116]
    ], "Crux"),
    new Constellation(ctx, [
        [1175, 393],
        [1366, 218],
        [1557, 157],
        [1742, 261]
    ], "Aries"),
    new Constellation(ctx, [
        [868, 28],
        [801, 95],
        [884,155],
        [902,239],
        [983,271],
        [1100,154],
        [1172,271],
        [1123,425],
        [1079,435],
        [1036,450],
        [1167,531],
        [1027,564],
        [1279,175],
        [1322,221],
        [1352,266],
        [1332,330],
        [1295,371]
    ], "Orion"),
    new Constellation(ctx, [
        [547,35],
        [681,76],
        [530,134],
        [570,232],
        [557,340],
        [407,352],
        [295,366],
        [217,212],
        [106,206],
        [259,416],
        [184,508],
        [370,536],
        [465,416],
        [654, 410]
    ], "Canis Major")
];

// Hardcode user_x, user_y
let user_x = 0;
let user_y = 0;

// Capture click event
canvas.addEventListener('click', (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;

    for (const constellation of constellation_arr) {
        constellation.click(x, y);
    }

    // ----- DEBUG -----
    // Get constellation ratio list
    let ratios = {}
    for (const constellation of constellation_arr) {
        ratios[constellation.name] = constellation.selected_ratio;
    }
    console.log(ratios);
})

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update background
    sky_background.update(user_x,user_y);

    // Update constellations
    for (const constellation of constellation_arr) {
        constellation.update(user_x, user_y);
    }
}

// Begin animation
animate();