import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateJumping extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.JUMPING);
    this.frameQty = 2;
    this.framerate = new FrameRate(11);

    this.images = {
      [POWER_UPS.NORMAL]: "playerJumpNormal",
      [POWER_UPS.FIRE]: "playerJumpFire",
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
    }

    if (
      this.input.keys.includes("ArrowLeft") &&
      !this.player.facingWallLeft()
    ) {
      this.game.setVelocity(5);
    }

    if (this.input.keys.includes("x")) {
      this.player.setState(PLAYER_STATES.ATTACK_ONE);
    }
    if (this.input.keys.includes("c")) {
      this.player.setState(PLAYER_STATES.ATTACK_TWO);
    }
  }

  start() {
    super.start();
    this.player.flaying = true;

    if (this.player.jumpForce === 0) {
      this.player.jumpForce = -18;
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    this.gravityPower();
  }
}
