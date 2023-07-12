<script setup>
import { ref, onMounted } from 'vue'
import Locker from '@/canvas/locker'

const container = ref(null)
onMounted(() => {
  // 新建一个解锁器
  new Locker(container.value,{
    radius: 30, // 半径
    columnSpacing: 50, // 圆圈列间距
    rowsSpacing: 90, // 圆圈行间距
    stroke: '#b5b5b5', // 圆圈描边颜色
    lineStroke: '#237fb4', // 路径描边颜色
    backgroundColor: '#f7f7f7', // 画布背景颜色
  })
})
</script>

<template>
  <div class="pattren-locker">
    <h3>这是一个九宫格手势解锁器！</h3>
    <div id="container" ref="container"></div>
  </div>
</template>

<style lang="less" scoped>
.pattren-locker {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ccc;
  h3{
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  #container{
    width: 360px;
    height: 630px;
    margin: 0 auto;
    margin-top: 90px;
    border-radius: 4px;
    box-shadow: 0px 0px 6px #3f3f3f;
  }
}
</style>