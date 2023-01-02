import "./style.css";

import Game from "./model/Game.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



let initialize = 0;

let audioElement0 = document.createElement('audio');
audioElement0.setAttribute('src', './assets/music.mpeg');
audioElement0.setAttribute('autoplay', 'autoplay');


let fireSound = document.createElement('audio');
fireSound.setAttribute('src', './assets/shoot.wav');
fireSound.setAttribute('autoplay', 'autoplay');

let game = new Game(canvas, audioElement0);


document.onkeydown = checkKey;

function checkKey(e) {
    if ((e.keyCode == '37' || e.keyCode == '39') && initialize == 0) {
      audioElement0.play(); 
      audioElement0.loop = true;

      game.draw();
      initialize++;
    }
}



