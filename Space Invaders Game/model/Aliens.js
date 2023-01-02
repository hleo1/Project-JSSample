import Sprite from "./Sprite";

class Aliens extends Sprite {
    constructor(x, y, width, height, image) {
        //random speed betwen 0.5 and 1
        super(x, y, width, height, image, -1, (Math.random() * 0.5 + 0.5));

        //initial dx is going to the left. initial dy is going down
        this.original_x = x;
    }

    wiggle() {
        if(this.x <= (this.original_x - 10) || this.x >= (this.original_x + 10)) {
            this.dx *= -1;
        }
    }


}

export default Aliens;