var keys = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd'
}

var DIRECTIONS = Object.keys(keys).map(d => keys[d])
var SPEED = 4
var DIAGONAL_SPEED = SPEED * 0.75

class Hero {
  constructor () {
    this.x = 240
    this.y = 240
  }

  move (key, n) {
    // let n be the number of directional keys currently pressed
    var speed = n > 1 ? DIAGONAL_SPEED : SPEED

    if (key === keys.DOWN) {
      this.y += speed
    }
    if (key === keys.UP) {
      this.y -= speed
    }
    if (key === keys.LEFT) {
      this.x -= speed
    }
    if (key === keys.RIGHT) {
      this.x += speed
    }
  }
}

class Game {
  start () {
    this.el = document.createElement('canvas')
    this.el.width = 512
    this.el.height = 512
    this.ctx = this.el.getContext('2d')
    this.pressedKeys = new Map()
    this.hero = new Hero()
    this.registerListeners()

    document.querySelector('body').appendChild(this.el)

    this.update()
  }

  update () {
    for (var [ key ] of this.pressedKeys.keys()) {
      this.hero.move(key, this.pressedKeys.size)
    }

    this.render()
  }

  render () {
    this.drawBg()
    this.drawHero()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  drawBg () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.el.width, this.el.height)
  }

  drawHero () {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.hero.x, this.hero.y, 32, 32)
  }

  registerListeners () {
    document.addEventListener('keydown', this.onkeydown.bind(this), false)
    document.addEventListener('keyup', this.onkeyup.bind(this), false)
  }

  onkeydown (e) {
    if (!DIRECTIONS.includes(e.key)) return

    this.pressedKeys.set(e.key, 1)
  }

  onkeyup (e) {
    if (!DIRECTIONS.includes(e.key)) return

    this.pressedKeys.delete(e.key)
  }
}

var game = new Game()

game.start()

