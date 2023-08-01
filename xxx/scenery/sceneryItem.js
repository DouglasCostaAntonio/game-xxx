// import { GROUND_COALITION } from "../game.js";

export class SceneryItem {
  constructor(game, prop) {
    this.game = game;
    this.remove = false;

    this.colition = prop.colition;
    this.colitionGround = prop.colitionGround;
    this.colitionWall = prop.colitionWall;

    this.frameX = prop.frameX;
    this.frameY = prop.frameY;

    this.x = prop.x;
    this.y = prop.y;

    this.width = prop.width;
    this.height = prop.height;

    this.image = document.getElementById(prop.imageId);
  }

  draw() {
    // this.drawColition();

    this.game.context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // drawColition() {
  //   if (!this.colition) return;

  //   this.game.contextGround.fillStyle = GROUND_COALITION;
  //   this.game.contextGround.fillRect(this.x, this.y, this.width, this.height);
  // }

  update() {
    this.x -= this.game.velocity;
    this.y -= this.game.velocityY;

    if (this.x < -50) {
      // this.remove = true;
    }
  }
}
