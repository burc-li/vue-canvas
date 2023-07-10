// <!-- 请绘制图案密码 -->
// <!-- 再次绘制图案进行确认 -->
// <!-- 与上次绘制不一致，请重试 -->
// <!-- 图案密码设置成功 -->
export default class BoardCanvas {
  constructor(container, options = {}) {
    // 容器
    this.container = container
    // canvas画布
    this.canvas = this.createCanvas(container)
    // 绘制工具
    this.ctx = this.canvas.getContext('2d')

    // 起始点位置
    this.startX = 0
    this.stateY = 0

    // 圆半径
    this.radius = options.radius || 20
    // 圆圈列间距
    this.columnSpacing = options.columnSpacing || 10
    // 圆圈行间距
    this.rowsSpacing = options.rowsSpacing || 10
    // 圆圈描边颜色
    this.stroke = options.stroke || '#fff'
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
    container.appendChild(canvas)
    return canvas
  }

  // 初始化
  init() {
    this.drawCell()
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
  }

  // 绘制九个圆圈
  drawCell() {
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
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.currentPath = [] // 清空当前绘制路径
    this.lastImageData = null // 清空绘制的画布快照
    this.restoreImageData(this.cellImageData) // 恢复背景宫格快照

    this.ctx.beginPath()
    this.ctx.moveTo(e.offsetX, e.offsetY)
    this.ctx.stroke()
    this.selectCellAt(e.offsetX, e.offsetY)

    // 鼠标移动事件
    const that = this
    this.canvas.onmousemove = function (e) {
      // 绘制路径 从最后一个点到当前点
      const lastData = that.currentPath[that.currentPath.length - 1]
      if (!lastData) return

      // 恢复快照
      that.restoreImageData(that.lastImageData)

      that.ctx.beginPath()
      that.ctx.moveTo(lastData.x, lastData.y)
      that.ctx.lineTo(e.offsetX, e.offsetY)
      that.ctx.strokeStyle = '#de5e60'
      that.ctx.lineWidth = 3
      that.ctx.stroke()
      that.selectCellAt(e.offsetX, e.offsetY)
    }

    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      // 恢复快照
      this.onmousemove = null
      this.onmouseup = null
      this.onmouseout = null
    }
  }

  // 选中当前坐标所在的圆圈
  selectCellAt(x, y) {
    // 当前坐标点是否在圆内
    const data = this.lockerCells.find((item) => {
      return Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2) <= Math.pow(this.radius, 2)
    })
    const existing = this.currentPath.some((item) => item.id === data?.id)
    if (!data || existing) return

    this.startX = data.x
    this.startY = data.y

    this.restoreImageData(this.lastImageData)

    // 绘制选中样式
    this.ctx.beginPath()
    this.ctx.arc(data.x, data.y, this.radius / 2.5, 0, 2 * Math.PI, true)
    this.ctx.fillStyle = '#de5e60'
    this.ctx.fill()

    // 绘制路径 从最后一个点到当前点
    const lastData = this.currentPath[this.currentPath.length - 1]
    if (lastData) {
      this.ctx.beginPath()
      this.ctx.moveTo(lastData.x, lastData.y)
      this.ctx.lineTo(data.x, data.y)
      this.ctx.strokeStyle = '#de5e60'
      this.ctx.lineWidth = 3
      this.ctx.stroke()
    }

    // 保存快照
    this.lastImageData = this.getImageData()

    // 保存当前点
    this.currentPath.push(data)
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
