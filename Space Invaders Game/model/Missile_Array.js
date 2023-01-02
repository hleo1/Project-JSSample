import Sprite from "./Sprite";

class Missile_Array {
  constructor(missile_img, tank, GameState) {
    this.GameState = GameState;
    this.tank = tank;
    this.missile_img = missile_img;
    this.active_missile_array = [];
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) {
    if (e.key === " " || e.key === "SpaceBar") {
      if (this.GameState.missiles > 0) {
        let fireSound = document.createElement("audio");
        fireSound.setAttribute("src", "./assets/shoot.wav");
        fireSound.setAttribute("autoplay", "autoplay");
        fireSound.play();
        this.addMissile();
        this.GameState.missiles--;
      }
    }
  }

  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      //   this.dx = 0;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      //   this.dx = 0;
    }
  }

  addMissile() {
    this.active_missile_array.push(
      new Sprite(this.tank.x + 12.5, 600 - 85, 25, 25, this.missile_img, 0, -2)
    );
  }

  draw_move_remove(ctx) {
    //draw all active missiles!
    this.active_missile_array.forEach((item) => {
      item.draw(ctx);
      item.move();
      if (item.y + 25 < 0) {
        //must be the first missile. remove the first missile from the array, just like a queue
        this.active_missile_array.shift();
        this.GameState.missiles++;
      }
    });
  }

  collision_alien_check(alien_array, GameState) {
    this.active_missile_array.forEach((value_missile, index_missile) => {
      alien_array.active_aliens_array.forEach((value_alien, index_alien) => {
        if (value_missile.intersects(value_alien)) {
          let explodeSound = document.createElement("audio");
          explodeSound.setAttribute("src", "./assets/explosion.wav");
          explodeSound.setAttribute("autoplay", "autoplay");
          explodeSound.play();

          //remove value_missile and value_alien in the array
          this.active_missile_array.splice(index_missile, 1);
          alien_array.active_aliens_array.splice(index_alien, 1);
          GameState.score++;
          GameState.missiles++;
        }
      });
    });
  }
}

export default Missile_Array;
