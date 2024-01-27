let TILE_SIZE = Math.min(innerWidth, innerHeight) / 4;
const HUES = [0, 60, 240];

function setup() {
  colorMode(HSB);
  angleMode(DEGREES);

  const canvas = createCanvas(innerWidth, innerHeight);
  // On click, redraw that specific tile.
  canvas.mouseClicked((e) => {
    const col = Math.floor(e.x / TILE_SIZE);
    const row = Math.floor(e.y / TILE_SIZE);
    fill("beige");
    rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    drawTile(col * TILE_SIZE, row * TILE_SIZE);
  });
  noStroke();

  bauhaus();
}

function drawTile(x, y) {
  fill(random(HUES), 100, 100);
  const type = random([1, 2, 3]);

  switch (type) {
    case 1:
      arc(x, y + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, -90, 90);
      arc(x + TILE_SIZE, y + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, 90, 270);
      break;

    case 2:
      arc(x + TILE_SIZE / 2, y, TILE_SIZE, TILE_SIZE, 0, 180);
      arc(x + TILE_SIZE / 2, y + TILE_SIZE, TILE_SIZE, TILE_SIZE, -180, 0);
      break;

    case 3:
      circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE);
  }
}

function bauhaus() {
  background("beige");

  for (let row = 0; row < innerWidth; row += TILE_SIZE) {
    for (let col = 0; col < innerHeight; col += TILE_SIZE) {
      drawTile(row, col);
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  TILE_SIZE = Math.min(innerWidth, innerHeight) / 4;
  bauhaus();
}
