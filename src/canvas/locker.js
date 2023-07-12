export default class BoardCanvas {
  constructor(container, options = {}) {
    // 容器
    this.container = container
    // 圆半径
    this.radius = options.radius || 20
    // 圆圈列间距
    this.columnSpacing = options.columnSpacing || 10
    // 圆圈行间距
    this.rowsSpacing = options.rowsSpacing || 10
    // 圆圈描边颜色
    this.stroke = options.stroke || '#fff'
    // 路径描边颜色
    this.lineStroke = options.lineStroke || '#fff'
    // 选中图案填充颜色
    this.selectedFill = options.selectedFill || this.lineStroke
    // 图案解锁器背景色
    this.backgroundColor = options.backgroundColor || '#fff'

    // canvas画布
    this.canvas = this.createCanvas(container)
    // 绘制工具
    this.ctx = this.canvas.getContext('2d')

    // 九个圆心坐标
    this.lockerCells = []
    // 密码
    this.password = []
    // 确认密码
    this.confirmPassword = []

    // 绘制路径
    this.currentPath = []
    // 背景宫格的画布快照
    this.cellImageData = null
    // 上一次绘制的画布快照
    this.lastImageData = null

    // 初始化
    this.init()
  }

  // 创建画布
  createCanvas(container) {
    const canvas = document.createElement('canvas')
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    canvas.style.display = 'block'
    canvas.style.backgroundColor = this.backgroundColor
    container.appendChild(canvas)
    return canvas
  }

  // 初始化
  init() {
    this.drawCellGrids()
    this.drawText('请绘制新的图案密码')
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
  }

  // 绘制宫格圆圈
  drawCellGrids() {
    const columns = 3
    const rows = 3
    const width = this.canvas.width
    const height = this.canvas.height
    const paddingTop = (height - rows * 2 * this.radius - (rows - 1) * this.rowsSpacing) / 2
    const paddingLeft = (width - columns * 2 * this.radius - (columns - 1) * this.columnSpacing) / 2
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const data = {
          x: paddingLeft + (2 * j + 1) * this.radius + j * this.columnSpacing,
          y: paddingTop + (2 * i + 1) * this.radius + i * this.rowsSpacing,
          id: i * columns + j
        }

        this.lockerCells.push(data)

        this.ctx.beginPath()
        this.ctx.arc(data.x, data.y, this.radius, 0, 2 * Math.PI, true)
        this.ctx.strokeStyle = this.stroke
        this.ctx.lineWidth = 3
        this.ctx.stroke()
      }
    }
    this.cellImageData = this.lastImageData = this.getImageData()
  }

  // 鼠标事件
  mousedownEvent(e) {
    // 选中宫格，并绘制点到点路径
    const selected = this.selectCellAt(e.offsetX, e.offsetY)
    if (!selected) return

    // 鼠标移动事件
    const that = this
    this.canvas.onmousemove = function (e) {
      // 路径的最后一个点
      const lastData = that.currentPath[that.currentPath.length - 1]
      // 恢复快照
      that.restoreImageData(that.lastImageData)

      // 绘制路径
      that.drawLine(lastData, { x: e.offsetX, y: e.offsetY })
      // 选中宫格，并绘制点到点路径
      that.selectCellAt(e.offsetX, e.offsetY)
    }

    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      const canvas = this
      canvas.onmousemove = null
      canvas.onmouseup = null
      canvas.onmouseout = null

      const currentPathIds = that.currentPath.map((item) => item.id)
      let text = ''
      if (that.password.length === 0) {
        that.password = currentPathIds
        text = '请再次绘制图案进行确认'
      } else if (that.confirmPassword.length === 0) {
        that.confirmPassword = currentPathIds
        if (that.password.join('') === that.confirmPassword.join('')) {
          text = '图案密码设置成功，请输入您的密码'
        } else {
          text = '与上次绘制不一致，请重试'
          that.password = []
          that.confirmPassword = []
        }
      } else {
        if (that.password.join('') === currentPathIds.join('')) {
          text = '图案密码正确'
        } else {
          text = '图案密码错误'
        }
      }

      // 清空画布
      that.ctx.clearRect(0, 0, canvas.width, canvas.height)
      that.restoreImageData(that.cellImageData) // 恢复背景宫格快照
      that.drawText(text) // 绘制提示文字
      that.currentPath = [] // 清空当前绘制路径
      that.lastImageData = that.cellImageData // 重置上一次绘制的画布快照
    }
  }

  // 若当前坐标在宫格圆圈内，则选中宫格并绘制路径，返回true
  // 若当前坐标不在宫格圆圈内，则返回false
  selectCellAt(x, y) {
    // 当前坐标点是否在圆内
    const data = this.lockerCells.find((item) => {
      return Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2) <= Math.pow(this.radius, 2)
    })
    const existing = this.currentPath.some((item) => item.id === data?.id)
    if (!data || existing) return false

    // 恢复画布快照
    this.restoreImageData(this.lastImageData)

    // 绘制选中样式
    this.drawCircle(data.x, data.y, this.radius / 1.5, 'rgba(0,0,0,0.1)')
    this.drawCircle(data.x, data.y, this.radius / 2.5, this.selectedFill)

    // 绘制路径 从最后一个点到当前点
    const lastData = this.currentPath[this.currentPath.length - 1]
    if (lastData) {
      this.drawLine(lastData, data)
    }

    // 保存画布快照
    this.lastImageData = this.getImageData()

    // 保存当前点
    this.currentPath.push(data)
    return true
  }

  // 绘制圆
  drawCircle(x, y, radius, fill) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    this.ctx.fillStyle = fill
    this.ctx.fill()
  }

  // 绘制路径
  drawLine(start, end, stroke = this.lineStroke) {
    this.ctx.beginPath()
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(end.x, end.y)
    this.ctx.strokeStyle = stroke
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.stroke()
  }

  // 绘制文字
  drawText(text) {
    this.ctx.beginPath()
    this.ctx.font = '17px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = '#333'
    this.ctx.fillText(text, this.canvas.width / 2, 60)
  }

  // 获取画布快照
  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  // 恢复画布快照
  restoreImageData(imageData) {
    if (!imageData) return
    this.ctx.putImageData(imageData, 0, 0)
  }
}
