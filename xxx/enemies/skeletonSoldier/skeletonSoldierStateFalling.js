import { FrameRate } from "../../frameRate.js";
import { SkeletonSoldierState, STATES } from "./skeletonSoldierState.js";

export class SkeletonSoldierStateFalling extends SkeletonSoldierState {
  constructor(skeletonSoldier) {
    super(STATES.skeletonSoldierFalling, skeletonSoldier);
    this.frameQty = 1;
    this.frameY = 1;
    this.image = document.getElementById("soldierSkeletonIdle");
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
    if (this.skeletonSoldier.jumpForce < 15) {
      this.skeletonSoldier.jumpForce += 0.7;
    }

    this.skeletonSoldier.y += this.skeletonSoldier.jumpForce;

    if (this.skeletonSoldier.onGround() && this.skeletonSoldier.jumpForce > 0) {
      this.skeletonSoldier.jumpForce = 0;
      this.skeletonSoldier.setState(STATES.skeletonSoldierIdle);
    }
  }
}
