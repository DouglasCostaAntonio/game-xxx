import { FrameRate } from "../../frameRate.js";

import { KoopaStateIdle } from "./koopaStateIdle.js";
import { KoopaStateRunning } from "./koopaStateRunning.js";
import { KoopaStateFalling } from "./koopaStateFalling.js";
import { KoopaStateHit } from "./koopaStateHit.js";

import { STATES } from "./koopaState.js";

import { GAME_SETTINGS, BLOCK_COLOR } from "../../game.js";

export class Koopa {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.contextGround = game.contextGround;
    this.input = game.input;
    this.jumpForce = 0;
    this.remove = false;

    this.states = [
      new KoopaStateIdle(this),
      new KoopaStateRunning(this),
      new KoopaStateFalling(this),
      new KoopaStateHit(this),
    ];

    this.setState(STATES.koopaIdle);
    // this.setState(STATES.koopaHit);

    this.x = 1300;
    this.y = GAME_SETTINGS.height - this.activeState.height - 650;

    // this.x = 1000;
    // this.y = GAME_SETTINGS.height - this.activeState.height - 100;
  }

  setHitAction() {
    this.setState(STATES.koopaHit);
  }

  setState(state) {
    this.activeState = this.states[state];
    this.activeState.start();
  }

  draw() {
    this.activeState.draw();
    this.context.strokeRect(
      this.x,
      this.y,
      this.activeState.width,
      this.activeState.height
    );
  }

  update() {
    if (!this.onGround() && this.activeState.state !== STATES.koopaHit) {
      this.setState(STATES.koopaFalling);
      this.x += this.game.velocity;
    } else if (this.activeState.state !== STATES.koopaHit) {
      this.x += -2.5 + this.game.velocity;
      // this.x += this.game.velocity;
      this.setState(STATES.koopaRunning);
    }

    if (this.y > 800) {
      this.remove = true;
    }

    this.activeState.update();
  }

  onGround() {
    const detectPixelColorLeft = this.contextGround.getImageData(
      this.x + 5, // 5 to avoid wall
      this.y + 84,
      1,
      1
    );

    const detectPixelColorRight = this.contextGround.getImageData(
      this.x + 48 - 5, // 5 to avoid wall
      this.y + 84,
      1,
      1
    );
    return !!detectPixelColorRight.data[0] || !!detectPixelColorLeft.data[0];
  }

  facingWallRight() {
    const detectPixelColorRightBottom = this.contextGround.getImageData(
      this.x + 48 + 5, // velocity to fix colition
      this.y + 84,
      1,
      1
    );

    const detectPixelColorRightTop = this.contextGround.getImageData(
      this.x + 48 + 5, // velocity to fix colition
      this.y,
      1,
      1
    );

    return (
      !!detectPixelColorRightBottom.data[0] &&
      !!detectPixelColorRightTop.data[0]
    );
  }

  facingWallLeft() {
    const detectPixelColorRightBottom = this.contextGround.getImageData(
      this.x - 5, // velocity to fix colition
      this.y + 84,
      1,
      1
    );

    const detectPixelColorRightTop = this.contextGround.getImageData(
      this.x - 5, // velocity to fix colition
      this.y,
      1,
      1
    );

    return (
      !!detectPixelColorRightBottom.data[0] &&
      !!detectPixelColorRightTop.data[0]
    );
  }

  hitBlock() {
    const detectPixelColorLeft = this.contextGround.getImageData(
      this.x + 5, // 5 to avoid wall
      this.y, // + 84,
      1,
      1
    );

    const detectPixelColorRight = this.contextGround.getImageData(
      this.x + 48 - 5, // 5 to avoid wall
      this.y, // + 84,
      1,
      1
    );

    return (
      detectPixelColorRight.data[0] === BLOCK_COLOR ||
      detectPixelColorLeft.data[0] === BLOCK_COLOR
    );
  }
}
