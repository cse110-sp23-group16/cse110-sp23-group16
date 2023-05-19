// ------ CLASSES -------

// Background Class
/* 
This class draws the background hill and gradient given a
relative coordinate to anchor with.
*/
class Background {
    /*
    Load background images
    */
    constructor() {
        this.terrain_loaded = false;
        let terrain = new Image();
        terrain.src = "../../assets/pictures/Stargazer-asset.png";
        terrain.onload = () => {
            this.terrain_loaded = true;
            this.terrain = terrain;
        }

        this.sky_gradient_loaded = false;
        let sky_gradient = new Image();
        sky_gradient.src = "../../assets/pictures/Stargazer-background.png";
        sky_gradient.onload = () => {
            this.sky_gradient_loaded = true;
            this.sky_gradient = sky_gradient;
        }
    }

    /*
    If images are loaded draw the background images
    */
    draw(user_x, user_y) {
        if (this.sky_gradient_loaded) {
            ctx.drawImage(this.sky_gradient, user_x, user_y);
        }
        if (this.terrain_loaded) {
            ctx.drawImage(this.terrain, user_x, user_y);
        }
    }

    /*
    Called every animation frame. Does not update any internal values,
    simply calls draw

    Takes in user_x, user_y
    */
    update(user_x, user_y) {
        this.draw(user_x, user_y);
    }
}

// Constellation Class
/*
This class draws and tracks its own stars. Must be given coordinates
of the stars relative to the top left of the screen
*/
class Constellation {
    /*
    Takes star list which is an array of star coordinates and creates stars
    */
    constructor(star_coord_list, name) {
        this.stars = [];
        for (const coord of star_coord_list) {
            this.stars.push(new ConstellationStar(coord[0], coord[1], 4, false, 0.5, 
                'white', '#2ec1db'));
        }
        this.name = name;
    }

    /*
    Click event handler, pass click event to all stars in the constellation
    */
    click(x, y) {
        for (const star of this.stars) {
            star.click(x, y);
        }
    }

    /*
    Draw function, draw all stars in constellation
    */
    draw(user_x, user_y) {
        for (const star of this.stars) {
            star.update(user_x, user_y);
        }
    }

    /*
    Update function, to be called by animation loop
    */
    update(user_x, user_y) {
        this.draw(user_x, user_y);
    }

    /*
    Get constellation selected ratio
    */
    get selected_ratio() {
        let stars_selected_cnt = 0;
        for (const star of this.stars) {
            if (star.isSelected) {
                stars_selected_cnt += 1;
            }
        }
        return stars_selected_cnt / this.stars.length
    }
}

// Class for background star
/*
This class is intended for non interactable stars. Given a coordinate
for its absolute location it will draw a star there, and update given
the user_x and user_y
*/
class BackgroundStar {
    /*
    Takes x and y coordinates for star, along with radius and color
    */
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
    }

    /* 
    Draws the background star given the current user x and y
    */
    draw(user_x, user_y) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + user_x, this.y + user_y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }

    /* 
    Update function to be called by animation loop, takes user x and y
    */
    update(user_x, user_y) {
        this.draw(user_x, user_y);
    }
}

// Class for Constellation Star
/* 
This class is intended for interactable stars, it takes the x and y for
the foreground star along with radius and color. It will draw a star
there, and it reacts to click captures.
*/
class ConstellationStar {
    /*
    This constructor takes the x y for the foreground star,
    along with the radius for the star. The selected state
    enables or disables the selected swelling animation, and
    the swell ratio tells how much to swell by
    */
    constructor(x, y, radius, selected, swell_ratio, color, selected_color) {
        this.x = x;
        this.y = y;
        this.default_radius = radius;
        this.radius = radius;
        this.selected = selected;
        this.max_swell = this.radius * swell_ratio;
        this.dswell = 0.05;
        this.color = color;
        this.selected_color = selected_color;
    }

    /*
    Draws the star based on current values and user_x and user_y
    */
    draw(user_x, user_y) {
        if (!this.selected){
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
        } else {
            ctx.strokeStyle = this.selected_color;
            ctx.fillStyle = this.selected_color;
        }
        ctx.beginPath();
        ctx.arc(this.x + user_x, this.y + user_y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }

    /*
    Call with animation loop, updates the swell amount if it is selected
    else set the swell to 0
    */
    update(user_x, user_y) {
        if (this.selected) {
            this.radius += this.dswell;

            if (this.radius > this.default_radius + this.max_swell) {
                this.dswell = -0.05;
            }
            
            if (this.radius < this.default_radius - this.max_swell) {
                this.dswell = 0.05;
            }
        } else {
            this.radius = this.default_radius;
        }
        this.draw(user_x, user_y);
    }

    /*
    Click event handler, if the click fell within the region of the circle
    change its selected mode
    */
    click(x, y) {
        if ((this.x - x) ** 2 + (this.y - y) ** 2 < (2*this.default_radius) ** 2) {
            this.selected = !this.selected;
        }
    }

    /*
    Getter for is selected
    */
    get isSelected() {
        return this.selected;
    }
}


// ------ Setup Canvas ------
// Get Canvas, Context, and set the canvas width and height
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Create background object
let sky_background = new Background();

// Create constellations
let constellation_arr = [
    new Constellation([
        [483, 368],
        [844, 354],
        [909, 152],
        [662, 116]
    ], "Crux"),
    new Constellation([
        [1175, 393],
        [1366, 218],
        [1557, 157],
        [1742, 261]
    ], "Aries"),
    new Constellation([
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
    new Constellation([
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