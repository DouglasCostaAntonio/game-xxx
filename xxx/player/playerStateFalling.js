import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateFalling extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.FALLING);
    this.frameQty = 2;
    this.framerate = new FrameRate(11);

    this.images = {
      [POWER_UPS.NORMAL]: "playerFallNormal",
      [POWER_UPS.FIRE]: "playerFallFire",
    };

    this.setImage();
  }

  handleInput() {
    super.handleInput();
    if (
      !this.input.keys.includes("ArrowRight") &&
      !this.input.keys.includes("ArrowLeft")
    ) {
      this.game.setVelocity(0);
    }

    if (
      this.input.keys.includes("ArrowRight") &&
      !this.player.facingWallRight()
    ) {
      this.game.setVelocity(-5);
    } else {
      this.game.setVelocity(0);
    }

    if (
      this.input.keys.includes("ArrowLeft") &&
      !this.player.facingWallLeft()
    ) {
      this.game.setVelocity(5);
    }

    if (this.input.keys.includes("x")) {
      this.player.setState(PLAYER_STATES.ATTACK_ONE);
      this.player.flaying = true;
    }

    if (this.input.keys.includes("c")) {
      this.player.setState(PLAYER_STATES.ATTACK_TWO);
      this.player.flaying = true;
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
    this.gravityPower();
  }
}
