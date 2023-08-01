import { FrameRate } from "../frameRate.js";
import { PlayerState, PLAYER_STATES, POWER_UPS } from "./playerState.js";

export class PlayerStateAttackThree extends PlayerState {
  constructor(player) {
    super(player, PLAYER_STATES.ATTACK_THREE);
    this.frameQty = 6;
    this.framerate = new FrameRate(10);

    this.images = {
      [POWER_UPS.NORMAL]: "playerAttackThreeNormal",
      [POWER_UPS.FIRE]: "playerAttackThreeFire",
    };

    this.setImage();
  }

  handleInput() {
    super.handleInput();

    if (this.frameX === this.frameQty) {
      if (this.input.keys.includes("z")) {
        this.frameX = 0;
        return;
      }

      this.game.setVelocity(0);

      this.player.setPowerUp(POWER_UPS.NORMAL);

      this.player.setState(PLAYER_STATES.IDLE);
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

    if (this.frameX > 2) {
      const dash = this.player.direction ? 10 : -10;
      this.game.setVelocity(dash);
    }
  }
}
