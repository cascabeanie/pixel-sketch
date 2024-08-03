// Global variables:
const gridContainer = document.querySelector(".grid-canvas-container");
const colourInput = document.querySelector(".colour-input");
const activatePaintbrush = document.querySelector(".activate-paintbrush");
const activateRgb = document.querySelector(".activate-rgb");
const activateEraser = document.querySelector(".activate-eraser");
const sliderInput = document.querySelector(".slider-input");
const sliderOutput = document.querySelector(".slider-output");
const updateGrid = document.querySelector(".update-grid");
const gridlinesSwitch = document.querySelector(".gridlines-switch");
const activateClear = document.querySelector(".activate-clear");

let isDrawing = false;
let customColour;
let usingDefaultColour = true;
let drawingMode = "unicolour";
const defaultColour = "#000000";

// Grid size slider:
function gridSlider() {
  sliderOutput.textContent = `${sliderInput.value} x ${sliderInput.value}`;
  sliderInput.addEventListener("input", (event) => {
    sliderOutput.textContent = `${event.target.value} x ${event.target.value}`;
  });
  return parseInt(sliderOutput.textContent.slice(0, 3));
}

// Grid generation function:
function generateGrid(cellNum) {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
    // Removes any existing children.
  }

  gridContainer.setAttribute(
    "style",
    `grid-template-rows: repeat(${cellNum}, 1fr);
    grid-template-columns: repeat(${cellNum}, 1fr);`
  );

  for (let i = 0; i < cellNum ** 2; i++) {
    const cellDivs = document.createElement("div");
    cellDivs.classList.add("grid-cell");
    gridContainer.appendChild(cellDivs);
  }
}

// Gridlines switch:
function gridlines() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.classList.toggle("gridlines-on");
  });
}

// Mouse detection:
function mouseDetection() {
  gridContainer.addEventListener("mousedown", () => {
    isDrawing = true;
  });
  gridContainer.addEventListener("mouseup", () => {
    isDrawing = false;
  });
}

// Brush colour logic:
function brushMode(cell) {
  if (isDrawing) {
    if (drawingMode === "unicolour") {
      cell.style.backgroundColor = usingDefaultColour
        ? defaultColour
        : customColour;
    } else if (drawingMode === "eraser") {
      cell.style.backgroundColor = "white";
    } else if (drawingMode === "rgb") {
      let randomNumOne = Math.floor(Math.random() * 255);
      let randomNumTwo = Math.floor(Math.random() * 255);
      let randomNumThree = Math.floor(Math.random() * 255);
      cell.style.backgroundColor = `rgb(${randomNumOne}, ${randomNumTwo}, ${randomNumThree})`;
    }
  }
}

// Colour selector:
function colourSelector() {
  colourInput.addEventListener("input", (event) => {
    usingDefaultColour = false;
    customColour = event.target.value;
  });
}

// Button functions:
function paint() {
  drawingMode = "unicolour";
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.addEventListener("mousemove", () => brushMode(cell));
  });
}

function eraser() {
  drawingMode = "eraser";
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.addEventListener("mousemove", () => brushMode(cell));
  });
}

function rgb() {
  drawingMode = "rgb";
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.addEventListener("mousemove", () => brushMode(cell));
  });
}

function clear() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
}

// Button event listeners:
activatePaintbrush.addEventListener("click", () => {
  paint();
});
activateEraser.addEventListener("click", () => {
  eraser();
});
activateRgb.addEventListener("click", () => {
  rgb();
});
updateGrid.addEventListener("click", () => {
  generateGrid(gridSlider());
  gridlinesSwitch.checked = false;
});
gridlinesSwitch.addEventListener("click", () => {
  gridlines();
});
activateClear.addEventListener("click", () => {
  clear();
});

// Loads the script:
window.onload = () => {
  gridSlider();
  generateGrid(gridSlider());
  mouseDetection();
  colourSelector();
  colourInput.value = defaultColour;
};
