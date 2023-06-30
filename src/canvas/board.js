export default class BoardCanvas {
  constructor(container) {
    // 容器
    this.container = container
    // canvas画布
    this.canvas = this.createCanvas(container)
    // 绘制工具
    this.ctx = this.canvas.getContext('2d')
    // 起始点位置
    this.startX = 0
    this.stateY = 0

    // 初始化
    this.init()
  }

  createCanvas(container) {
    const canvas = document.createElement('canvas')
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    canvas.style.display = 'block'
    canvas.style.backgroundColor = 'antiquewhite'
    container.appendChild(canvas)
    return canvas
  }

  // 初始化
  init() {
    this.setContext2DStyle()
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
  }

  // 设置画笔样式
  setContext2DStyle() {
    this.ctx.strokeStyle = '#EB7347'
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
  }

  mousedownEvent(e) {
    const ctx = this.ctx
    this.canvas.onmousemove = function (e) {
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    }
    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      this.onmousemove = null
      this.onmouseup = null
      this.onmouseout = null
    }
    
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
    ctx.stroke()
  }
}
