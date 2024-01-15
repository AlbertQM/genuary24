const CHARS =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const TEXT_SIZE = 15;
const PERIOD = 0.0000005;
let hasClicked = false;

function setup() {
  colorMode(HSB);
  textAlign(CENTER);

  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.mouseClicked(() => (hasClicked = !hasClicked));

  fill("white");
  textSize(TEXT_SIZE);
}

function draw() {
  background(0, 0, 0);
  for (let row = 0; row < innerWidth; row += TEXT_SIZE) {
    for (let col = 0; col < innerHeight; col += TEXT_SIZE) {
      if (hasClicked) {
        stroke(360 * tan(frameCount * col * row * PERIOD), 100, 100);
      } else {
        stroke("white");
      }
      text(pickChar(sin(frameCount * col * row * PERIOD)), row, col);
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function pickChar(continuousValue) {
  continuousValue = Math.max(-1, Math.min(1, continuousValue));

  return CHARS.charAt(Math.floor((continuousValue + 1) * CHARS.length) / 2);
}
