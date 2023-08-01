import { FrameRate } from "../frameRate.js";

import { PlayerStateStanding } from "./playerStateStanding.js";
import { PlayerStateWalking } from "./playerStateWalking.js";
import { PlayerStateJumping } from "./playerStateJumping.js";
import { PlayerStateFalling } from "./playerStateFalling.js";
import { PlayerStateAttackOne } from "./playerStateAttackOne.js";
import { PlayerStateAttackTwo } from "./playerStateAttackTwo.js";
import { PlayerStateAttackThree } from "./playerStateAttackThree.js";

import { PLAYER_STATES, POWER_UPS } from "./playerState.js";

import { GAME_SETTINGS, BLOCK_COLOR } from "../game.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.contextGround = game.contextGround;
    this.input = game.input;
    this.jumpForce = 0;
    this.direction = 0; //orientation 0 = forward, 1 = back
    this.powerUp = POWER_UPS.NORMAL; //power 0 = normal, 2 = fire
    this.flaying = false;

    this.mask = document.querySelector(".mask");

    this.states = {
      [PLAYER_STATES.IDLE]: new PlayerStateStanding(this),
      [PLAYER_STATES.RUNNING]: new PlayerStateWalking(this),
      [PLAYER_STATES.JUMPING]: new PlayerStateJumping(this),
      [PLAYER_STATES.FALLING]: new PlayerStateFalling(this),
      [PLAYER_STATES.ATTACK_ONE]: new PlayerStateAttackOne(this),
      [PLAYER_STATES.ATTACK_TWO]: new PlayerStateAttackTwo(this),
      [PLAYER_STATES.ATTACK_THREE]: new PlayerStateAttackThree(this),
    };

    this.setState(PLAYER_STATES.IDLE);

    this.x = GAME_SETTINGS.width / 4;
    this.y = 350;

    this.startX = GAME_SETTINGS.width / 4;
    this.startY = 400;

    this.width = 376;
    this.height = 140;
    this.collisionWidth = 75;
    this.offsetLeft = 150;
    this.offsetRight = 0;

    this.atackRange = 75;
  }

  setPowerUp(powerUp) {
    this.powerUp = powerUp;
  }

  getCollisionCoordinate() {
    return {
      xStart: this.x + this.offsetLeft,
      xEnd: this.x + this.offsetLeft + this.collisionWidth,
    };
  }

  setState(state) {
    this.activeState = this.states[state];
    this.activeState.start();
  }

  setX(x) {
    this.x = x;
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
    // atack

    this.context.save();
    this.offsetRight;
    this.context.strokeStyle = "green";
    this.context.strokeRect(
      this.x +
        (this.direction
          ? this.offsetRight + this.offsetLeft
          : this.offsetLeft) +
        this.atackRange,
      this.y,
      this.atackRange,
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
    this.x -= this.game.velocity;
    this.y -= this.game.velocityY;

    if (!this.onGround() && !this.flaying) {
      this.setState(PLAYER_STATES.FALLING);
    }

    this.activeState.handleInput();
    this.activeState.update();

    // light
    if (this.mask) {
      if (this.powerUp === POWER_UPS.FIRE) {
        this.mask.style.setProperty("--mouse-x", this.x + 200 + "px");
        this.mask.style.setProperty("--mouse-y", this.y + 75 + "px");
      } else {
        this.mask.style.setProperty("--mouse-x", this.x + 2000 + "px");
        this.mask.style.setProperty("--mouse-y", this.y + 75 + "px");
      }
    }

    if (this.input.keys.includes("l")) {
      this.mask.hidden = !this.mask.hasAttribute("hidden");
    }
    //
  }

  onGround() {
    if (this.jumpForce < 0) {
      return false;
    }

    const sceneries = this.game.scenery.sceneries.filter(
      (scenery) => scenery.colitionGround
    );

    let isOnGround = false;

    sceneries.forEach((scenery) => {
      if (
        scenery.x < this.x + this.offsetLeft + this.collisionWidth &&
        scenery.x + scenery.width > this.x + this.offsetLeft &&
        (scenery.y < this.y + this.height - 20 ||
          scenery.y < this.y + this.height) &&
        scenery.y + scenery.height > this.y + this.height + scenery.height - 20
        // scenery.y - scenery.height - 30 > this.y
        // scenery.y + scenery.height > this.y
      ) {
        this.y = scenery.y - this.height + 1;
        isOnGround = true;
      }
    });

    return isOnGround;
  }

  onGroundXxx() {
    if (this.jumpForce < 0) {
      return false;
    }

    const sceneries = this.game.scenery.sceneries.filter(
      (scenery) => scenery.colitionGround
    );

    let isOnGround = false;

    sceneries.forEach((scenery) => {
      if (scenery.width != 150) {
        if (
          scenery.y < this.y + this.height &&
          scenery.y - scenery.height > this.y
        ) {
          console.info({
            "scenery.y:": scenery.y,
            "scenery.height:": scenery.height,
            "this.y:": this.y,
            "this.height:": this.height,
          });
        }
      }
      if (
        scenery.x < this.x + this.offsetLeft + this.collisionWidth &&
        scenery.x + scenery.width > this.x + this.offsetLeft &&
        scenery.y < this.y + this.height &&
        scenery.y - scenery.height > this.y
        // scenery.y - scenery.height - 30 > this.y
        // scenery.y + scenery.height > this.y
      ) {
        this.y = scenery.y - this.height + 1;
        isOnGround = true;
      }
    });

    return isOnGround;
  }

  facingWallRight() {
    let isOnGround = false;

    const sceneries = this.game.scenery.sceneries.filter(
      (scenery) => scenery.colitionWall
    );

    sceneries.forEach((scenery) => {
      if (
        scenery.x < this.x + 5 + this.offsetLeft + this.collisionWidth && // +5 is the offset to avoid conflicts
        scenery.x + scenery.width > this.x + this.offsetLeft &&
        scenery.y + 1 < this.y + this.height && // +1 is the offset to avoid conflicts
        scenery.y + scenery.height > this.y
      ) {
        isOnGround = true;
      }
    });

    return isOnGround;
  }

  facingWallLeft() {
    let isOnGround = false;

    const sceneries = this.game.scenery.sceneries.filter(
      (scenery) => scenery.colitionWall
    );

    sceneries.forEach((scenery) => {
      if (
        scenery.x < this.x + this.offsetLeft + this.collisionWidth &&
        scenery.x + 5 + scenery.width > this.x + this.offsetLeft && // +5 is the offset to avoid conflicts
        scenery.y + 1 < this.y + this.height && // +1 is the offset to avoid conflicts
        scenery.y + scenery.height > this.y
      ) {
        isOnGround = true;
      }
    });

    return isOnGround;
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
