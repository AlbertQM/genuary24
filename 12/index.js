let isLampOn = true;
const bubbles = [];
const MAX_BUBBLES = 15;
const MIN_BUBBLE_RADIUS = 10;
const LIGHT_BG_HSB = [180, 77, 69];
const DARK_BG_HSB = [195, 80, 49];

function setup() {
  noStroke();
  colorMode(HSB);
  ellipseMode(CENTER);
  const canvas = createCanvas(innerWidth, innerHeight);

  canvas.mouseClicked(() => {
    isLampOn = !isLampOn;
  });

  bubbles.push(new Bubble());
  for (let i = 0; i < MAX_BUBBLES; i++) {
    setTimeout(() => bubbles.push(new Bubble()), 2000 + Math.random() * 5000);
  }
}

function draw() {
  if (isLampOn) {
    background(...LIGHT_BG_HSB);
  } else {
    background(...DARK_BG_HSB);
  }
  for (const bubble of bubbles) {
    bubble.draw();
  }
}

class Bubble {
  speed;
  position;
  color;
  radius;
  createdAtFrameCount;

  getInitialPosition() {
    return createVector(
      Math.random() * innerWidth,
      innerHeight + this.radius * 2
    );
  }

  // Smaller bubbles go faster!
  getSemiRandomSpeed() {
    return -100 * noise(frameCount * 0.005) * (1 / this.radius);
  }

  constructor() {
    this.createdAtFrameCount = frameCount;
    this.radius =
      MIN_BUBBLE_RADIUS +
      (Math.random() * Math.max(innerHeight, innerWidth)) / 10;
    this.speed = createVector(0, this.getSemiRandomSpeed());
    this.position = this.getInitialPosition();
    this.color = Math.random() * 360;
  }

  move() {
    const diameter = this.radius * 2;
    const isAboveScreen = this.position.y + diameter < 0;
    if (isAboveScreen) {
      this.position = this.getInitialPosition();
      return;
    }

    const isBelowScreen = this.position.y - diameter > innerHeight;
    if (!isLampOn && isBelowScreen) {
      // Let the bubbles take a nap just below the screen.
      return;
    }

    if (isLampOn) {
      this.speed.y = this.getSemiRandomSpeed();
    } else {
      this.speed.y += 0.0005 + this.radius * 0.05;
    }

    // Bit of wobblin'
    this.speed.x =
      // Using `frameCount` in the `sin` would make all bubbles wobble in synch,
      // which doesn't look great.
      sin(this.createdAtFrameCount * 0.05) * noise(this.createdAtFrameCount);

    this.position.add(this.speed);
  }

  draw() {
    this.move();
    fill(this.color, 100, isLampOn ? 100 : 70);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
