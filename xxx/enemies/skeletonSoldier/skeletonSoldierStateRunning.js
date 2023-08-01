import { FrameRate } from "../../frameRate.js";
import { SkeletonSoldierState, STATES } from "./skeletonSoldierState.js";

export class SkeletonSoldierStateRunning extends SkeletonSoldierState {
  constructor(skeletonSoldier) {
    super(STATES.skeletonSoldierRunning, skeletonSoldier);
    this.frameQty = 3;
    this.frameY = 1;
    this.image = document.getElementById("soldierSkeletonWalking");
    this.framerate = new FrameRate(6);
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }
}
