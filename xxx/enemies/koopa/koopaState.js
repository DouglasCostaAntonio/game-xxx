import { FrameRate } from "../../frameRate.js";

export const STATES = {
  koopaIdle: 0,
  koopaRunning: 1,
  koopaFalling: 2,
  koopaHit: 3,
};

export class KoopaState {
  constructor(state, koopa) {
    this.width = 48;
    this.height = 84;
    this.frameX = 0;
    this.frameQty = 2;
    this.frameY = 0; //orientation 0 = forward, 1 = back
    // this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(11);
    this.context = koopa.context;
    this.input = koopa.input;
    this.koopa = koopa;
    this.state = state;
  }
  start() {}

  draw() {
    // context.drawImage(this.image, 0, 0);
    this.context.drawImage(
      this.image,
      // this.frameX,
      // frameY,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.koopa.x,
      this.koopa.y,
      this.width,
      this.height
    );
  }

  update() {
    // this.#setOrientation();

    // this.koopa.x += 5;
    if (this.framerate.nextFrame()) {
      if (this.frameX < this.frameQty) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  handleInput() {}

  #setOrientation() {
    if (this.input.keys.includes("ArrowRight")) {
      this.frameY = 2; // forward
    } else if (this.input.keys.includes("ArrowLeft")) {
      this.frameY = 1; // back
    }
  }
}
