// based on @richtaur tutorial: How to make a simple HTML5 Canvas game
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

// 1. Create the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

// 2. Include Images
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/main_background.png"

// Raccoon image
var raccoonReady = false;
var raccoonImage = new Image();
raccoonImage.onload = function() {
    raccoonReady = true;
};
raccoonImage.src = "images/raccoon.png"

// Fish Image
var fishReady = false;
var fishImage = new Image();
fishImage.onload = function() {
    fishReady = true;
};
fishImage.src = "images/fish.png"

// 3. Game objects
var raccoon = {
    speed: 256, // pixels per second
    x: 0,
    y: 0
};

var fish = {
    x: 0,
    y: 0
};

var fishCaught = 0;

// 4. Player input
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true; //deprecated - find alternative
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode]; //deprecated - find alternative
}, false);

// 5. New game
// Reset game when raccoon catches a fish
var reset = function() {
    raccoon.x = canvas.width / 2;
    raccoon.y = canvas.height / 2;

    // Make fish appear randomly on the screen
    fish.x = 32 + (Math.random() * (canvas.width - 64));
    fish.y = 32 + (Math.random() * (canvas.height - 64));

};

// 6. Update game objects
var update = function(modifier) {
    if (38 in keysDown) { // Player holding up
        raccoon.y -= raccoon.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        raccoon.y += raccoon.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        raccoon.x -= raccoon.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        raccoon.x += raccoon.speed * modifier;
    }

    // Are they touching?
    if (
        raccoon.x <= (fish.x + 32)
        && fish.x <= (raccoon.x + 32)
        && raccoon.y <= (fish.y + 32)
        && fish.y <= (raccoon.y + 32)
    ) {
        ++fishCaught
        reset();
    }

};

// 7. Render objects
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (raccoonReady) {
        ctx.drawImage(raccoonImage, raccoon.x, raccoon.y);
    }

    if (fishReady) {
        ctx.drawImage(fishImage, fish.x, fish.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Fish caught: " + fishCaught, 32, 32);
};

// 8. Main game loop
var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again
    requestAnimationFrame(main);
};

// 9. A note about looping
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start the game
var then = Date.now();
reset();
main();