let hasClicked = false;
const TILE_SIZE = 10;
// At 0 seconds nothing much happens, so left shift it a bit.
const SECONDS_OFFSET = 10;

function setup() {
  noStroke();
  colorMode(HSB);
  const canvas = createCanvas(innerWidth, innerHeight);

  canvas.mouseClicked(() => {
    hasClicked = !hasClicked;
  });
}

function draw() {
  if (hasClicked) {
    return;
  }

  trippyWobble();
}

function trippyWobble() {
  for (let row = 0; row <= innerWidth; row += TILE_SIZE) {
    for (let col = 0; col <= innerHeight; col += TILE_SIZE) {
      const wobble = getWobbly(
        col,
        row,
        // Using second as its value is up to 60.
        // This clips the wobbly function abruptly, but it stops it
        // before it goes absolutely batshit. I don't have enough resolution
        // to handle all this wobblyness.
        SECONDS_OFFSET +
          second() *
            // 4D chess to enhance the wobbliness (gives the back and forth effect)
            2 *
            sin(frameCount * 0.05) ** 3 +
          sin(5 * frameCount * 0.005) / 5
      );
      fill(wobble * 360, 100, 100);

      rect(row, col, TILE_SIZE, TILE_SIZE);
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  trippyWobble();
}

// Just played around with the values here.
// Inspired by https://piterpasma.nl/articles/wobbly
function getWobbly(x, y, t) {
  return (
    sin(
      2.23 * x * sin(y * t * 0.00005 * PI * 0.14) * t * 0.00005 + PI * 0.19274
    ) +
    sin(2.02 * x * sin(y * t * 0.0005) * t * 0.0000025) +
    sin(2.024 * second() * t * 0.00005 + PI * 0.0024125) / 2.024
  );
}
