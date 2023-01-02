import Sprite from "./Sprite";
import Aliens from "./Aliens.js";

class Aliens_Array {
  constructor(aliens_img) {
    this.aliens_img = aliens_img;
    this.active_aliens_array = [];
  }

  addAlien(initial_x) {
    this.active_aliens_array.push(
      new Aliens(initial_x, 10, 25, 25, this.aliens_img)
    );
  }

  draw_move_remove(ctx) {
    //draw all active missiles!
    this.active_aliens_array.forEach((item) => {
      item.draw(ctx);
      item.move();
      item.wiggle();

      if (item.y < -20) {
        this.active_aliens_array.shift();
      }
    });
  }

  collision_with_tank(Tank, GameState) {
      this.active_aliens_array.forEach((item) => {
          if (item.intersects(Tank)) {
            let explodeSound = document.createElement("audio");
            explodeSound.setAttribute("src", "./assets/explosion.wav");
            explodeSound.setAttribute("autoplay", "autoplay");
            explodeSound.play();
              GameState.isGameOver = true;
          }
      })
  }

  hit_bottom(GameState, canvasHeight) {
    this.active_aliens_array.forEach((item) => {
        if(item.y + 25 > canvasHeight) {
            GameState.isGameOver = true;
        }
    })
  }
}

export default Aliens_Array;
