const Canvas = require('term-canvas')
const Game = require('gp_engine')
const Controller = require('./controller.js')
const readline = require('readline')

let size = process.stdout.getWindowSize()
process.on('SIGINT', function(){
  ctx.reset()
  process.nextTick(function(){
    process.exit()
  })
})

process.on('SIGWINCH', function(){
  size = process.stdout.getWindowSize();
  canvas.width = size[0]
  canvas.height = size[1]
});

const canvas = new Canvas(...size)
const ctx = canvas.getContext('2d')
const game = new Game()
game.paddles[0].controls = [{key: 'w', action: 'up'}, {key: 's', action: 'down'}]
game.paddles[1].controls = [{key: 'up', action: 'up'}, {key: 'down', action: 'down'}]
const controller = new Controller(game)

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    controller.activateKey(key.name)
    setTimeout(() => {
      controller.deactivateKey(key.name)
    }, 180);
  }
});

function run() {
  ctx.hideCursor();
  setInterval(() => {
    game.update(controller.getController())
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(game.ended) {
      console.log(` ${game.winner[0]} is the winner!`)
      process.exit()
    }
  
    ctx.fillText(`${game.paddles[0].points} - ${game.paddles[1].points}`, canvas.width / 2, 1)
  
    for (let i = 0; i < game.paddles.length; i++) {
      const paddle = game.paddles[i]
  
      const size = mp(...paddle.size, canvas, game)
      const pos = mp(...paddle.pos, canvas, game)
      ctx.fillStyle = 'white'
      ctx.fillRect(pos[0], pos[1], size[0], size[1])
    }
    const ball = game.ball
    const bpos = mp(...ball.pos, canvas, game)
    let bsize = mp(ball.size, ball.size, canvas, game)
    bsize = (bsize[0] < 1 || bsize[1] < 1) ? [1, 1] : bsize
    ctx.fillStyle = 'white'
    ctx.fillRect(bpos[0], bpos[1], bsize[0], bsize[1])
  }, 17)
}

function mp (x, y, canvas, game) {
  return new Uint16Array([x * (canvas.width / 640), y * (canvas.height / 360)])
}

exports.run = run