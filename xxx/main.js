import { Game, GAME_SETTINGS } from "./game.js";

window.addEventListener("load", function () {
  const canvasGround = document.getElementById("canvasGround");
  const canvas = document.getElementById("canvas1");

  canvasGround.width = GAME_SETTINGS.width;
  canvasGround.height = GAME_SETTINGS.height;
  const ctxGround = canvasGround.getContext("2d");

  canvas.width = GAME_SETTINGS.width;
  canvas.height = GAME_SETTINGS.height;
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx, ctxGround);

  function animate() {
    if (game.framerate.nextFrame() && !game.scenery.loading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update();
      game.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
});
