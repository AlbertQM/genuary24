const TILE_SIZE = 10;
// From https://www.mutualart.com/Artwork/Second-Movement-I-VI/AC0DEB2B17EE904AF1056952033FAAC2
const ACCENT_COLOR_RGB = [242, 167, 59];
const DIRECTIONS = ["top-left", "top-right", "bottom-left", "bottom-right"];

function setup() {
  noStroke();
  const canvas = createCanvas(innerWidth, innerHeight);

  anniAlbers();

  // Redraw the row and the column clicked with random triangles
  // in the ACCENT_COLOR.
  canvas.mouseClicked((e) => {
    const x = Math.floor(e.x / TILE_SIZE);
    const y = Math.floor(e.y / TILE_SIZE);

    fill("white");
    rect(x * TILE_SIZE, 0, TILE_SIZE, innerHeight);
    rect(0, y * TILE_SIZE, innerWidth, TILE_SIZE);

    fill(...ACCENT_COLOR_RGB);
    for (let i = 0; i < innerWidth; i += TILE_SIZE) {
      drawArrow(random(DIRECTIONS), i, y * TILE_SIZE);
    }
    for (let i = 0; i < innerHeight; i += TILE_SIZE) {
      drawArrow(random(DIRECTIONS), x * TILE_SIZE, i);
    }
  });
}

function draw() {}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  anniAlbers();
}

function drawArrow(direction, row, col) {
  switch (direction) {
    case "top-left":
      return triangle(row, col + TILE_SIZE, row, col, row + TILE_SIZE, col);
    case "bottom-left":
      return triangle(
        row,
        col + TILE_SIZE,
        row,
        col,
        row + TILE_SIZE,
        col + TILE_SIZE
      );
    case "bottom-right":
      return triangle(
        row,
        col + TILE_SIZE,
        row + TILE_SIZE,
        col,
        row + TILE_SIZE,
        col + TILE_SIZE
      );

    case "top-right":
      return triangle(
        row,
        col,
        row + TILE_SIZE,
        col,
        row + TILE_SIZE,
        col + TILE_SIZE
      );
  }
}

function anniAlbers() {
  fill("black");
  for (let row = 0; row < innerWidth; row += TILE_SIZE) {
    for (let col = 0; col < innerHeight; col += TILE_SIZE) {
      drawArrow(random(DIRECTIONS), row, col);
    }
  }
}
