import { FrameRate } from "../../frameRate.js";

import { SkeletonSoldierStateIdle } from "./skeletonSoldierStateIdle.js";
import { SkeletonSoldierStateRunning } from "./skeletonSoldierStateRunning.js";
import { SkeletonSoldierStateFalling } from "./skeletonSoldierStateFalling.js";
import { SkeletonSoldierStateHit } from "./skeletonSoldierStateHit.js";
import { SkeletonSoldierStateAtack } from "./skeletonSoldierStateAtack.js";

import { STATES } from "./skeletonSoldierState.js";

import { GAME_SETTINGS, BLOCK_COLOR } from "../../game.js";

export class SkeletonSoldier {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.contextGround = game.contextGround;
    this.input = game.input;
    this.jumpForce = 0;
    this.remove = false;

    this.range = 150;

    this.states = [
      new SkeletonSoldierStateIdle(this),
      new SkeletonSoldierStateRunning(this),
      new SkeletonSoldierStateFalling(this),
      new SkeletonSoldierStateHit(this),
      new SkeletonSoldierStateAtack(this),
    ];

    this.setState(STATES.skeletonSoldierIdle);

    this.width = 143;
    this.collisionWidth = 113;
    this.offsetLeft = 15;
    this.offsetRight = 0;

    this.height = 100;
    this.x = 1500;
    this.y = GAME_SETTINGS.height - this.height - 650;
  }

  setHitAction() {
    this.setState(STATES.skeletonSoldierHit);
  }

  setState(state) {
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
    if (
      !this.onGround() &&
      this.activeState.state !== STATES.skeletonSoldierHit
    ) {
      this.setState(STATES.skeletonSoldierFalling);
      //this.x += this.game.velocity;
    } else if (
      this.activeState.state !== STATES.skeletonSoldierHit &&
      this.activeState.state === STATES.skeletonSoldierFalling
    ) {
      // this.x += -2.5 + this.game.velocity;
      // this.x += this.game.velocity;
      // this.setState(STATES.skeletonSoldierRunning);
      this.setState(STATES.skeletonSoldierIdle);
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
