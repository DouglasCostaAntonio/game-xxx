import { FrameRate } from "../../frameRate.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateAtack extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.ATACK, snakeSoldier);
    this.frameQty = 10;
    this.image = document.getElementById("snakeSoldierAtack");
    this.framerate = new FrameRate(6);
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();

    if (this.frameX > 4) {
      if (this.snakeSoldier.frameY === 0) {
        this.snakeSoldier.x -= 6;
      } else {
        this.snakeSoldier.x += 6;
      }
    }

    if (this.frameX === this.frameQty) {
      this.snakeSoldier.setState(SNAKE_STATES.IDLE);
      this.frameX = 0;
    }
  }
}
