import { FrameRate } from "../../frameRate.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateRunning extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.RUNNING, snakeSoldier);
    this.frameQty = 5;
    this.image = document.getElementById("snakeSoldierIdle");
    this.framerate = new FrameRate(6);
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }
}
