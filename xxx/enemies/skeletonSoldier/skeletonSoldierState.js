import { FrameRate } from "../../frameRate.js";

export const STATES = {
  skeletonSoldierIdle: 0,
  skeletonSoldierRunning: 1,
  skeletonSoldierFalling: 2,
  skeletonSoldierHit: 3,
  skeletonSoldierAtack: 4,
};

export class SkeletonSoldierState {
  constructor(state, skeletonSoldier) {
    this.frameX = 0;
    this.frameQty = 2;
    this.frameY = 0; //orientation 0 = forward, 1 = back
    // this.image = document.getElementById("enemyKoopa");
    this.framerate = new FrameRate(11);
    this.context = skeletonSoldier.context;
    this.input = skeletonSoldier.input;
    this.skeletonSoldier = skeletonSoldier;
    this.state = state;
  }
  start() {}

  draw() {
    // context.drawImage(this.image, 0, 0);
    this.context.drawImage(
      this.image,
      // this.frameX,
      // frameY,
      this.skeletonSoldier.width * this.frameX,
      this.skeletonSoldier.height * this.frameY,
      this.skeletonSoldier.width,
      this.skeletonSoldier.height,
      this.skeletonSoldier.x,
      this.skeletonSoldier.y,
      this.skeletonSoldier.width,
      this.skeletonSoldier.height
    );
  }

  update() {
    this.#seekHero();
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
    const playerX = this.skeletonSoldier.game.player.getCollisionCoordinate();
    const enemyDiffEnd = this.skeletonSoldier.x - playerX.xEnd;

    if (
      enemyDiffEnd <= this.skeletonSoldier.range &&
      enemyDiffEnd > -this.skeletonSoldier.offsetLeft // sub atack zone
    ) {
      console.info(
        enemyDiffEnd >
          -this.skeletonSoldier.offsetLeft + this.skeletonSoldier.range
      );

      this.frameY = 0;

      this.skeletonSoldier.x -= 2;

      if (
        this.skeletonSoldier.activeState.state === STATES.skeletonSoldierIdle
      ) {
        this.skeletonSoldier.setState(STATES.skeletonSoldierRunning);
      }
      return;
    }

    const enemyDiffStart =
      2 * this.skeletonSoldier.offsetLeft +
      this.skeletonSoldier.x +
      this.skeletonSoldier.collisionWidth -
      playerX.xStart;

    if (
      enemyDiffStart >= -this.skeletonSoldier.range &&
      enemyDiffStart < this.skeletonSoldier.offsetLeft // plus atack zone
    ) {
      this.frameY = 1;

      this.skeletonSoldier.x += 2;
      if (
        this.skeletonSoldier.activeState.state === STATES.skeletonSoldierIdle
      ) {
        this.skeletonSoldier.setState(STATES.skeletonSoldierRunning);
      }
      return;
    }

    if (
      this.skeletonSoldier.activeState.state === STATES.skeletonSoldierRunning
    ) {
      this.skeletonSoldier.setState(STATES.skeletonSoldierIdle);
    }
  }

  #ataqued() {
    const playerX = this.skeletonSoldier.game.player.getCollisionCoordinate();
    const enemyDiffEnd = this.skeletonSoldier.x - playerX.xEnd;

    const { player } = this.skeletonSoldier.game;

    if (
      !(
        this.skeletonSoldier.y < player.y + player.height &&
        this.skeletonSoldier.y + this.skeletonSoldier.height > player.y
      )
    ) {
      return;
    }

    if (
      playerX.xStart <
        this.skeletonSoldier.x + this.skeletonSoldier.width / 2 - 40 &&
      playerX.xEnd + player.atackRange - 15 > this.skeletonSoldier.x
    ) {
      if ([4, 5, 6].includes(player.activeState.state)) {
        this.skeletonSoldier.setState(STATES.skeletonSoldierAtack);
      }
      // console.info("xxx");
    }

    // console.info(
    //   playerX.xStart <
    //     this.skeletonSoldier.x + this.skeletonSoldier.width / 2 - 40 &&
    //     playerX.xEnd + player.atackRange - 15 > this.skeletonSoldier.x
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
