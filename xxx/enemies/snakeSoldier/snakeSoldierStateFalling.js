import { FrameRate } from "../../frameRate.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateFalling extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.FALLING, snakeSoldier);
    this.frameQty = 1;
    // this.frameY = 1;
    this.image = document.getElementById("snakeSoldierIdle");
    this.framerate = new FrameRate(4);
  }

  start() {}

  draw() {
    super.draw();
  }

  update() {
    super.update();

    this.gravityPower();
  }

  gravityPower() {
    if (this.snakeSoldier.jumpForce < 15) {
      this.snakeSoldier.jumpForce += 0.7;
    }

    this.snakeSoldier.y += this.snakeSoldier.jumpForce;

    if (this.snakeSoldier.onGround() && this.snakeSoldier.jumpForce > 0) {
      this.snakeSoldier.jumpForce = 0;
      this.snakeSoldier.setState(SNAKE_STATES.IDLE);
    }
  }
}
