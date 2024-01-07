const CUTE_BLUE_HUE = 180;
let hue = CUTE_BLUE_HUE;

function setup() {
  colorMode(HSB);
  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.mouseClicked(() => (hue = random(360)));
}

function draw() {
  droste();
}

function droste() {
  let y = 0;
  drawTheThing({ topLeftCorner: { x: 0, y: 0 } });
  for (let scaleByFactor = 2; scaleByFactor < 2 ** 10; scaleByFactor *= 2) {
    drawTheThing({
      topLeftCorner: { x: 0, y: 0 },
      scaleByFactor,
      shrinkByPc: frameCount % 50,
    });
    y += innerHeight / scaleByFactor;
  }
}

function drawTheThing({
  topLeftCorner: { x, y },
  shrinkByPc = 0,
  scaleByFactor = 2,
  h = hue,
}) {
  const size = [
    (innerWidth / scaleByFactor) * (1 - shrinkByPc / 100),
    (innerHeight / scaleByFactor) * (1 - shrinkByPc / 100),
  ];
  fill(h, 100, 20);
  rect(x, y, ...size);
  fill(h, 100, 40);
  rect(x + size[0], y, ...size);
  fill(h, 100, 60);
  rect(x, y + size[1], ...size);
  fill(h, 100, 80);
  rect(x + size[0], y + size[1], ...size);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
