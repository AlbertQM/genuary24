const MIN_MOLNAR_LEVEL = 5;
const MAX_MOLNAR_LEVEL = 50;
const SIZE = 200;

let molnarLevel = MIN_MOLNAR_LEVEL;
function setup() {
  angleMode(DEGREES);
  colorMode(HSB);
  const canvas = createCanvas(innerWidth, innerHeight);
  fill(0, 0, 0, 0);

  molnar();

  canvas.mouseClicked(() => {
    clear();
    molnarLevel =
      molnarLevel > MAX_MOLNAR_LEVEL ? MIN_MOLNAR_LEVEL : molnarLevel + 5;
    molnar({ randomizeColor: true });
  });
}

function draw() {}

function drawMolnarSquare(
  x,
  y,
  size,
  { randomizeColor } = { randomizeColor: false }
) {
  if (randomizeColor) {
    stroke(Math.random() * 360, 80, 80);
  }
  // To make mobile a bit more interesting, choose the longer
  // axis as the one that increases the rotation.
  const longerAxis = innerWidth >= innerHeight ? x : y;
  const magicRotation = longerAxis / 20;
  for (let i = 0; i < molnarLevel; i++) {
    const magicNumber = Math.sin(Math.random() * 100);
    const magicPosition = magicNumber * 20;
    const magicSize = Math.abs(magicNumber * 30);
    push();
    // Good ol' translate to rotation point, rotate, then transform back.
    translate(x + size / 2, y + size / 2);
    rotate(magicRotation);
    translate(-x - size / 2, -y - size / 2);

    rect(x + magicPosition, y + magicPosition, size - i * magicSize);
    pop();
  }
}

function molnar({ randomizeColor } = { randomizeColor: false }) {
  for (let row = 0; row < innerWidth; row += SIZE) {
    for (let col = 0; col < innerHeight; col += SIZE) {
      drawMolnarSquare(row, col, SIZE, { randomizeColor });
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  molnar({ randomizeColor: true });
}
