import { FrameRate } from "../../frameRate.js";
import { SkeletonSoldierState, STATES } from "./skeletonSoldierState.js";

export class SkeletonSoldierStateAtack extends SkeletonSoldierState {
  constructor(skeletonSoldier) {
    super(STATES.skeletonSoldierAtack, skeletonSoldier);
    this.frameQty = 3;
    this.frameY = 0;
    this.image = document.getElementById("soldierSkeletonAtack");
    this.framerate = new FrameRate(6);
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }
}
