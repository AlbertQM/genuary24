const isSmallScreen = window.innerWidth < 1220;
const FONT_SIZE = isSmallScreen ? window.innerWidth / 10 : 100;
const TEXT = "PARTY-CLES";
const DEFAULT_SAMPLE_FACTOR = 0.5;
const MAX_STROKE_WEIGHT = 6;

let textOutlinePoints = [];
let clickCount = 0;
let font;
function preload() {
  font = loadFont("../assets/Milk Mango.ttf");
}

function setup() {
  document.addEventListener("pointerdown", (e) => {
    clickCount = (clickCount + 1) % MAX_STROKE_WEIGHT;
    clear();
  });
  colorMode(HSB);

  textOutlinePoints = computePoints(font, DEFAULT_SAMPLE_FACTOR);
}

function draw() {
  for (const p of textOutlinePoints) {
    stroke(Math.random() * 360, Math.random() * 100, 100);
    if (clickCount > 0) {
      strokeWeight(clickCount + 1);
    } else {
      strokeWeight(1);
    }
    point(p.x, p.y);
  }
}

function computePoints(font, sampleFactor) {
  const newTextOutlinePoints = [];
  const textBounds = font.textBounds(TEXT, 0, 0, FONT_SIZE);
  const bottomPadding = 10;
  const { canvas } = createCanvas(textBounds.w, textBounds.h + bottomPadding);
  if (!isSmallScreen) {
    // Stretch the canvas to the inlined width/height.
    canvas.removeAttribute("style");
  }

  // Since we are drawing each letter individually,
  // we'll need to space them out manually, using a left padding!
  let leftPadding = 0;
  // When positioning the text vertically, we get the bounding rect
  // of the whole TEXT, because the rect of individual chars might
  // be very short (e.g. "-" char).
  const topPadding = textBounds.h;

  // For each letter, compute its outline at FONT_SIZE, and then
  // its outline at FONT_SIZE - 1.. For a party-cles effect.
  for (let letterIdx = 0; letterIdx < TEXT.length; letterIdx++) {
    const letter = TEXT[letterIdx];
    const prevLetter = TEXT[letterIdx - 1];
    leftPadding += prevLetter
      ? font.textBounds(prevLetter, 0, 0, FONT_SIZE).w
      : 0;

    for (i = FONT_SIZE; i > 0; i -= 5) {
      // We want to align each increasingly small letter centrally, such that
      // all points will appear inside the biggest letter. Not doing this results
      // in points being slightly to the side (think of a shadow)
      const leftOffset =
        (font.textBounds(letter, 0, 0, FONT_SIZE).w -
          font.textBounds(letter, 0, 0, i).w) /
        2;
      const topOffset =
        (font.textBounds(letter, 0, 0, FONT_SIZE).h -
          font.textBounds(letter, 0, 0, i).h) /
        2;

      textSize(i);
      newTextOutlinePoints.push(
        ...font.textToPoints(
          letter,
          leftPadding + leftOffset,
          topPadding - topOffset,
          i,
          {
            sampleFactor: sampleFactor,
          }
        )
      );
    }
  }
  return newTextOutlinePoints;
}
