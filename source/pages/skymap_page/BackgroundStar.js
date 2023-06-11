/**
 * This class is intended for non interactable stars. Given a coordinate
 * for its absolute location it will draw a star there, and update given
 * the user_x and user_y
 */
export class BackgroundStar {
  /**
   * Takes x and y coordinates for star, along with radius and color
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {String} color
   */
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   * Draws the background star given the current user x and y
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   */
  draw(user_x, user_y) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x + user_x,
      this.y + user_y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
    ctx.stroke();
  }

  /**
   * Update function to be called by animation loop, takes user x and y
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   */
  update(user_x, user_y) {
    this.draw(user_x, user_y);
  }
}
