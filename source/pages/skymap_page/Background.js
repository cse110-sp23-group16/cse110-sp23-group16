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
     * @param {number} width background width
     * @param {number} height background height
    */
    constructor(ctx, ratio) {
        this.ctx = ctx;
        this.ratio = ratio;
        this.images = {};   // objects of image info
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
  draw(user_x = 0, user_y = 0) {
    Object.keys(this.images).forEach((key) => {
      if (this.images[key].loaded) {
        this.ctx.drawImage(this.images[key].obj, user_x, user_y, this.images[key].obj.width * this.ratio, this.images[key].obj.height * this.ratio);
      }
    });
  }

  /*
    Called every animation frame. Does not update any internal values,
    simply calls draw

    Takes in user_x, user_y
    */
  update(user_x = 0, user_y = 0) {
    this.draw(user_x, user_y);
  }
}

