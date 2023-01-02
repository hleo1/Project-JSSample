import Block from "./Block.js";

class Sprite extends Block {
    constructor(x, y, width, height, image, dx, dy) {
        super(x, y, width, height, image);
        this.dx = dx;
        this.dy = dy;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

export default Sprite; 