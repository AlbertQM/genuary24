const SIZE = 133;
const STAR_POINTS = 10;
const PALETTE = ["#931621", "#28464b", "#326771", "#2c8c99", "#42d9c8"];
const BG_HEX = "#13272B";
const MAGIC_NUMNER = 99; // Someone explain to me why.. Also don't ask me how I found out.

const MAX_ROWS = Math.ceil(Math.max(innerHeight, innerWidth) / SIZE) * 2;
let rows = MAX_ROWS / 2;

function setup() {
  const canvas = createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  background(BG_HEX);
  fill(0, 0, 0, 0); // Make all rects see through.

  drawPattern();

  canvas.mouseClicked(() => {
    rows++;
    if (rows >= MAX_ROWS) {
      rows = 1;
      clear();
      background(BG_HEX);
    }
    drawPattern();
  });
}

// It's not technically a star, but..
function drawStar(x, y) {
  for (let i = 0; i < STAR_POINTS; i++) {
    push();
    // Good ol' translate to rotation point, rotate, then transform back.
    translate(x + SIZE / 2, y + SIZE / 2);
    rotate(i * 10);
    translate(-x - SIZE / 2, -y - SIZE / 2);
    rect(x, y, SIZE);
    pop();
  }
}

// Looks like a slice to me.. I kinda want cake now.
function drawSlice() {
  let numOfShapes = 1;
  for (let i = 0; i < rows; i++) {
    stroke(PALETTE[i % PALETTE.length]);
    numOfShapes += i;
    for (j = 0; j < numOfShapes; j++) {
      push();
      rotate((MAGIC_NUMNER / numOfShapes) * j);
      drawStar(SIZE * i, 0);
      pop();
    }
  }
}

// Not DRY, because this art be drippin'
// Four slices, one in each corner.
function drawPattern() {
  const scaleBy = 0.5;
  push();
  scale(scaleBy);
  drawSlice();
  pop();

  push();
  rotate(90);
  translate(0, -innerWidth);
  scale(scaleBy);
  drawSlice();
  pop();

  push();
  rotate(180);
  translate(-innerWidth, -innerHeight);
  scale(scaleBy);
  drawSlice();
  pop();

  push();
  rotate(270);
  translate(-innerHeight, 0);
  scale(scaleBy);
  drawSlice();
  pop();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  background(BG_HEX);
  drawPattern();
}
