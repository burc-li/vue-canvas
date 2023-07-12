# vue-canvas

## 介绍
本仓库采用 vue3 + vite，基于 canvas 实现了涂鸦面板和九宫格手势解锁功能

## 涂鸦面板
我们基于Canvas实现了一款简单的涂鸦面板，用于在网页上进行绘图和创作

支持以下快捷键

| 功能 | 快捷键 |
| ---- | ----  |
|  撤销  | Ctrl + Z |
|  恢复  | Ctrl + Y |

### API

我们可以通过 new Board 创建一个画板，其接收一个容器作为参数
```
 <div id="container"></div>

 const board = new Board(document.getElementById('container'))
```

## 九宫格手势解锁
我们基于Canvas实现了一款简单的九宫格手势解锁器，用户可以通过在九宫格中绘制特定的手势来解锁

### API
我们可以通过 new Locker 创建一个图案解锁器，其接收一个容器作为第一个参数，第二个参数为选项

```
 <div id="container"></div>

 const board = new Locker(document.getElementById('container'), { ... })
```

选项支持以下属性

| 属性 | 描述 |
| ---- | ---- |
|  columnSpacing    | 宫格圆圈列间距    |
|  rowsSpacing      | 宫格圆圈行间距    |
|  radius           | 宫格圆圈半径      |
|  stroke           | 宫格圆圈描边颜色  |
|  lineStroke       | 连线描边颜色      |
|  selectedFill     | 宫格圆圈选中填充色，默认为连线描边颜色          |
|  backgroundColor  | 图案解锁器背景色  |


## 安装
```
npm install
```

## 启动
```
npm run dev
```

## 构建
```
npm run build
```