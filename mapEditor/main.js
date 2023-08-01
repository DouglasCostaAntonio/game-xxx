import { scenarioObjs } from "./scenarioObjs.js";
import { enemiesObjs } from "./enemiesObjs.js";

import { Scenario } from "./scenario.js";
import { fetchScenarios, saveScenario } from "./handleHtml.js";

let allScenarios = [];

const canvas = document.getElementById("canvas");
canvas.width = 5000;
canvas.height = 3000;

const scenario = new Scenario(canvas);

window.onscroll = () => {
  scenario.getOffset();
};

window.onresize = () => {
  scenario.getOffset();
};

window.onresize = () => {
  scenario.getOffset();
};

window.addEventListener("load", async () => {
  scenario.drawShapes();
  allScenarios = await fetchScenarios();

  buildSelect();
});

document.querySelectorAll(".canvas-item-grounds").forEach((elem) => {
  elem.addEventListener("click", function handleClick(event) {
    const obj = scenarioObjs.find(
      (scenarioObj) => scenarioObj.canvasId === elem.id
    );

    scenario.addNewShapeGround({
      ...obj,
      image: document.getElementById(obj.imageId),
      x: 0,
      y: 0,
      colitionGround: false,
      colitionWall: false,
      type: "ground",
    });
  });
});

document.querySelectorAll(".canvas-item-enemies").forEach((elem) => {
  elem.addEventListener("click", function handleClick(event) {
    const obj = enemiesObjs.find((enemyObj) => enemyObj.canvasId === elem.id);

    scenario.addNewShapeGround({
      ...obj,
      image: document.getElementById(obj.imageId),
      x: 0,
      y: 0,
      colitionGround: false,
      colitionWall: false,
      type: "enemy",
    });
  });
});

document.getElementById("scenarioName").addEventListener("change", (event) => {
  const scenarioName = document.getElementById("scenarioName");
  document.getElementById("name").value = scenarioName.value;

  scenario.shapes = allScenarios.scenarios.find(
    (value) => value.name === scenarioName.value
  ).itens;

  scenario.drawShapes();
});

const buildSelect = () => {
  const selectTag = document.getElementById("scenarioName");

  allScenarios.scenarios.map((option) => {
    const opt = document.createElement("option");
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
      itens: scenario.shapes,
    };

    await saveScenario(data);
  });

document
  .getElementById("remove")
  .addEventListener("click", function handleClick(event) {
    scenario.shapes = scenario.shapes.filter(
      (shape) => scenario.currentShape !== shape
    );
    scenario.drawShapes();
  });

document
  .getElementById("collision-ground")
  .addEventListener("change", (event) => {
    const collision = document.getElementById("collision-ground");

    scenario.setColitionGround(collision.value);
  });

document
  .getElementById("collision-wall")
  .addEventListener("change", (event) => {
    const collisionWall = document.getElementById("collision-wall");

    scenario.setColitionWall(collisionWall.value);
  });
