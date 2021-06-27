import Game from '/modules/game.js';

let canvas = document.getElementById("gameScreen");

// For Getting Context Type of Canvas i.e how to display graphics on the canvas. Ex - Drawing a 2D object or a 3D object.
let context = canvas.getContext('2d');
// context.clearRect(0,0,800,600);
// fillStyle gives colour to drawing on the canvas.
// Once you set the fillStyle, everytime you make the drawing it is going to use fillStyle.
// For change in colour of the drawing, you need to update fillStyle.
// context.fillStyle = '#f00';  
// context.fillRect(20,30,100,100);

// Everytime you redraw on to the canvas, previously what you draw is still there on the canvas.
// When we working on the game where objects are moving around the screen you would want to clear the canvas.

// context.fillStyle = "#00f";
// context.fillRect(260,200,50,50);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();    

// Game loop runs every frame, updates all the objects and then moves on to the next frame.

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(gameLoop);    
}

requestAnimationFrame(gameLoop);