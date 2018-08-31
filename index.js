const Canvas = require('term-canvas')
const gp_engine = require("gp_engine")

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

// process.on('SIGWINCH', function(){});

// var canvas = new Canvas(size[0], size[1])
//   , ctx = canvas.getContext('2d')
//   , x = 1
//   , y = 2
//   , sx = 2
//   , sy = 2
//   , x2 = 1
//   , y2 = 5
//   , sx2 = 1
//   , sy2 = 1;

const canvas = new Canvas(640, 360)
const ctx = canvas.getContext('2d')

ctx.hideCursor();
setInterval(() => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'blue';
  ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
  // ctx.strokeStyle = 'green';
  // ctx.strokeRect(x += sx, y += sy, 30, 5);
  // ctx.fillStyle = 'yellow';
  // ctx.fillRect(x2 += sx2, y2 += sy2, 12, 5);
  // ctx.fillStyle = 'white';
  // ctx.fillText('Rectangle', x2 + 1, y2 + 2);
  // ctx.moveTo(0, 10);
  // if (x + 30 >= canvas.width || x <= 1) sx = -sx;
  // if (x2 + 10 >= canvas.width || x2 <= 1) sx2 = -sx2;
  // if (y + 5 >= canvas.height || y <= 1) sy = -sy;
  // if (y2 + 5 >= canvas.height || y2 <= 1) sy2 = -sy2;
}, 1000 / 60);