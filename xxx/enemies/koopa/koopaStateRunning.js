import { FrameRate } from "../../frameRate.js";
import { KoopaState, STATES } from "./koopaState.js";

export class KoopaStateRunning extends KoopaState {
  constructor(koopa) {
    super(STATES.koopaRunning, koopa);
    this.width = 48;
    this.height = 81;
    this.frameQty = 1;
    this.frameY = 1;
    this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(6);
  }

  // handleInput() {
  //   // if (this.input.keys.includes("ArrowUp")) {
  //   //   this.koopa.setState(STATES.normalJumping);
  //   // }

  //   if (
  //     !this.input.keys.includes("ArrowRight") &&
  //     !this.input.keys.includes("ArrowLeft")
  //   ) {
  //     this.koopa.game.velocity = 0;

  //     this.koopa.setState(STATES.koopaIdle);
  //   }

  //   if (
  //     this.input.keys.includes("ArrowRight") &&
  //     !this.koopa.facingWallRight()
  //   ) {
  //     this.koopa.game.velocity = -5;
  //   } else {
  //     this.koopa.game.velocity = 0;
  //   }

  //   if (this.input.keys.includes("ArrowLeft") && !this.koopa.facingWallLeft()) {
  //     this.koopa.game.velocity = 5;
  //   }
  // }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }
}
