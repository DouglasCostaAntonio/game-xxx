import { FrameRate } from "../../frameRate.js";
import { POWER_UPS } from "../../player/playerState.js";
import { SnakeSoldierState, SNAKE_STATES } from "./snakeSoldierState.js";

export class SnakeSoldierStateHit extends SnakeSoldierState {
  constructor(snakeSoldier) {
    super(SNAKE_STATES.HIT, snakeSoldier);
    this.frameQty = 2;
    this.image = document.getElementById("snakeSoldierHit");
    this.framerate = new FrameRate(4);
    this.hits = 0;
  }

  draw() {
    super.draw();
  }

  start() {
    // this.snakeSoldier.jumpForce = -8;
    console.info();
    if (this.snakeSoldier.game.player.powerUp === POWER_UPS.FIRE) {
      this.hits = 2;
    }
    this.hits++;
  }

  update() {
    super.update();
    if (this.hits >= 2) {
      this.snakeSoldier.setState(SNAKE_STATES.KABOOM);
      return;
    }
    if (this.frameX === this.frameQty) {
      this.snakeSoldier.setState(SNAKE_STATES.RUNNING);

      this.frameX = 0;
      // this.hits++;

      // if (this.hits > 2) {
      //   this.snakeSoldier.remove = true;
      // }
    }
  }

  update2() {
    super.update();

    if (this.frameX === this.frameQty) {
      console.info(this.hits);
      this.snakeSoldier.setState(SNAKE_STATES.RUNNING);
      this.frameX = 0;
      this.hits++;
      if (this.hits > 2) {
        this.snakeSoldier.remove = true;
      }
    }
  }
}
