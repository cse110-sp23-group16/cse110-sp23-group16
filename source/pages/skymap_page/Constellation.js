import { ConstellationStar } from "./ConstellationStar.js";

/**
 * This class draws and tracks its own stars. Must be given coordinates
 * of the stars relative to the top left of the screen
 */
export class Constellation {
  /**
   * Takes star list which is an array of star coordinates and creates stars
   * @param {string} name name of constellation
   * @param {JSONobject} connect the paths to connect all the stars in the constellation.
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} star_coord_list list of star coordinates
   * @param {Number} ratio scaling ratio along with background
   * @param {Number} width canvas width
   * @param {Number} height canvas height
   */
  constructor(name, connect, ctx, star_coord_list, ratio, width, height) {
    this.name = name;
    this.connect = connect;
    this.stars = [];
    this.isChosen = false; // is final constellation or not
    this.offset_x = 0;
    this.offset_y = 0;
    this.width = width;
    this.height = height;
    // initialize constellation stars
    let radius = 3 * ratio;
    let selected = false;
    let swell_ratio = 0.5;
    let color = "white";
    let selected_color = "#2ec1db";
    for (const coord of star_coord_list) {
      this.stars.push(
        new ConstellationStar(
          ctx,
          coord[0] * ratio,
          coord[1] * ratio,
          radius,
          selected,
          swell_ratio,
          color,
          selected_color,
          ratio
        )
      );
    }
  }

  /**
   * Click event handler, pass click event to all stars in the constellation
   * @param {Number} x coordinate
   * @param {Number} y coordinate
   */
  click(x, y) {
    this.stars.forEach((star) =>
      star.click(x - this.offset_x, y - this.offset_y)
    );
  }

  /**
   * Draw function, draw all stars in constellation
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   */
  draw(user_x, user_y) {
    this.stars.forEach((star) => star.update(user_x, user_y));
  }

  /**
   * Update function, to be called by animation loop
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   */
  update(user_x, user_y) {
    this.draw(user_x, user_y);
  }

  /**
   * New update function if the current constellation is the final result.
   * @param {Number} user_x user view offset x
   * @param {Number} user_y user view offset y
   */
  updateNew(user_x, user_y) {
    this.draw(user_x, user_y);
    this.connectAll();
  }

  /**
   * @Property {Function} Connect all the points in the constellation
   */
  connectAll() {
    let points = this.connect;
    for (let starting in points) {
      let destinations = points[starting];
      for (let i in destinations) {
        let destination = destinations[i];
        let start = this.stars[starting];
        let final = this.stars[destination];
        start.connect(this.offset_x, this.offset_y, final);
      }
    }
  }

  /**
   * Set this constellation as chosen by the user
   * @param {String} choice set contellation as choosen
   */
  setChosen(choice) {
    this.isChosen = choice;
  }

  /**
   * Set the display offset
   * @param {Number} offset_x user view offset
   * @param {Number} offset_y user view offset
   */
  setOffset(offset_x, offset_y) {
    this.offset_x = offset_x;
    this.offset_y = offset_y;
  }

  /**
   * @Property {Function} Get constellation selected ratio
   */
  get selected_ratio() {
    let stars_selected_cnt = 0;
    for (const star of this.stars) {
      if (star.isSelected) {
        stars_selected_cnt += 1;
      }
    }
    return stars_selected_cnt / this.stars.length;
  }

  /**
   * @Property {Function} Get the number of selected stars in the constellation
   */
  get selected_number() {
    let stars_selected_cnt = 0;
    for (const star of this.stars) {
      if (star.isSelected) {
        stars_selected_cnt += 1;
      }
    }
    return stars_selected_cnt;
  }

  updateRatio(ratio) {
    this.stars.forEach((star) => star.updateRatio(ratio));
  }
}
