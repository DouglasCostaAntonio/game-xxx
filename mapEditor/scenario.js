export class Scenario {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.shapes = [];

    this.newShapeGround = null;
    this.currentShape = null;
    this.isDraggin = false;

    this.startX = 0;
    this.startY = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.#setCanvasEvent();
    this.getOffset();
  }

  keyDown(e) {
    e.preventDefault();

    if (e.key === "ArrowUp") {
      this.currentShape.y = this.currentShape.y - 1;
    }

    if (e.key === "ArrowDown") {
      this.currentShape.y = this.currentShape.y + 1;
    }

    if (e.key === "ArrowRight") {
      this.currentShape.x = this.currentShape.x + 1;
    }

    if (e.key === "ArrowLeft") {
      this.currentShape.x = this.currentShape.x - 1;
    }

    this.drawShapes();
  }

  #setCanvasEvent() {
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    this.canvas.addEventListener("mouseout", this.mouseOut.bind(this));

    window.addEventListener("keydown", this.keyDown.bind(this));

    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  getOffset() {
    const { left, top } = this.canvas.getBoundingClientRect();

    this.offsetX = left;
    this.offsetY = top;
  }

  addNewShapeGround(newShapeGround) {
    this.newShapeGround = newShapeGround;
  }

  drawColitionGround(shape) {
    this.context.save();
    this.context.strokeStyle = "blue";

    this.context.strokeRect(
      shape.x + 5,
      shape.y + 5,
      shape.width - 10,
      shape.height - 10
    );
    this.context.restore();
  }

  drawColitionWall(shape) {
    this.context.save();

    this.context.strokeStyle = "aqua";

    this.context.strokeRect(
      shape.x + 10,
      shape.y + 10,
      shape.width - 20,
      shape.height - 20
    );
    this.context.restore();
  }

  drawShapes() {
    const { width, height } = canvas;

    this.context.clearRect(0, 0, width, height);

    this.shapes.forEach((shape) => {
      this.context.fillStyle = shape.color;

      this.context.drawImage(
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

      if (shape.colitionGround) {
        this.drawColitionGround(shape);
      }

      if (shape.colitionWall) {
        this.drawColitionWall(shape);
      }

      if (this.currentShape) {
        document.getElementById(
          "props"
        ).innerHTML = `X: ${this.currentShape.x} Y: ${this.currentShape.y}`;
      }
    });
  }

  isMouseInShape(shape) {
    const shapeLeft = shape.x;
    const shapeRight = shape.x + shape.width;
    const shapeTop = shape.y;
    const shapeBottom = shape.y + shape.height;

    return (
      this.startX > shapeLeft &&
      this.startX < shapeRight &&
      this.startY > shapeTop &&
      this.startY < shapeBottom
    );
  }

  mouseDown(event) {
    event.preventDefault();

    this.startX = parseInt(event.clientX - this.offsetX);
    this.startY = parseInt(event.clientY - this.offsetY);

    if (this.newShapeGround) {
      this.shapes.push({
        ...this.newShapeGround,
        x: this.startX,
        y: this.startY,
      });
      this.newShapeGround = null;
      this.drawShapes();

      return;
    }

    this.shapes.forEach((shape) => {
      if (!this.isMouseInShape(shape)) return;

      this.currentShape = shape;
      this.isDraggin = true;
      document.getElementById("collision-ground").value = shape.colitionGround
        ? "yes"
        : "no";

      document.getElementById("collision-wall").value = shape.colitionWall
        ? "yes"
        : "no";

      return;
    });
  }

  mouseUp(event) {
    event.preventDefault();
    this.isDraggin = false;
  }

  mouseOut(event) {
    event.preventDefault();
    this.isDraggin = false;
  }

  mouseMove(event) {
    event.preventDefault();

    if (!this.isDraggin) return;

    const mouseX = parseInt(event.clientX - this.offsetX);
    const mouseY = parseInt(event.clientY - this.offsetY);

    this.currentShape.x += mouseX - this.startX;
    this.currentShape.y += mouseY - this.startY;

    this.drawShapes();

    this.startX = mouseX;
    this.startY = mouseY;
  }

  setColitionGround(colition) {
    if (!this.currentShape) return;

    this.currentShape.colitionGround = colition === "yes";
    this.drawShapes();
  }

  setColitionWall(colition) {
    if (!this.currentShape) return;

    this.currentShape.colitionWall = colition === "yes";
    this.drawShapes();
  }
}
