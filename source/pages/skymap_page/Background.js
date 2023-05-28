import { BackgroundStar } from "./BackgroundStar.js";

// Background Class
/* 
This class draws the background hill and gradient given a
relative coordinate to anchor with.
*/
export class Background {
    /** 
     * Load background images
     * @param {CanvasRenderingContext2D} ctx canvas rendering context
    */
    constructor(ctx, ratio, width, height) {
        this.ctx = ctx;
        this.ratio = ratio;
        this.images = {};   // objects of image info
        this.width = width;
        this.height = height;
        // Load images
        // backgrounds
        this.load_image("sky_gradient", "../../assets/pictures/others/Stargazer-background.png");
        this.load_image("terrian", "../../assets/pictures/others/Stargazer-asset.png");
    }

    /* 
    Image loading
    */
    load_image(alt, src) {
        console.log(`loading: ${src}`)
        let image = new Image();
        let image_loaded = false;
        image.src = src;
        image.onload = () => {
            image_loaded = true;
            this.images = {...this.images, [alt]: { obj: image, loaded: image_loaded}};
        }
    }

  /*
    If images are loaded draw the background images
    */
  draw(user_x = 0, user_y = 0, scale) {
    this.ctx.drawImage(this.images['sky_gradient'].obj, user_x, user_y, 1920*scale, 1080*scale);
    this.ctx.drawImage(this.images['terrian'].obj, user_x, user_y, 1920*scale, 1080*scale);
  }

  /*
    Called every animation frame. Does not update any internal values,
    simply calls draw

    Takes in user_x, user_y
    */
  update(user_x = 0, user_y = 0, scale) {
    this.draw(user_x, user_y, scale);
  }
}

