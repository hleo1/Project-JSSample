import Tank from "./Tank";
import Missile_Array from "./Missile_Array.js";
import Aliens_Array from "./Aliens_Array";

class Game {
    constructor(canvas, audioElement) {
        const ctx = canvas.getContext("2d");
    
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Invaders shot down:  0", 8, 20);
        ctx.fillText("Missile:  10", 8, 40);

        this.audioElement = audioElement;
        
        this.img = new Image(10,10);
        this.img.src = "./assets/tank.png";

        this.missile_img = new Image(10,10);
        this.missile_img.src = "./assets/missile.png";

        this.alien_img = new Image(10,10);
        this.alien_img.src = "./assets/invader.png";

        this.tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50, this.img);

        //draw tank, though it's not showing up for some reason :/
        this.tank.draw(ctx);

        this.GameStates = {score: 0, missiles: 10, isGameOver: false};


        //keep track of all the missiles
        this.missiles_on_screen = new Missile_Array(this.missile_img, this.tank, this.GameStates);

//keep track of all the aliens on screen
        this.aliens_on_screen = new Aliens_Array(this.alien_img);


        this.draw = this.draw.bind(this);
        this.spawnInvader = this.spawnInvader.bind(this);
    }

    spawnInvader() {
        this.aliens_on_screen.addAlien(Math.random * 430 + 50);
    }

    draw() {
        // console.log(this.ctx);
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Invaders shot down:  " + this.GameStates.score, 8, 20);
        ctx.fillText("Missile:  " + this.GameStates.missiles, 8, 40);
      
        //display the tank, according to its x and y coordinates
        this.tank.draw(ctx);
        //update x and y coordinates according to current dx and dy values
        this.tank.move(canvas.width);
      
        this.missiles_on_screen.draw_move_remove(ctx);
      
        const chance = Math.floor(Math.random() * 1500);
        //If God says so, an invader will come
        if (chance < 3) {
          this.aliens_on_screen.addAlien(Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1));
        }
        this.aliens_on_screen.draw_move_remove(ctx);
      
        //check for if missiles hit aliens
        this.missiles_on_screen.collision_alien_check(this.aliens_on_screen, this.GameStates) 
      
        //check for GameOverConditions
        //did alien hit the tank?
        this.aliens_on_screen.collision_with_tank(this.tank, this.GameStates);
        //did alien hit the bottom?
        if(!this.GameStates.isGameOver) {
          this.aliens_on_screen.hit_bottom(this.GameStates, canvas.height);
        }
      
        if (this.GameStates.isGameOver == false) {
          window.requestAnimationFrame(this.draw);
        } else {
            this.audioElement.pause();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "16px Arial";
          ctx.fillStyle = "#0095DD";
          ctx.fillText("Invaders shot down:  " + this.GameStates.score, 8, 20);
          ctx.fillText("Game Over! ", 8, 40);
        }
        
    }
}

export default Game;