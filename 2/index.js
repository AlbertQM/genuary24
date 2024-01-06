// Major sin committed in this file: mutating `circles`.
const circles = [];
const MIN_RADIUS = 5;
const RADIUS_TICK = 5;
const NUM_HUES = 360;

function setup() {
  colorMode(HSB, NUM_HUES, 100, 100);
  const { canvas } = createCanvas(innerWidth, innerHeight);

  // Long press on mobile triggers a context menu. We don't want that.
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  canvas.addEventListener("pointerdown", startCircle);
  canvas.addEventListener("pointerup", endCircle);
}

function draw() {
  const hue = frameCount % NUM_HUES;
  fill(hue, 100, 100);
  rect(0, 0, innerWidth, innerHeight);

  for (let circleIdx = 0; circleIdx < circles.length; circleIdx++) {
    const hueStep = NUM_HUES / (circles.length + 1);
    const newHue = (hue + (circleIdx + 1) * hueStep) % NUM_HUES;

    fill(newHue, 100, 100);
    stroke(newHue, 100, 100);
    const circle = circles[circleIdx];
    if (circle.shouldGrow) {
      circle.radius += RADIUS_TICK;
    }
    ellipse(circle.x, circle.y, circle.radius);
  }
}

function startCircle(e) {
  const { x, y } = e;
  circles.push({
    x,
    y,
    radius: MIN_RADIUS,
    shouldGrow: true,
  });
}

function endCircle() {
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].shouldGrow) {
      circles[i].shouldGrow = false;
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
