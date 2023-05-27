import { ConstellationStar } from "./ConstellationStar.js";

// Constellation Class
/*
This class draws and tracks its own stars. Must be given coordinates
of the stars relative to the top left of the screen
*/
export class Constellation {
  /**
   * Takes star list which is an array of star coordinates and creates stars
   * @param {Array} star_coord_list list of star coordinates
   * @param {string} name name of constellation
   * @param {JSON object} connect the paths to connect all the stars in the constellation.
   */
  constructor(ctx, star_coord_list, name, width, height, connect) {
    this.stars = [];
    for (const coord of star_coord_list) {
      let color = "white";
      let selected_color = "#2ec1db";
      this.stars.push(
        new ConstellationStar(
          ctx,
          coord[0],
          coord[1],
          4,
          false,
          0.5,
          color,
          selected_color
        )
      );
    }
    this.name = name;
    this.connect = connect;
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
    New update function if the current constellation is the final result.
    */
  updateNew(user_x, user_y) {
    this.draw(user_x, user_y);
    this.connectAll();
  }

  /*
    Connect all the points in the constellation
    */
  connectAll() {
    let points = this.connect;
    for (let starting in points) {
      let destinations = points[starting];
      for (let i in destinations) {
        let destination = destinations[i];
        let start = this.stars[starting];
        let final = this.stars[destination];
        start.connect(final);
      }
    }
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
    return stars_selected_cnt / this.stars.length;
  }

  /**
   * Get the number of selected stars in the constellation
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
}
