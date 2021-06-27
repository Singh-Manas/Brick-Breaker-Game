import Paddle from '/modules/paddle.js';
import InputHandler from '/modules/input.js';
import Ball from '/modules/ball.js';
import Brick from '/modules/brick.js';
import { buildLevel, level1, level2 } from './levels.js';

const GAMESTATE = {
    PAUSED:  0,
    RUNNING:  1,
    MENU:  2,
    GAMEOVER:  3,
    NEWLEVEL:   4
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.levels = [level1, level2];
        this.currentLevel = 0;
        new InputHandler(this.paddle, this);
    }
    start() {
        if(this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.MENU) return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        // for(let i = 0; i < 10; i++) {
        //     bricks.push(new Brick(this, {x:  i * 52, y:  20}));
        // }
        this.gameObjects = [this.ball, this.paddle];
        this.gameState = GAMESTATE.RUNNING;
    }
        
    update(deltaTime) {
        // this.paddle.update(deltaTime);
        // this.ball.update(deltaTime);
        if(this.lives === 0)    this.GAMESTATE = GAMESTATE.GAMEOVER;

        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER)  return;

        if(this.bricks.length === 0) {
            // console.log("New Level");
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }
    draw(context) {
        // this.paddle.draw(context);
        // this.ball.draw(context);
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(context));

        if(this.gameState === GAMESTATE.PAUSED) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.fill();

            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gameState === GAMESTATE.MENU) {
            // console.log("Inside Menu function");
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Brick Breaker Game Rules", this.gameWidth / 2, this.gameHeight / 4);
            context.fillText("1. Press Space Bar to start the game.", this.gameWidth / 2, this.gameHeight / 3);
            context.fillText("2. Press Escape Button to pause/resume the game.", this.gameWidth / 2, this.gameHeight / 2.4);
            context.fillText("3. Press Left/Right Arrow Keys to move the paddle.", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gameState === GAMESTATE.GAMEOVER) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }

    }
    togglePause() {
        if(this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
    }
}