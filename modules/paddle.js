export default class Paddle {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 150;
        this.height = 30;
        // console.log(gameWidth);
        // console.log("Insied Paddle class");
        this.maxSpeed = 7;
        this.speed = 0;
        this.position = {
            x: ((game.gameWidth/2) - (this.width / 2)),
            y:  game.gameHeight - this.height - 10
        }
    }
    draw(context) {
        // console.log("Inside draw function");
        context.fillStyle = "#0ff";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime) {
        // deltaTime is change in time i.e how much time has changed since the last time this has been updated.
        // if(!deltaTime)  return;
        // this.position.x += 5 / deltaTime;
        this.position.x += this.speed;

        if(this.position.x < 0)     this.position.x = 0;
        // console.log(this.gameWidth);
        if(this.position.x + this.width > this.gameWidth)      this.position.x = this.gameWidth - this.width;
        
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
}