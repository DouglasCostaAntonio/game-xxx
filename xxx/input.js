export class InputHandler {
  constructor(game) {
    this.keys = [];
    this.game = game;

    this.allowedKeys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "x",
      "c",
      "z",
      "f",
      "n",
      "l",
    ];

    window.addEventListener("keydown", (e) => {
      if (this.allowedKeys.includes(e.key) && !this.keys.includes(e.key)) {
        this.keys.push(e.key);
      } else if (e.key === "d") {
        // active debug mode
        this.game.debugMode = !this.game.debugMode;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.allowedKeys.includes(e.key)) {
        this.keys = this.keys.filter((key) => key !== e.key);
      }
    });
  }
}
