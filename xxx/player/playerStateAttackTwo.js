import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateAttackTwo extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.ATTACK_TWO);
    this.frameQty = 5;
    this.framerate = new FrameRate(8);

    this.images = {
      [POWER_UPS.NORMAL]: "playerAttackTwoNormal",
      [POWER_UPS.FIRE]: "playerAttackTwoFire",
    };

    this.setImage();
  }

  handleInput() {
    super.handleInput();

    /** */
    if (this.player.jumpForce !== 0) {
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
    }
    /** */

    if (this.frameX === this.frameQty) {
      if (this.input.keys.includes("c")) {
        this.frameX = 0;
        return;
      }
      this.player.setPowerUp(POWER_UPS.NORMAL);

      if (this.player.jumpForce === 0) {
        this.player.setState(PLAYER_STATES.IDLE);
      } else if (this.player.jumpForce > 0) {
        this.player.setState(PLAYER_STATES.FALLING);
      } else if (this.player.jumpForce < 0) {
        this.player.setState(PLAYER_STATES.JUMPING);
      }
    }
  }

  start() {
    super.start();
    this.frameX = 0;
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();

    if (this.player.jumpForce != 0) {
      this.gravityPower();
    }
  }
}
