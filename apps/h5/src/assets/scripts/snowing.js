import snowPng from '../images/snow.png';
const runSnow = () => {
  // 存储所有的雪花
  const snows = [];

  // 下落的加速度
  const G = 0.03;

  const fps = 60;

  // 速度上限，避免速度过快
  const SPEED_LIMIT_X = 1;
  const SPEED_LIMIT_Y = 1.5;

  const W = window.innerWidth;
  const H = window.innerHeight;

  let tickCount = 150;
  let ticker = 0;
  let lastTime = Date.now();
  let deltaTime = 0;

  let canvas = null;
  let ctx = null;

  let snowImage = null;

  try {
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          setTimeout(callback, 1000 / fps);
        }
      );
    })();
  } catch (error) {
    console.log(error);
  }

  init();

  function init() {
    createCanvas();
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; pointer-events: none;';
    canvas.classList.add('snow-canvas');
    document.body.appendChild(canvas);
    // 小屏幕时延长添加雪花时间，避免屏幕上出现太多的雪花
    if (W < 768) {
      tickCount = 350;
    }

    snowImage = new Image();
    snowImage.src = snowPng;
    loop();
  }

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, W, H);

    const now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    ticker += deltaTime;

    if (ticker > tickCount) {
      snows.push(new Snow(Math.random() * W, 0, Math.random() * 5 + 5));
      ticker %= tickCount;
    }

    snows.map(function (s, i) {
      s.update();
      s.draw();
      if (s.y >= H) {
        snows.splice(i, 1);
      }
    });
  }

  function Snow(x, y, radius) {
    this.x = x;
    this.y = y;
    this.sx = 0;
    this.sy = 0;
    this.deg = 0;
    this.radius = radius;
    this.ax = Math.random() < 0.5 ? 0.005 : -0.005;
  }

  Snow.prototype.update = function () {
    const deltaDeg = Math.random() * 0.6 + 0.2;

    this.sx += this.ax;
    if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
      this.ax *= -1;
    }

    if (this.sy < SPEED_LIMIT_Y) {
      this.sy += G;
    }

    this.deg += deltaDeg;
    this.x += this.sx;
    this.y += this.sy;
  };

  Snow.prototype.draw = function () {
    const radius = this.radius;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.deg * Math.PI) / 180);
    ctx.drawImage(snowImage, -radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  };

  function createCanvas() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
};

const stopSnow = () => {
  const body = document.querySelector('body');
  const canvasElement = document.querySelector('.snow-canvas');
  body.removeChild(canvasElement);
};

export { runSnow, stopSnow };
