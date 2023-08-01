import { FrameRate } from "../../frameRate.js";
import { SkeletonSoldierState, STATES } from "./skeletonSoldierState.js";

export class SkeletonSoldierStateHit extends SkeletonSoldierState {
  constructor(skeletonSoldier) {
    super(STATES.skeletonSoldierHit, skeletonSoldier);
    this.frameQty = 1;
    this.frameY = 1;
    this.image = document.getElementById("soldierSkeletonIdle");
    this.framerate = new FrameRate(4);
  }

  draw() {
    super.draw();
  }

  start() {
    this.skeletonSoldier.jumpForce = -8;
  }

  update() {
    super.update();

    if (this.skeletonSoldier.jumpForce < 10) {
      this.skeletonSoldier.jumpForce += 0.5;
    } else {
      this.skeletonSoldier.jumpForce = 10;
    }

    this.skeletonSoldier.y += this.skeletonSoldier.jumpForce;
  }
}
