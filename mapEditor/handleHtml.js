const BASE_URL = "http://0.0.0.0:3000/";

export const fetchScenarios = async () => {
  const response = await fetch(`${BASE_URL}loadScenarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const saveScenario = async (data) => {
  return fetch(`${BASE_URL}save`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

document
  .getElementById("toggle")
  .addEventListener("click", function handleClick(event) {
    const element = document.getElementById("toggle-container");

    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
      return;
    }
    element.classList.add("hidden");
  });

document.getElementById("palette-type").addEventListener("change", (event) => {
  const paletteType = document.getElementById("palette-type");

  if (paletteType.value === "enemies") {
    document.getElementById("ground-container").hidden = true;
    document.getElementById("enemies-container").hidden = false;
  }

  if (paletteType.value === "ground") {
    document.getElementById("enemies-container").hidden = true;
    document.getElementById("ground-container").hidden = false;
  }

  console.info(paletteType.value);
});
