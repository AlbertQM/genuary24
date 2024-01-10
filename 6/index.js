const START = -90; // Make the arc begin from the top
const STROKE = 10;
const MIN_RADIUS = Math.min(innerWidth, innerHeight) / 2;

let backgroundColor = [180, 100, 10];
function setup() {
  colorMode(HSB);
  ellipseMode(CENTER);
  angleMode(DEGREES);

  const canvas = createCanvas(innerWidth, innerHeight);
  strokeWeight(STROKE);
  fill(0, 0, 0, 0);
  canvas.mouseClicked(({ x, y }) => {
    if (y <= innerHeight / 2) {
      if (backgroundColor[2] < 90) {
        backgroundColor[2] += 10;
      }
    } else {
      if (backgroundColor[2] > 0) {
        backgroundColor[2] -= 10;
      }
    }

    // By adding this, I'm probably pushing the limits of "understandable controls".
    // The "Tap the top part of the screen to increase brightness" seems intuitive,
    // this one not so much. But oh well, it's art™.
    if (x >= innerWidth / 2) {
      backgroundColor[0] = (backgroundColor[0] + 10) % 360;
    } else {
      backgroundColor[0] = (backgroundColor[0] - 10) % 360;
    }
  });
}

function draw() {
  const now = new Date();
  background(...backgroundColor);
  // These should add up to 360.
  const metrics = [
    // Months are 0-indexed, so add 1.
    (now.getMonth() + 1) * 30,
    (360 / daysInMonth(now.getFullYear(), now.getMonth())) * now.getDate(),
    now.getDay() * 51.42,
    (now.getHours() + 1) * 15,
    (now.getMinutes() + 1) * 6,
    now.getSeconds() * 6,
  ];
  for (let metricIdx = 0; metricIdx < metrics.length; metricIdx++) {
    const metric = metrics[metricIdx];
    stroke(metricIdx * 20, 100, 100);
    if (metric > 0) {
      arc(
        innerWidth / 2,
        innerHeight / 2,
        MIN_RADIUS + STROKE * 2 * metricIdx,
        MIN_RADIUS + STROKE * 2 * metricIdx,
        START,
        START + metric
      );
    } else {
      // Fun little animation when the seconds circle is complete!
      arc(
        innerWidth / 2,
        innerHeight / 2,
        MIN_RADIUS + STROKE * 2 * metricIdx,
        MIN_RADIUS + STROKE * 2 * metricIdx,
        START + now.getMilliseconds() * 0.36,
        START + 360
      );
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function daysInMonth(year, month) {
  const lastDayOfPreviousMonth = 0;
  return new Date(year, month + 1, lastDayOfPreviousMonth).getDate();
}
