/**
 * This class is intended for interactable stars, it takes the x and y for
 * the foreground star along with radius and color. It will draw a star
 * there, and it reacts to click captures.
 */
export class ConstellationStar {
  /**
   * Takes the x y for the foreground star, along with the radius for the star.
   * The selected state enables or disables the selected swelling animation, and
   * the swell ratio tells how much to swell by.
   * @param {CanvasRenderingContext2D} ctx canvas rendering context
   * @param {Number} x coordinate
   * @param {Number} y coordinate
   * @param {Number} radius star radius
   * @param {Boolean} selected if is selected
   * @param {Number} swell_ratio animated swelling radius
   * @param {String} color default color
   * @param {String} selected_color selected color
   * @param {Number} ratio aspect ratio
   */
  constructor(
    ctx,
    x,
    y,
    radius,
    selected,
    swell_ratio,
    color,
    selected_color,
    ratio
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.default_radius = radius;
    this.radius = radius;
    this.selected = selected;
    this.max_swell = this.radius * swell_ratio;
    this.dswell = 0.05;
    this.color = color;
    this.selected_color = selected_color;
    this.done = false;
    this.ratio = ratio;
  }

  /**
   * Draws the star based on current values and user_x and user_y
   * @param {Number} user_x user view offset
   * @param {Number} user_y user view offset
   */
  draw(user_x, user_y) {
    if (!this.selected) {
      this.ctx.strokeStyle = this.color;
      this.ctx.fillStyle = this.color;
    } else {
      this.ctx.strokeStyle = this.selected_color;
      this.ctx.fillStyle = this.selected_color;
    }
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + user_x,
      this.y + user_y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw a line between this star and the input star
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   * @param {ConstellationStar} star stars to connect
   */
  connect(user_x, user_y, star) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#16BDE5";
    this.ctx.moveTo(this.x + user_x, this.y + user_y);
    this.ctx.lineTo(star.x + user_x, star.y + user_y);
    this.ctx.stroke();
  }

  /**
   * Call with animation loop, updates the swell amount if it is selected
   * else set the swell to 0
   * @param {Number} user_x user view offset
   * @param {Number} user_y user view offset
   */
  update(user_x, user_y) {
    if (this.selected) {
      this.radius += this.dswell;
      if (this.radius > this.default_radius + this.max_swell) {
        this.dswell = -0.05;
      } else if (this.radius < this.default_radius - this.max_swell) {
        this.dswell = 0.05;
      }
    } else {
      this.radius = this.default_radius;
    }
    this.draw(user_x, user_y);
  }

  /**
   * Click event handler, if the click fell within the region of the circle
   * change its selected mode
   * @param {Number} x clicked coordinate
   * @param {Number} y clicked coordinate
   */
  click(x, y) {
    const isOnStar =
      (this.x - x) ** 2 + (this.y - y) ** 2 < (2 * this.default_radius) ** 2;
    if (isOnStar && !this.done) this.selected = !this.selected;
  }

  /**
   * @Property {Function} Getter for is selected
   */
  get isSelected() {
    return this.selected;
  }

  updateRatio(ratio) {
    this.x *= ratio / this.ratio;
    this.y *= ratio / this.ratio;
  }
}
