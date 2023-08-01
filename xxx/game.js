import { FrameRate } from "./frameRate.js";
import { InputHandler } from "./input.js";
import { Scenery } from "./scenery/scenery.js";

import { Background } from "./background.js";

export const GAME_SETTINGS = {
  width: 1800,
  height: 800,
};

export const GROUND_COLOR = 10;
export const BLOCK_COLOR = 20;

export const GROUND_COALITION = `rgb(${GROUND_COLOR} 255 55)`;
export const BLOCK_COALITION = `rgb(${BLOCK_COLOR} 255 255)`;

import { Player } from "./player/player.js";
import { PLAYER_STATES } from "./player/playerState.js";

import { SkeletonSoldier } from "./enemies/skeletonSoldier/skeletonSoldier.js";
import { SnakeSoldier } from "./enemies/snakeSoldier/snakeSoldier.js";

export class Game {
  constructor(context, ctxGround) {
    this.framerate = new FrameRate(60);
    // this.framerate = new FrameRate(10);
    this.input = new InputHandler(this);
    this.context = context;
    this.contextGround = ctxGround;
    this.player = new Player(this);
    this.gravity = 10;
    this.velocity = 0;
    this.velocityY = 0;
    this.scenery = new Scenery(this);
    this.enemies = [new SnakeSoldier(this)];
    this.debugMode = true;

    this.background = new Background(this);
  }

  update() {
    // ativar bounce
    this.velocity = Math.floor((this.player.x - this.player.startX) / 50);
    // ativar bounce
    this.velocityY = Math.floor((this.player.y - this.player.startY) / 30);

    if (!this.velocityY) {
      // this.velocityY = this.player.y - this.player.startY;
    }

    this.background.update();

    this.scenery.update();
    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.checkCollision();
    this.enemies = this.enemies.filter((item) => !item.remove);
  }

  setVelocity(velocity) {
    // this.velocity = velocity;
    this.player.setX(this.player.x + velocity * -1);
  }

  setGravity(gravity) {
    this.gravity = gravity;
  }

  setVelocityY(velocityY) {
    this.velocityY = velocityY;
  }

  setVelocity(velocity) {
    setTimeout(() => {
      this.velocity = velocity;
    }, 500);

    this.player.setX(this.player.x + velocity * -1);
  }

  draw() {
    this.background.draw();

    this.scenery.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  checkCollision() {
    this.enemies.forEach((enemy) => {
      if (
        enemy.x < this.player.x + this.player.activeState.width &&
        enemy.x + enemy.activeState.width > this.player.x &&
        enemy.y < this.player.y + this.player.activeState.height &&
        enemy.y + enemy.activeState.height > this.player.y
      ) {
        if (
          this.player.activeState.state === PLAYER_STATES.JUMPING ||
          this.player.activeState.state === PLAYER_STATES.FALLING
        ) {
          // console.info(this.player.activeState.state);
          enemy.setHitAction();
        }

        // this.game.collisions.push(
        //   new CollitionAnimation(
        //     this.game,
        //     enemy.x + enemy.width * 0.5,
        //     enemy.y + enemy.height * 0.5
        //   )
        // );

        // if (
        //   this.currentState === this.PLAYER_STATES[4] ||
        //   this.currentState === this.PLAYER_STATES[5]
        // ) {
        //   this.game.score++;
        // } else {
        //   this.setState(6, 0);
        // }

        // this.game.score++;
      }
    });
  }
}
