const HEXAGON_SIZE = Math.floor(Math.max(innerWidth, innerHeight) / 50);
const hexagon = { w: HEXAGON_SIZE * 2, h: HEXAGON_SIZE / 2 };
const PERIOD = 0.0005;
let hasClicked = false;
let hue = 180;

function setup() {
  colorMode(HSB);
  textAlign(CENTER);

  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.mouseClicked(() => {
    hasClicked = !hasClicked;
    hue = (hue + Math.random() * 360) % 360;
  });
  noStroke();
}

function draw() {
  background(hue, 100, 50);
  fill(hue, 100, 100);
  for (let row = 0; row < innerWidth; row += hexagon.w) {
    for (let col = 0; col < innerHeight; col += HEXAGON_SIZE) {
      if ((col / HEXAGON_SIZE) % 2 === 0) {
        // Face up /___\
        quad(
          row + hexagon.h,
          col,
          row + hexagon.w - hexagon.h,
          col,
          row + hexagon.w,
          col + hexagon.h,
          row,
          col + hexagon.h
        );
        if (sin(frameCount * (hasClicked ? row : col) * PERIOD) > 0) {
          rect(row, col + hexagon.h, hexagon.w, hexagon.h);
        }
      } else {
        // Face down \___/
        quad(
          row,
          col,
          row + hexagon.w,
          col,
          row + hexagon.w - hexagon.h,
          col + hexagon.h,
          row + hexagon.h,
          col + hexagon.h
        );
      }
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
