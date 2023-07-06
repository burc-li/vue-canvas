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
    this.pathCellIds = []
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
    this.drawCircle()
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    this.canvas.addEventListener('mousedown', this.mousedownEvent.bind(this))
  }

  // 绘制九个圆圈
  drawCircle() {
    const columns = 3
    const rows = 3
    const width = this.canvas.width
    const height = this.canvas.height
    const paddingTop = (height - rows * 2 * this.radius - (rows - 1) * this.rowsSpacing) / 2
    const paddingLeft = (width - columns * 2 * this.radius - (columns - 1) * this.columnSpacing) / 2
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const point = {
          x: paddingLeft + (2 * j + 1) * this.radius + j * this.columnSpacing,
          y: paddingTop + (2 * i + 1) * this.radius + i * this.rowsSpacing,
          linked: false, // false：当前点未被连接  true：当前点已被连接
          id: i * columns + j
        }

        this.lockerCells.push(point)

        this.ctx.beginPath()
        this.ctx.arc(point.x, point.y, this.radius, 0, 2 * Math.PI, true)
        this.ctx.strokeStyle = this.stroke
        this.ctx.lineWidth = 3
        this.ctx.stroke()
      }
    }
    this.saveImageData()
  }

  // 鼠标事件
  mousedownEvent(e) {
    const that = this
    this.ctx.beginPath()
    this.ctx.moveTo(e.offsetX, e.offsetY)
    this.ctx.stroke()
    this.selectCircleAt(e.offsetX, e.offsetY)

    this.canvas.onmousemove = function (e) {
      that.ctx.lineTo(e.offsetX, e.offsetY)
      that.ctx.stroke()
    }
    this.canvas.onmouseup = this.canvas.onmouseout = function () {
      this.onmousemove = null
      this.onmouseup = null
      this.onmouseout = null
    }
  }

  // 选中当前坐标所在的圆圈
  selectCircleAt(x, y) {
    // 当前坐标点是否在圆内
    const point = this.lockerCells.find((point) => {
      return Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2) <= Math.pow(this.radius, 2)
    })
    console.log(point)
    if (point && !point.linked) {
      this.startX = point.x
      this.startY = point.y
      point.linked = true
      this.pathCellIds.push(point.id)
      // this.restoreImageData()

      // 绘制选中样式
    }
  }

  // 保存画布快照
  saveImageData() {
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.lastImageData = data
  }
  // 恢复画布快照
  restoreImageData() {
    this.ctx.putImageData(this.lastImageData, 0, 0)
  }
}
