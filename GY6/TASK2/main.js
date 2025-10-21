const columns = [];
const GAP = 150;
const DISTANCE = 300;
const SPEED = -200; 

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let isGameOver = false;

const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 30,
  height: 50,
  vy: 0,
  ay: 250,
};

const images = {
  bird: new Image(),
  bg: new Image(),
  column: new Image(),
};

images.bird.src = "./images/bird.png";
images.bg.src = "./images/bg.png";
images.column.src = "./images/column.png";

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    bird.vy = -200;
  }
});

let prevTime = performance.now();
function gameLoop(now = performance.now()) {
  dt = (now - prevTime) / 1000;
  prevTime = now;

  update(dt);
  draw();

  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

function update(dt) {
  bird.vy += bird.ay * dt;
  bird.y += bird.vy * dt;

  if (bird.y < 0) {
    bird.y = 0;
    bird.vy = 0;
  }

  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.vy = 0;
  }

  columns.forEach((column) => {
    column.x += SPEED * dt;
    if (detectCollision(bird, column)) {
      isGameOver = true;
    }
  });

  const lastColumn = columns[columns.length - 1];
  if (lastColumn && lastColumn.x < canvas.width - DISTANCE) {
    createColumn();
  }
}

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function createColumn() {
  const h = random(10, canvas.height / 2);
  columns.push(
    {
      x: canvas.width,
      y: 0,
      width: 30,
      height: h,
    },
    {
      x: canvas.width,
      y: h + GAP,
      width: 30,
      height: canvas.height - GAP - h,
    }
  );
}

function detectCollision(a, b) {
  return !(
    b.y + b.height < a.y ||
    a.x + a.width < b.x ||
    a.y + a.height < b.y ||
    b.x + b.width < a.x
  );
}

function draw() {
  ctx.fillStyle = "skyblue";
  ctx.drawImage(images.bg, 0, 0, 600, 400);

  ctx.fillStyle = "brown";
  ctx.drawImage(images.bird, bird.x, bird.y, bird.width, bird.height);

  ctx.fillStyle = "white";
  columns.forEach((column) => {
    ctx.drawImage(
      images.column,
      column.x,
      column.y,
      column.width,
      column.height
    );
  });
}

createColumn();
gameLoop();
