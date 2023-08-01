import { FrameRate } from "../../frameRate.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateIdle extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.IDLE, snakeSoldier);
    this.frameQty = 0;
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
