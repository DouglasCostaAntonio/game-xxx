import { FrameRate } from "../../frameRate.js";
import { KoopaState, STATES } from "./koopaState.js";

export class KoopaStateIdle extends KoopaState {
  constructor(koopa) {
    super(STATES.koopaIdle, koopa);
    this.width = 48;
    this.height = 81;
    this.frameQty = 1;
    this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(4);
  }

  // handleInput() {
  //   if (
  //     this.input.keys.includes("ArrowRight") ||
  //     this.input.keys.includes("ArrowLeft")
  //   ) {
  //     this.koopa.setState(STATES.koopaRunning);
  //   }

  //   // if (this.input.keys.includes("ArrowUp")) {
  //   //   this.koopa.setState(STATES.normalJumping);
  //   // }
  // }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    // this.koopa.x += 5;
  }
}
