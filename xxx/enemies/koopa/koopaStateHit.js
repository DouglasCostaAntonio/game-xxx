import { FrameRate } from "../../frameRate.js";
import { KoopaState, STATES } from "./koopaState.js";

export class KoopaStateHit extends KoopaState {
  constructor(koopa) {
    super(STATES.koopaHit, koopa);
    this.width = 48;
    this.height = 81;
    this.frameQty = 1;
    this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(4);
  }

  draw() {
    super.draw();
  }

  start() {
    this.koopa.jumpForce = -8;
  }

  update() {
    super.update();

    // if (this.koopa.onGround()) {
    //   this.koopa.jumpForce = 0;

    //   if (
    //     this.input.keys.includes("ArrowRight") ||
    //     this.input.keys.includes("ArrowLeft")
    //   ) {
    //     this.koopa.setState(STATES.koopaRunning);
    //   }

    //   if (this.input.keys.includes("ArrowUp")) {
    //     this.koopa.setState(STATES.normalJumping);
    //   }

    //   if (
    //     !this.input.keys.includes("ArrowRight") &&
    //     !this.input.keys.includes("ArrowLeft") &&
    //     !this.input.keys.includes("ArrowUp")
    //   ) {
    //     this.koopa.setState(STATES.koopaIdle);
    //   }
    // }

    if (this.koopa.jumpForce < 10) {
      this.koopa.jumpForce += 0.5;
    } else {
      this.koopa.jumpForce = 10;
    }

    this.koopa.y += this.koopa.jumpForce;
  }
}
