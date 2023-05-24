// Class for Constellation Star
/* 
This class is intended for interactable stars, it takes the x and y for
the foreground star along with radius and color. It will draw a star
there, and it reacts to click captures.
*/
export class ConstellationStar {
    /*
    This constructor takes the x y for the foreground star,
    along with the radius for the star. The selected state
    enables or disables the selected swelling animation, and
    the swell ratio tells how much to swell by
    */
    constructor(ctx, x, y, radius, selected, swell_ratio, color, selected_color) {
        this.ctx = ctx
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
            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
        } else {
            this.ctx.strokeStyle = this.selected_color;
            this.ctx.fillStyle = this.selected_color;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x + user_x, this.y + user_y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.stroke();
    }

    // Draw a line between this star and the input star
    connect(star){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#16BDE5"; 
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(star.x, star.y);
        this.ctx.stroke();
    }

    /*
    Call with animation loop, updates the swell amount if it is selected
    else set the swell to 0
    */
    update(user_x, user_y) {
        if (this.selected) {
            this.radius += this.dswell;
<<<<<<< HEAD

            if (this.radius > this.default_radius + this.max_swell) {
                this.dswell = -0.05;
            }
            
            if (this.radius < this.default_radius - this.max_swell) {
=======
            if (this.radius > this.default_radius + this.max_swell) {
                this.dswell = -0.05;
            }
            else if (this.radius < this.default_radius - this.max_swell) {
>>>>>>> main
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