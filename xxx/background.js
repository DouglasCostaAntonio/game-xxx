class Layer {
  constructor(game, width, height, speedModifier, auto, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.auto = auto;
  }
  update() {
    if (this.x < -this.width) {
      this.x = 0;
    } else {
      if (this.auto) {
        this.x -= 5 * this.speedModifier;
      } else {
        this.x -= this.game.velocity * this.speedModifier;
      }
    }
  }
  draw() {
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 3500;
    this.height = 900;

    this.cloud1 = document.getElementById("cloud1");
    this.cloud2 = document.getElementById("cloud2");
    this.cloud3 = document.getElementById("cloud3");

    this.tres = document.getElementById("tres");

    this.skyimage = document.getElementById("sky");

    this.plains = document.getElementById("plains");

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0.06,
      true,
      this.cloud1
    );

    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.01,
      true,
      this.cloud2
    );

    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.05,
      true,
      this.cloud3
    );

    this.layerTree = new Layer(
      this.game,
      this.width,
      this.height,
      0.01,
      false,
      this.tres
    );

    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      false,
      this.skyimage
    );

    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      0.02,
      false,
      this.plains
    );

    this.backgroundLayers = [
      this.layer5,
      this.layer1,
      this.layer2,
      this.layer3,
      this.layerTree,
      this.layer6,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw() {
    this.backgroundLayers.forEach((layer) => {
      layer.draw();
    });
  }
}
