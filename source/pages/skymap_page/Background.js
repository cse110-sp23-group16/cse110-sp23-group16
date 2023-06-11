import { BackgroundStar } from "./BackgroundStar.js";

/**
 * This class draws the background hill and gradient given a
 * relative coordinate to anchor with.
 */
export class Background {
  /**
   * Load background images
   * @param {CanvasRenderingContext2D} ctx canvas rendering context
   * @param {Number} ratio scaling ratio along with background
   * @param {Number} width canvas width
   * @param {Number} height canvas height
   */
  constructor(ctx, ratio, width, height) {
    this.ctx = ctx;
    this.ratio = ratio;
    this.images = {}; // objects of image info
    this.width = width;
    this.height = height;
    // Load background images
    this.load_image(
      "sky_gradient",
      "../../assets/skymap/Stargazer-background.png"
    );
    this.load_image("terrian", "../../assets/skymap/Stargazer-asset.png");
  }

  /**
   * Load image
   * @param {String} alt alternative name
   * @param {String} src image source
   */
  load_image(alt, src) {
    console.log(`loading: ${src}`);
    let image = new Image();
    let image_loaded = false;
    image.src = src;
    image.onload = () => {
      image_loaded = true;
      this.images = {
        ...this.images,
        [alt]: { obj: image, loaded: image_loaded },
      };
    };
  }

  /**
   * If images are loaded draw the background images
   * @param {Number} user_x user view offset
   * @param {Number} user_y user view offset
   * @param {Number} scale image scale
   */
  draw(user_x = 0, user_y = 0, scale) {
    Object.keys(this.images).forEach((key) => {
      if (this.images[key].loaded) {
        this.ctx.drawImage(
          this.images[key].obj,
          user_x,
          user_y,
          1920 * scale,
          1080 * scale
        );
      }
    });
  }

  /**
   * Called every animation frame. Does not update any internal values,
   * simply calls draw.
   * @param {Number} user_x user view offset
   * @param {Number} user_y user view offset
   * @param {Number} scale image scale
   */
  update(user_x = 0, user_y = 0, scale) {
    this.draw(user_x, user_y, scale);
  }
}
