import { scenarioObjs } from "./scenarioObjs.js";

import { enemiesObjs } from "./enemiesObjs.js";

window.addEventListener("load", function () {
  scenarioObjs.forEach((obj) => {
    drawImage(obj);
  });

  enemiesObjs.forEach((obj) => {
    drawImage(obj);
  });
});

const drawImage = (obj) => {
  const { canvasId, imageId, frameX, frameY, width, height } = obj;

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  ctx.canvas.width = 50;
  ctx.canvas.height = 50;

  const image = document.getElementById(imageId);

  const resizeDimensions = calcRatio(height, width);

  ctx.drawImage(
    image,
    width * frameX,
    height * frameY,
    width,
    height,
    0, //obj.x,
    0, //obj.y,
    resizeDimensions.width, // resize
    resizeDimensions.height // resize
  );
};

const calcRatio = (height, width) => {
  const minSize = 50;

  if (height < width) {
    return {
      height: (height * minSize) / width,
      width: minSize,
    };
  }

  return {
    height: minSize,
    width: (width * minSize) / height,
  };
};
