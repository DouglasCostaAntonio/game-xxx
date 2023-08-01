import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateWalking extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.RUNNING);
    this.frameQty = 5;
    this.framerate = new FrameRate(11);

    this.images = {
      [POWER_UPS.NORMAL]: "playerWalkingNormal",
      [POWER_UPS.FIRE]: "playerWalkingFire",
    };

    this.setImage();
  }

  handleInput() {
    super.handleInput();

    if (this.input.keys.includes("ArrowUp")) {
      this.player.setState(PLAYER_STATES.JUMPING);
    }

    if (
      !this.input.keys.includes("ArrowRight") &&
      !this.input.keys.includes("ArrowLeft")
    ) {
      this.game.setVelocity(0);
      this.player.setState(PLAYER_STATES.IDLE);
    }

    if (
      this.input.keys.includes("ArrowRight") &&
      !this.player.facingWallRight()
    ) {
      this.game.setVelocity(-5);
    }

    if (
      this.input.keys.includes("ArrowLeft") &&
      !this.player.facingWallLeft()
    ) {
      this.game.setVelocity(5);
    }
  }

  start() {
    super.start();
    this.player.flaying = false;
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }
}
