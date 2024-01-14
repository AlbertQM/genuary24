let shouldLeaveTrail = false;

const CIRCLE_RADIUS = Math.min(innerWidth, innerHeight) / 2;
const CIRCLE_CENTER = [innerWidth / 2, innerHeight / 2];
const CIRCLE_STROKE = 8;
const BALL_SIZE = 25;

const balls = [];
function setup() {
  ellipseMode(CENTER);
  colorMode(HSB);
  balls.push(new Ball());

  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.mouseClicked(({ x, y }) => {
    if (dist(x, y, ...CIRCLE_CENTER) > CIRCLE_RADIUS) {
      shouldLeaveTrail = !shouldLeaveTrail;
    } else {
      balls.push(new Ball());
    }
  });
}

function draw() {
  if (!shouldLeaveTrail) {
    clear();
  }
  strokeWeight(CIRCLE_STROKE);
  fill(0, 0, 0, 0);
  circle(...CIRCLE_CENTER, CIRCLE_RADIUS * 2);
  for (const ball of balls) {
    ball.draw();
  }
}

class Ball {
  speed;
  position;
  color;

  constructor(
    { speedX, speedY, color } = {
      speedX: (Math.random() + 1) * 10,
      speedY: (Math.random() + 1) * 10,
      color: Math.random() * 360,
    }
  ) {
    this.speed = createVector(speedX, speedY);
    this.color = color;

    // Random point inside the circle.
    const r = (CIRCLE_RADIUS - BALL_SIZE) * Math.sqrt(random());
    const theta = random() * TWO_PI;
    this.position = createVector(
      innerWidth / 2 + r * cos(theta),
      innerHeight / 2 + r * sin(theta)
    );
  }

  move() {
    const isBallInsideCircle =
      this.position.dist(createVector(...CIRCLE_CENTER)) + BALL_SIZE / 2 <
      CIRCLE_RADIUS;
    if (isBallInsideCircle) {
      this.position.add(this.speed);
    } else {
      const normal = createVector(
        CIRCLE_CENTER[0] - this.position.x,
        CIRCLE_CENTER[1] - this.position.y
      );
      this.speed = this.speed.reflect(normal);
      this.position.add(this.speed);
    }
  }

  draw() {
    this.move();
    strokeWeight(BALL_SIZE);
    stroke(this.color, 100, 100, shouldLeaveTrail ? 0.2 : 1);
    point(this.position);
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
