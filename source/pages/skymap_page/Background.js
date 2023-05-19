import { BackgroundStar } from "./BackgroundStar.js";

// Background Class
/* 
This class draws the background hill and gradient given a
relative coordinate to anchor with.
*/
export class Background {
    /*
    Load background images
    */
    constructor(ctx) {
        this.ctx = ctx;
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
    draw(user_x=0, user_y=0) {
        if (this.sky_gradient_loaded) {
            this.ctx.drawImage(this.sky_gradient, user_x, user_y);
        }
        if (this.terrain_loaded) {
            this.ctx.drawImage(this.terrain, user_x, user_y);
        }
    }

    /*
    Called every animation frame. Does not update any internal values,
    simply calls draw

    Takes in user_x, user_y
    */
    update(user_x=0, user_y=0) {
        this.draw(user_x, user_y);
    }
}