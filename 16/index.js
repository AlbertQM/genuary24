let shapesDrawn = 0;
const GOAL = 10000;
const FONT_SIZE = 72;
const CLICK_BOOST = 500; // On click, draw CLICK_BOOST things at once.

function setup() {
  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.mouseClicked(() => {
    for (let i = 0; i < CLICK_BOOST; i++) {
      drawShapes();
      drawCounter();
    }
    shapesDrawn += 500;
  });

  noStroke();
  colorMode(HSB);
  textAlign(CENTER);
  textFont("monospace");
  textSize(FONT_SIZE);
}

function draw() {
  if (shapesDrawn < GOAL) {
    drawShapes();
    shapesDrawn++;
  }
  drawCounter();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  drawShapes();
  drawCounter();
}

function drawCounter() {
  push();
  fill("black");
  circle(innerWidth / 2, innerHeight / 2, FONT_SIZE * 4);
  fill("white");
  text(shapesDrawn, innerWidth / 2, innerHeight / 2);
  pop();
}

function drawShapes() {
  push();
  const shape = random([rect, ellipse]);
  const hue = random(360);
  fill(hue, 100, 100, 0.5);
  stroke((hue + 180) % 360, 100, 100);
  strokeWeight(random(10));
  const [x, y] = [random(innerWidth), random(innerHeight)];
  shape(x, y, 50, 50);
  pop();
}
