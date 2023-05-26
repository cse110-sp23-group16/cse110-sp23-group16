import { ConstellationStar } from "./ConstellationStar.js";

/*
This class draws and tracks its own stars. Must be given coordinates
of the stars relative to the top left of the screen
*/
export class Constellation {

    /**
     * Takes star list which is an array of star coordinates and creates stars
     * @param {string} name name of constellation
     * @param {JSON object}connect the paths to connect all the stars in the constellation.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Array} star_coord_list list of star coordinates
    */
    constructor(name, connect, ctx, star_coord_list) {
        this.name = name;
        this.connect = connect;
        this.stars = [];
        this.isChosen = false;   // is final constellation or not
        // initialize constellation stars
        let radius = 4;
        let selected = false;
        let swell_ratio = 0.5;
        let color = 'white';
        let selected_color = '#2ec1db';
        for (const coord of star_coord_list) {
            this.stars.push(new ConstellationStar(ctx, coord[0], coord[1], 
                radius, selected, swell_ratio, color, selected_color));
        }
        this.name = name;
        this.connect = connect;
    }

  /*
    Click event handler, pass click event to all stars in the constellation
    */
    click(x, y) {
        this.stars.forEach(star => star.click(x, y));
    }

  /*
    Draw function, draw all stars in constellation
    */
    draw(user_x, user_y) {
        this.stars.forEach(star => star.update(user_x, user_y));
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

    setChosen(choice) {
        this.isChosen = choice;
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

    /*
    Get the number of selected stars in the constellation
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
