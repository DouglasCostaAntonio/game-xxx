import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateStanding extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.normalIdle);
    this.frameQty = 5;
    this.framerate = new FrameRate(9);

    this.images = {
      [POWER_UPS.NORMAL]: "playerStandingNormal",
      [POWER_UPS.FIRE]: "playerStandingFire",
    };

    this.setImage();
  }

  handleInput() {
    super.handleInput();

    if (
      this.input.keys.includes("ArrowRight") ||
      this.input.keys.includes("ArrowLeft")
    ) {
      this.player.setState(PLAYER_STATES.RUNNING);
    }

    if (this.input.keys.includes("ArrowUp")) {
      this.player.setState(PLAYER_STATES.JUMPING);
    }

    if (this.input.keys.includes("x")) {
      this.player.setState(PLAYER_STATES.ATTACK_ONE);
    }

    if (this.input.keys.includes("c")) {
      this.player.setState(PLAYER_STATES.ATTACK_TWO);
    }

    if (this.input.keys.includes("z")) {
      this.player.setState(PLAYER_STATES.ATTACK_THREE);
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
