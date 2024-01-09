const PIXEL = { width: 50, height: 50 };
// This is not body-shaming. Source: I'm a pixel.
let fatPixels = new Map();
const COLORS = [
  [255, 255, 255],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
];

function setup() {
  const canvas = createCanvas(innerWidth, innerHeight);
  fatPixels = generateFatPixels();
  canvas.mouseClicked((e) => {
    const pixel = fatPixels.get(getSaneRowCol(e.x, e.y));
    pixel.fill = COLORS[++pixel.colorIdx % COLORS.length];
  });

  // Long press on mobile triggers a context menu. We don't want that.
  canvas.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}

function draw() {
  fatPixels.forEach((pixel) => {
    fill(...pixel.fill);
    rect(...pixel.rect);
  });
}

function getSaneRowCol(row, col) {
  return `${Math.floor(row / PIXEL.width)}, ${Math.floor(col / PIXEL.height)}`;
}

function generateFatPixels(fill) {
  const newFatPixels = new Map();
  for (let row = 0; row < innerWidth; row += PIXEL.width) {
    for (let col = 0; col < innerHeight; col += PIXEL.height) {
      const key = getSaneRowCol(row, col);
      const maybeExistingPixel = fatPixels.get(key);
      newFatPixels.set(key, {
        rect: [row, col, PIXEL.width, PIXEL.height],
        fill: maybeExistingPixel?.fill ?? COLORS[0],
        colorIdx: 0,
      });
    }
  }

  return newFatPixels;
}

function windowResized() {
  fatPixels = generateFatPixels();
  resizeCanvas(innerWidth, innerHeight);
}
