import { scenarioObjs } from "./scenarioObjs.js";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let allScenarios = [];

let shapes = [
  {
    imageId: "sign",
    frameX: 0,
    frameY: 0,
    width: 52,
    height: 64,
    x: 0,
    y: 0,
  },
];

document
  .getElementById("scenarioName")
  .addEventListener("change", function (event) {
    var e = document.getElementById("scenarioName");
    document.getElementById("name").value = e.value;

    shapes = allScenarios.find((value) => value.name === e.value).itens;

    draw_shapes();
  });

const buildSelect = (options) => {
  let selectTag = document.getElementById("scenarioName");

  options.map((option) => {
    let opt = document.createElement("option");
    opt.value = option.name;
    opt.innerHTML = option.name;
    selectTag.append(opt);
  });
};

document
  .getElementById("save")
  .addEventListener("click", async function handleClick(event) {
    const data = {
      name: "scenario-1",
      itens: shapes,
    };

    const response = await fetch("http://0.0.0.0:3000/save", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

const fetchScenarios = async () => {
  const response = await fetch("http://0.0.0.0:3000/loadScenarios", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { scenarios } = await response.json();
  allScenarios = scenarios;
  buildSelect(scenarios);
};

canvas.width = 5000;
canvas.height = 3000;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let newShap = null;
let currentShape = null;

let isDraggin = false;

let startX = 0;
let startY = 0;

let offset_x;
let offset_y;

let get_offset = function () {
  let canvas_offset = canvas.getBoundingClientRect();
  offset_x = canvas_offset.left;
  offset_y = canvas_offset.top;
};

get_offset();

window.onscroll = function () {
  get_offset();
};
window.onresize = function () {
  get_offset();
};
window.onresize = function () {
  get_offset();
};

const isMouseInShape = (x, y, shape) => {
  let shapeLeft = shape.x;
  let shapeRight = shape.x + shape.width;
  let shapeTop = shape.y;
  let shapeBottom = shape.y + shape.height;

  if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
    return true;
  }

  return false;
};

const mouseDown = (event) => {
  event.preventDefault();

  startX = parseInt(event.clientX - offset_x);
  startY = parseInt(event.clientY - offset_y);

  if (newShap) {
    shapes.push({ ...newShap, x: startX, y: startY });
    newShap = null;
    draw_shapes();

    return;
  }

  shapes.forEach((shape) => {
    if (!isMouseInShape(startX, startY, shape)) return;

    currentShape = shape;
    isDraggin = true;

    return;
  });
};

const mouseUp = (event) => {
  event.preventDefault();
  if (!isDraggin) return;

  isDraggin = false;
};

const mouseOut = (event) => {
  event.preventDefault();
  if (!isDraggin) return;

  isDraggin = false;
};

const mouseMove = (event) => {
  event.preventDefault();

  if (!isDraggin) return;

  let mouseX = parseInt(event.clientX - offset_x);
  let mouseY = parseInt(event.clientY - offset_y);

  currentShape.x += mouseX - startX;
  currentShape.y += mouseY - startY;

  draw_shapes();

  startX = mouseX;
  startY = mouseY;
};

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;

const draw_shapes = () => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  shapes.forEach((shape) => {
    context.fillStyle = shape.color;

    context.drawImage(
      document.getElementById(shape.imageId),
      shape.width * shape.frameX,
      shape.height * shape.frameY,
      shape.width,
      shape.height,
      shape.x, //obj.x,
      shape.y, //obj.y,
      shape.width, // resize
      shape.height // resize
    );

    if (currentShape) {
      document.getElementById(
        "props"
      ).innerHTML = `X:${currentShape.x} Y:${currentShape.y}`;
    }

    // context.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};

document.querySelectorAll(".xxx").forEach((elem) => {
  elem.addEventListener("click", function handleClick(event) {
    setNewItem(elem.id);
  });
});

const setNewItem = (canvasId) => {
  const obj = scenarioObjs.find(
    (scenarioObjs) => scenarioObjs.canvasId === canvasId
  );

  // shapes.push({
  //   ...obj,
  //   image: document.getElementById(obj.imageId),
  //   x: 0,
  //   y: 0,
  // });

  newShap = {
    ...obj,
    image: document.getElementById(obj.imageId),
    x: 0,
    y: 0,
  };

  // console.info(shapes);

  // draw_shapes();
};

window.addEventListener("load", async function () {
  draw_shapes();
  await fetchScenarios();
});

window.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (e.key === "ArrowUp") {
    currentShape.y = currentShape.y - 1;
  }

  if (e.key === "ArrowDown") {
    currentShape.y = currentShape.y + 1;
  }

  if (e.key === "ArrowRight") {
    currentShape.x = currentShape.x + 1;
  }

  if (e.key === "ArrowLeft") {
    currentShape.x = currentShape.x - 1;
  }

  draw_shapes();
});

document
  .getElementById("remove")
  .addEventListener("click", function handleClick(event) {
    shapes = shapes.filter((shape) => currentShape !== shape);
    draw_shapes();
  });
