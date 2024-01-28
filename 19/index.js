// I already created a generative art piece called flocking
// for my old GenArt project, so I've tweaked that.

const DEFAULT_SPEED = 5;
const DEFAULT_SIZE = 50;
const DEFAULT_PROXIMITY_RADIUS = DEFAULT_SIZE * 2;
const NOISE = 5;

const birds = [];
const MAX_BIRDS = 150;
const numOfBirds = Math.min((innerWidth * innerHeight) / 6000, MAX_BIRDS);

let hasClicked = false;
function setup() {
  const canvas = createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  background("#B5E2FA");

  canvas.mouseClicked(() => {
    hasClicked = !hasClicked;
  });

  for (let i = 0; i < numOfBirds; i++) {
    birds.push(new Bird());
  }
}

function draw() {
  if (!hasClicked) {
    clear();
    background("#B5E2FA");
  }
  for (const bird of birds) {
    // Change behaviour based on nearby birds
    bird.lookAround(birds);
    bird.move();
  }
}

/**
 * Not the smartest of the birds.. Just roughly follows the direction
 * of the nearby birds, with some added noise for more interesting
 * patterns.
 */
class Bird {
  x;
  y;
  colour;
  angle;
  speed;
  size = DEFAULT_SIZE;
  // Only birds within this radius influence this bird's behaviour.
  proximityRadius = DEFAULT_PROXIMITY_RADIUS;
  otherBirds = [];

  constructor(
    { angle, speed } = { angle: Math.random() * 360, speed: DEFAULT_SPEED }
  ) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.angle = angle;
    this.speed = speed;
  }

  lookAround(birds) {
    this.otherBirds = this.getBirdsInProximityRange(birds);
  }

  move() {
    if (this.otherBirds.length > 0) {
      const averageAngle = this.getAverageAngle();
      const movingInTheSameDirection = (this.angle - averageAngle) % 360 < 90;
      if (movingInTheSameDirection) {
        this.angle += NOISE;
      } else {
        this.angle = averageAngle;
      }
    }

    const newX = this.x + this.speed * sin(this.angle);
    const newY = this.y + this.speed * cos(this.angle);
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.speed *= -1;
      this.angle += NOISE;
      this.y += this.speed * sin(this.angle);
      this.x += this.speed * cos(this.angle);
    } else {
      this.y = newY;
      this.x = newX;
    }

    this.colour = [this.angle % 360, 100, 100];
    fill(...this.colour);
    circle(this.x, this.y, this.size);
  }

  getBirdsInProximityRange(birds) {
    const closeBirds = [];
    for (const otherBird of birds) {
      const { x, y } = otherBird;
      if (this === otherBird) {
        continue;
      }

      if (dist(this.x, this.y, x, y) <= this.proximityRadius) {
        closeBirds.push(otherBird);
      }
    }

    return closeBirds;
  }

  getAverageAngle() {
    if (!this.otherBirds.length) {
      return this.angle;
    }

    return (
      this.otherBirds.reduce((acc, b) => acc + b.angle, 0) /
      this.otherBirds.length
    );
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
