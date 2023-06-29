export default class BoardCanvas {
  constructor(canvas) {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    // canvas画布
    this.canvas = canvas
    // 绘制工具
    this.ctx = canvas.getContext('2d')
    // 起始点位置
    this.startX = 0
    this.stateY = 0

    // 初始化
    this.init()
  }

  init() {
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
    window.addEventListener('resize', this.resizeEvent.bind(this))
  }

  mousedownEvent(e) {
    const ctx = this.ctx
    this.canvas.onmousemove = function (e) {
      ctx.lineTo(e.clientX, e.clientY)
      ctx.stroke()
    }
    this.canvas.onmouseup = function () {
      this.onmousemove = null
      this.onmouseup = null
    }

    const parent = this.canvas.parentNode.parentNode
    console.log(parent, parent.scrollTop, parent.scrollLeft)

    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
    ctx.strokeStyle = '#EB7347'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  resizeEvent() {
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.ctx.putImageData(data, 0, 0)
  }
}
