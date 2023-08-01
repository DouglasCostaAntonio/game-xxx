import { FrameRate } from "../../frameRate.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateKaboom extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.KABOOM, snakeSoldier);
    this.frameQty = 4;
    this.image = document.getElementById("kaboom");
    this.framerate = new FrameRate(6);
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    if (this.frameX === this.frameQty) {
      this.snakeSoldier.remove = true;
    }
  }
}
