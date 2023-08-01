import { FrameRate } from "../../frameRate.js";
import { PLAYER_STATES } from "../../player/playerState.js";

export const SNAKE_STATES = {
  IDLE: "Idle",
  RUNNING: "Running",
  FALLING: "Falling",
  HIT: "Hit",
  ATACK: "Atack",
  KABOOM: "Kaboom",
};

export class SnakeSoldierState {
  constructor(state, snakeSoldier) {
    this.frameX = 0;
    this.frameQty = 2;
    // this.snakeSoldier.frameY = 0; //orientation 0 = forward, 1 = back
    // this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(11);
    this.context = snakeSoldier.context;
    this.input = snakeSoldier.input;
    this.snakeSoldier = snakeSoldier;
    this.state = state;
  }
  start() {}

  draw() {
    // context.drawImage(this.image, 0, 0);
    this.context.drawImage(
      this.image,
      // this.frameX,
      // snakeSoldier.frameY,
      this.snakeSoldier.width * this.frameX,
      this.snakeSoldier.height * this.snakeSoldier.frameY,
      this.snakeSoldier.width,
      this.snakeSoldier.height,
      this.snakeSoldier.x,
      this.snakeSoldier.y,
      this.snakeSoldier.width,
      this.snakeSoldier.height
    );
  }

  update() {
    if (
      this.snakeSoldier.activeState.state !== SNAKE_STATES.ATACK &&
      this.snakeSoldier.activeState.state !== SNAKE_STATES.KABOOM &&
      this.snakeSoldier.activeState.state !== SNAKE_STATES.HIT
    ) {
      this.#seekHero();
    }
    this.#ataqued();

    if (this.framerate.nextFrame()) {
      if (this.frameX < this.frameQty) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  handleInput() {}

  #seekHero() {
    const playerX = this.snakeSoldier.game.player.getCollisionCoordinate();
    const enemyDiffEnd = this.snakeSoldier.x - playerX.xEnd - 2;

    if (
      enemyDiffEnd <= this.snakeSoldier.range &&
      enemyDiffEnd > -this.snakeSoldier.offsetLeft // sub atack zone
    ) {
      this.snakeSoldier.frameY = 0;
      this.snakeSoldier.x -= 2;

      if (this.snakeSoldier.activeState.state === SNAKE_STATES.IDLE) {
        this.snakeSoldier.setState(SNAKE_STATES.RUNNING);
      }
      return;
    }

    const enemyDiffStart =
      2 * this.snakeSoldier.offsetLeft +
      this.snakeSoldier.x +
      this.snakeSoldier.collisionWidth -
      playerX.xStart;

    if (
      enemyDiffStart >= -this.snakeSoldier.range &&
      enemyDiffStart < this.snakeSoldier.offsetLeft // plus atack zone
    ) {
      this.snakeSoldier.frameY = 1;
      this.snakeSoldier.x += 2;

      if (this.snakeSoldier.activeState.state === SNAKE_STATES.IDLE) {
        this.snakeSoldier.setState(SNAKE_STATES.RUNNING);
      }
      return;
    }

    if (this.snakeSoldier.activeState.state === SNAKE_STATES.RUNNING) {
      this.snakeSoldier.setState(SNAKE_STATES.ATACK);
    }
  }

  #ataqued() {
    const playerX = this.snakeSoldier.game.player.getCollisionCoordinate();
    const enemyDiffEnd = this.snakeSoldier.x - playerX.xEnd;

    const { player } = this.snakeSoldier.game;

    if (
      !(
        this.snakeSoldier.y < player.y + player.height &&
        this.snakeSoldier.y + this.snakeSoldier.height > player.y
      )
    ) {
      return;
    }

    if (
      playerX.xStart < this.snakeSoldier.x + this.snakeSoldier.width / 2 - 40 &&
      playerX.xEnd + player.atackRange - 15 > this.snakeSoldier.x
    ) {
      if (
        [
          PLAYER_STATES.ATTACK_ONE,
          PLAYER_STATES.ATTACK_TWO,
          PLAYER_STATES.ATTACK_THREE,
        ].includes(player.activeState.state) &&
        SNAKE_STATES.HIT !== this.snakeSoldier.activeState.state &&
        SNAKE_STATES.KABOOM !== this.snakeSoldier.activeState.state
      ) {
        this.snakeSoldier.setState(SNAKE_STATES.HIT);
      }
    }

    // console.info(
    //   playerX.xStart <
    //     this.snakeSoldier.x + this.snakeSoldier.width / 2 - 40 &&
    //     playerX.xEnd + player.atackRange - 15 > this.snakeSoldier.x
    // );

    // console.info("xxxx");
    // console.info(
    //   "playerX.xEnd",
    //   playerX.xEnd,
    //   "playerX.xStart",
    //   playerX.xStart
    // );
  }

  #ataquedOld() {
    const playerX = this.snakeSoldier.game.player.getCollisionCoordinate();
    const enemyDiffEnd = this.snakeSoldier.x - playerX.xEnd;

    const { player } = this.snakeSoldier.game;

    if (
      !(
        this.snakeSoldier.y < player.y + player.height &&
        this.snakeSoldier.y + this.snakeSoldier.height > player.y
      )
    ) {
      return;
    }

    if (
      playerX.xStart < this.snakeSoldier.x + this.snakeSoldier.width / 2 - 40 &&
      playerX.xEnd + player.atackRange - 15 > this.snakeSoldier.x
    ) {
      if ([4, 5, 6].includes(player.activeState.state)) {
        this.snakeSoldier.setState(SNAKE_STATES.ATACK);
        // this.snakeSoldier.activeState.hits++;
      }
      console.info("xxx");
    }

    // console.info(
    //   playerX.xStart <
    //     this.snakeSoldier.x + this.snakeSoldier.width / 2 - 40 &&
    //     playerX.xEnd + player.atackRange - 15 > this.snakeSoldier.x
    // );

    // console.info("xxxx");
    // console.info(
    //   "playerX.xEnd",
    //   playerX.xEnd,
    //   "playerX.xStart",
    //   playerX.xStart
    // );
  }
}
