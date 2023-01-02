const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let playerOneTurn = true;
let playerTwoTurn = false;

let playerOneScoreValue = 0;
let playerTwoScoreValue = 0;

let playerOneHoldValue = 0;
let playerTwoHoldValue = 0;

function playerNullifyGains(p1orp2) {
  document.getElementById(p1orp2 + "-hold").style.width = playerOneHoldValue + "%";
  document.getElementById(p1orp2 + "-hold").setAttribute("aria-valuenow", playerOneHoldValue);
  document.getElementById(p1orp2 + "-hold").innerText = playerOneHoldValue;
}


function roll() {
  //display a die roll from 1 - 6
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue  - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  if (faceValue == 1) {
    //nullify the "hold" gains!
    if (playerOneTurn) {
      playerOneHoldValue = 0;
      playerNullifyGains("p1");
    }
    if (playerTwoTurn) {
      playerTwoHoldValue = 0;
      playerNullifyGains("p2");
    }

    endTurn();
    
  } else {
    // Check to see if reached 100!!!!!
    // add the result of the roll to hold value!
    if (playerOneTurn) {
      if (playerOneHoldValue + playerOneScoreValue + faceValue >= 100) {
        playerWinsProtocol("p1");
      } else {
        playerOneRollsSuccess(faceValue);
      }
    }
    if (playerTwoTurn) {
      if (playerTwoHoldValue + playerTwoScoreValue + faceValue >= 100) {
        playerWinsProtocol("p2");
      } else {
        playerTwoRollsSuccess(faceValue);
      }
    }
  } 
}

function playerOneRollsSuccess(non_one_number) {
  playerOneHoldValue += non_one_number;
  document.getElementById("p1-hold").style.width = playerOneHoldValue + "%";
  document.getElementById("p1-hold").setAttribute("aria-valuenow", playerOneHoldValue);
  document.getElementById("p1-hold").innerText = playerOneHoldValue;
}

function playerTwoRollsSuccess(non_one_number) {
  playerTwoHoldValue += non_one_number;
  document.getElementById("p2-hold").style.width = playerTwoHoldValue + "%";
  document.getElementById("p2-hold").setAttribute("aria-valuenow", playerTwoHoldValue);
  document.getElementById("p2-hold").innerText = playerTwoHoldValue;
}



function hold() {
  //convert the gains from "hold" into the "score"
  if (playerOneTurn) {
    playerOneHolds();
  }
  if (playerTwoTurn) {
    playerTwoHolds();
  }
  endTurn();
}

function playerOneHolds() {
  playerOneScoreValue += playerOneHoldValue;
  document.getElementById("p1-score").style.width = playerOneScoreValue + "%";
  document.getElementById("p1-score").setAttribute("aria-valuenow", playerOneScoreValue);
  document.getElementById("p1-score").innerText = playerOneScoreValue; 

  playerOneHoldValue = 0;
  document.getElementById("p1-hold").style.width = playerOneHoldValue + "%";
  document.getElementById("p1-hold").setAttribute("aria-valuenow", playerOneHoldValue);
  document.getElementById("p1-hold").innerText = playerOneHoldValue;
}

function playerTwoHolds() {
  playerTwoScoreValue += playerTwoHoldValue;
  document.getElementById("p2-score").style.width = playerTwoScoreValue + "%";
  document.getElementById("p2-score").setAttribute("aria-valuenow", playerTwoScoreValue);
  document.getElementById("p2-score").innerText = playerTwoScoreValue; 

  playerTwoHoldValue = 0;
  document.getElementById("p2-hold").style.width = playerTwoHoldValue + "%";
  document.getElementById("p2-hold").setAttribute("aria-valuenow", playerTwoHoldValue);
  document.getElementById("p2-hold").innerText = playerTwoHoldValue;
}


function endTurn() {
  playerOneTurn = !playerOneTurn;
  playerTwoTurn = !playerTwoTurn;

  //set the winner's title
  if (playerOneTurn) {
    document.getElementById("result").innerText = "Player-1 turn!";
  } else if (playerTwoTurn) {
    document.getElementById("result").innerText = "Player-2 turn!";
  }

}

function playerWinsProtocol(p1Orp2) {
  holdValue = 0;
  document.getElementById(p1Orp2 + "-hold").style.width = holdValue + "%";
  document.getElementById(p1Orp2 + "-hold").setAttribute("aria-valuenow", holdValue);
  document.getElementById(p1Orp2 + "-hold").innerText = holdValue;

  score = 100;
  //set attribute "class", progress-bar bg-success
  document.getElementById(p1Orp2+"-score").setAttribute("class", "progress-bar bg-success");
  document.getElementById(p1Orp2+"-score").style.width = score + "%";
  document.getElementById(p1Orp2+"-score").setAttribute("aria-valuenow", score);
  document.getElementById(p1Orp2+"-score").innerText = score + " 🎉";

  //disable the buttons
  rollBtn.setAttribute("class", "btn btn-success btn-lg btn-block disabled");
  holdBtn.setAttribute("class", "btn btn-danger btn-lg btn-block disabled");

  //set the winner's title
  if (p1Orp2 === "p1") {
    document.getElementById("result").innerText = "Player-1 won!";
  } else if (p1Orp2 === "p2") {
    document.getElementById("result").innerText = "Player-2 won!";
  }
}