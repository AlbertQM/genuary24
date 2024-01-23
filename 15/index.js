const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Bounds = Matter.Bounds,
  Composite = Matter.Composite;

const SHAPE_SIZE = 20;
let numClicks = 0;

// I don't really need p5.js, but it was quicker to set up
// the canvas this way.
function setup() {
  const engine = Engine.create();

  const { canvas } = createCanvas(innerWidth, innerHeight);
  canvas.addEventListener("pointerdown", ({ x, y }) => {
    numClicks += 1;

    // The idea is to build a tower. I wonder if just providing
    // two tall rectangles and a flat one on the third click
    // would put my idea ("build a tower") into users' minds.
    const isMagicClick = numClicks % 3;

    const angle = isMagicClick ? PI / 2 : PI;
    const shapeWidth = SHAPE_SIZE * (isMagicClick ? 2 : 4);
    const ball = Bodies.rectangle(x, y, shapeWidth, SHAPE_SIZE, {
      angle,
    });
    Composite.add(engine.world, [ball]);
  });

  const bottomGround = Bodies.rectangle(
    0,
    innerHeight,
    innerWidth * pixelDensity(),
    10,
    {
      isStatic: true,
    }
  );
  Composite.add(engine.world, [bottomGround]);

  const render = Render.create({
    element: document.body,
    engine: engine,
    canvas,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: pixelDensity(),
      wireframes: false,
    },
  });
  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);
}
