const TEXT = "Loading";
const MAX_CLICKS = 4;

let clicks = 0;
let hue = 180;
function setup() {
  colorMode(HSB);
  textAlign(CENTER);
  loadFont("../assets/Milk Mango.ttf", (font) => {
    const canvas = createCanvas(innerWidth, innerHeight);
    canvas.mouseClicked(() => {
      clicks = (clicks + 1) % MAX_CLICKS;
      hue = (hue * PI) % 360;
    });

    background("black");
    textFont(font);
    textSize(50);
    strokeWeight(10);
  });
}

function draw() {
  stroke(hue, 100, 100);
  if (clicks >= 0) {
    drawPieSlice(frameCount % innerWidth, 0, { reverse });
  }
  if (clicks >= 1) {
    drawPieSlice(0, frameCount % innerHeight, { reverse });
  }
  if (clicks >= 2) {
    drawPieSlice(innerWidth, innerHeight - (frameCount % innerHeight), {
      reverse,
    });
  }
  if (clicks >= 3) {
    drawPieSlice(innerWidth - (frameCount % innerWidth), innerHeight, {
      reverse,
    });
  }

  fill("white");
  text(TEXT, innerWidth / 2, innerHeight / 2);
}

function drawPieSlice(x, y) {
  line(innerWidth / 2, innerHeight / 2, x, y);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  background("black");
}
