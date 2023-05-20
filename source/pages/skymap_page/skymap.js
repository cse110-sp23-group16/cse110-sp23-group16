import { Constellation } from "./Constellation.js";
import { Background } from "./Background.js";
import cloc from "./constellation_location.json" assert { type: 'json' };;   // constellation location data

// ------ Setup Canvas ------
// Get Canvas, Context, and set the canvas width and height
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Create background object
let sky_background = new Background(ctx, canvas.width, canvas.height);

// Create an array of constellation from json file data
let constellation_arr = Object.keys(cloc).map(name => new Constellation(ctx, cloc[name], name, canvas.width, canvas.height))

// Hardcode user_x, user_y
let user_x = 0;
let user_y = 0;


// Capture click event
canvas.addEventListener('click', (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;

    //Keep track of total stars selected
    let total = 0;
    for (const constellation of constellation_arr) {
        constellation.click(x, y);
        total += constellation.selected_number;
    }
    
    if (total == 5){
        let numStar = constellation_arr[0].selected_number;
        let finalConstellation = constellation_arr[0].name;
        for (const constellation of constellation_arr) {
            if (constellation.selected_number > numStar){
                numStar = constellation.selected_number;
                finalConstellation = constellation.name;
            }
        }
        console.log(numStar);
        console.log(finalConstellation);
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