let counter = 0;

function spawnInvader() {
    console.log(`Invader ${++counter}`);
}

function draw() {

    const chance = Math.floor(Math.random() * 200);
    if (chance < 2) {
        spawnInvader();
    }
}

setInterval(draw, 10);