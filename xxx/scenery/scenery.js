import { grounds } from "./coordinates.js";

import { fetchScenarios } from "../loadAssets.js";

import { SceneryItem } from "./sceneryItem.js";

const GAME_SETTINGS = {
  width: 1800,
  height: 800,
};

export class Scenery {
  constructor(game) {
    this.game = game;
    this.contextGround = game.contextGround;
    this.loading = false;

    this.grounds = [];
    this.adorns = [];
    this.sceneries = [];

    this.loadScenery();
  }

  async loadScenery() {
    this.loading = true;

    const sceneries = (await fetchScenarios()).scenarios[0].itens;

    const grounds = sceneries.filter((scenery) => scenery.type === "ground");

    grounds.forEach((ground) => {
      this.sceneries.push(new SceneryItem(this.game, ground));
    });

    this.loading = false;
  }

  draw() {
    this.contextGround.clearRect(
      0,
      0,
      GAME_SETTINGS.width,
      GAME_SETTINGS.height
    );

    this.grounds.forEach((ground) => {
      ground.draw();
      ground.drawColition();
    });

    this.adorns.forEach((adorn) => {
      adorn.draw();
    });

    this.sceneries.forEach((scenery) => {
      scenery.draw();
    });
  }

  removeIten() {
    this.adorns = this.adorns.filter((item) => !item.remove);
    this.grounds = this.grounds.filter((item) => !item.remove);
  }

  update() {
    this.removeIten();

    this.grounds.forEach((ground) => {
      ground.update();
    });

    this.adorns.forEach((adorn) => {
      adorn.update();
    });

    this.sceneries.forEach((scenery) => {
      scenery.update();
    });
  }
}
