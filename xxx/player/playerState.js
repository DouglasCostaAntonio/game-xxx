import { FrameRate } from "../frameRate.js";

export const PLAYER_STATES = {
  IDLE: "idle",
  RUNNING: "running",
  JUMPING: "jumping",
  FALLING: "falling",
  ATTACK_ONE: "attackOne",
  ATTACK_TWO: "attackTwo",
  ATTACK_THREE: "attackThree",
};

export const POWER_UPS = {
  NORMAL: "normal",
  FIRE: "fire",
};

export class PlayerState {
  constructor(player, state) {
    this.game = player.game;

    this.frameX = 0;
    this.frameQty = 2;
    this.image = document.getElementById("playerNormalRunning");
    this.framerate = new FrameRate(11);
    this.context = player.context;
    this.input = player.input;
    this.player = player;
    this.state = state;

    this.images = {};
  }

  setImage() {
    this.image = document.getElementById(this.images[this.player.powerUp]);
  }

  start() {
    this.setImage();
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.player.width * this.frameX,
      this.player.height * this.player.direction,
      this.player.width,
      this.player.height,
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
  }

  update() {
    if (this.framerate.nextFrame()) {
      if (this.frameX < this.frameQty) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  handleInput() {
    this.#setOrientation();

    if (this.input.keys.includes("f")) {
      this.player.setPowerUp(POWER_UPS.FIRE);
      this.setImage();
    }

    if (this.input.keys.includes("n")) {
      this.player.setPowerUp(POWER_UPS.NORMAL);
      this.setImage();
    }
  }

  #setOrientation() {
    if (this.input.keys.includes("ArrowRight")) {
      this.player.direction = 0; // forward
    } else if (this.input.keys.includes("ArrowLeft")) {
      this.player.direction = 1; // back
    }
  }

  gravityPower() {
    if (this.player.jumpForce < 15) {
      this.player.jumpForce += 0.7;
    }

    this.player.y += this.player.jumpForce;

    if (this.player.onGround() && this.player.jumpForce > 0) {
      this.player.jumpForce = 0;

      this.player.setState(PLAYER_STATES.IDLE);
    }

    if (this.player.hitBlock() && this.player.jumpForce < 0) {
      this.player.jumpForce = 4;
    }
  }
}
