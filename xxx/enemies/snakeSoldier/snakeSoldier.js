import { FrameRate } from "../../frameRate.js";

import { SnakeSoldierStateIdle } from "./snakeSoldierStateIdle.js";
import { SnakeSoldierStateRunning } from "./snakeSoldierStateRunning.js";
import { SnakeSoldierStateFalling } from "./snakeSoldierStateFalling.js";
import { SnakeSoldierStateHit } from "./snakeSoldierStateHit.js";
import { SnakeSoldierStateAtack } from "./snakeSoldierStateAtack.js";
import { SnakeSoldierStateKaboom } from "./snakeSoldierStateKaboom.js";

import { SNAKE_STATES } from "./snakeSoldierState.js";

import { GAME_SETTINGS, BLOCK_COLOR } from "../../game.js";

export class SnakeSoldier {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.contextGround = game.contextGround;
    this.input = game.input;
    this.jumpForce = 0;
    this.remove = false;

    this.range = 200;

    this.states = {
      [SNAKE_STATES.IDLE]: new SnakeSoldierStateIdle(this),
      [SNAKE_STATES.RUNNING]: new SnakeSoldierStateRunning(this),
      [SNAKE_STATES.FALLING]: new SnakeSoldierStateFalling(this),
      [SNAKE_STATES.HIT]: new SnakeSoldierStateHit(this),
      [SNAKE_STATES.ATACK]: new SnakeSoldierStateAtack(this),
      [SNAKE_STATES.KABOOM]: new SnakeSoldierStateKaboom(this),
    };

    this.setState(SNAKE_STATES.IDLE);

    this.width = 90;
    this.height = 61;

    this.collisionWidth = 200;
    this.offsetLeft = -60;
    this.offsetRight = 0;

    this.x = 1500;
    this.y = GAME_SETTINGS.height - this.height - 650;
    this.frameY = 0;
  }

  setHitAction() {
    this.setState(SNAKE_STATES.HIT);
  }

  setState(state) {
    if (this.activeState && this.activeState.state === state) {
      return;
    }

    this.activeState = this.states[state];
    this.activeState.start();
  }

  debugHelper() {
    this.context.strokeRect(this.x, this.y, this.width, this.height);

    this.context.save();
    this.offsetRight;
    this.context.strokeStyle = "blue";
    this.context.strokeRect(
      this.x +
        (this.direction ? this.offsetRight + this.offsetLeft : this.offsetLeft),
      this.y,
      this.collisionWidth,
      this.height
    );
    this.context.restore();

    this.context.save();
    this.context.strokeStyle = "red";
    this.context.strokeRect(
      this.x - this.range,
      this.y,
      this.width + 2 * this.range,
      this.height
    );

    this.context.restore();
  }

  draw() {
    this.activeState.draw();
    if (this.game.debugMode) {
      this.debugHelper();
    }
  }

  update() {
    if (!this.onGround() && this.activeState.state !== SNAKE_STATES.HIT) {
      this.setState(SNAKE_STATES.FALLING);
      //this.x += this.game.velocity;
    } else if (
      this.activeState.state !== SNAKE_STATES.HIT &&
      this.activeState.state === SNAKE_STATES.FALLING
    ) {
      // this.x += -2.5 + this.game.velocity;
      // this.x += this.game.velocity;
      // this.setState(SNAKE_STATES.snakeSoldierRunning);
      this.setState(SNAKE_STATES.IDLE);
    }
    this.x -= this.game.velocity;
    this.y -= this.game.velocityY;

    // if (this.y > 800) {
    //   this.remove = true;
    // }

    this.activeState.update();
  }

  onGround() {
    const sceneries = this.game.scenery.sceneries.filter(
      (scenery) => scenery.colitionGround
    );
    let isOnGround = false;

    sceneries.forEach((scenery) => {
      if (
        scenery.x < this.x + this.offsetLeft + this.collisionWidth &&
        scenery.x + scenery.width > this.x + this.offsetLeft &&
        scenery.y < this.y + this.height &&
        scenery.y + scenery.height > this.y
      ) {
        this.y = scenery.y - this.height + 1;
        isOnGround = true;
      }
    });

    return isOnGround;
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
}
