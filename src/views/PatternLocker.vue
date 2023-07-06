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
    stroke: '#fff' // 圆圈描边颜色
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
    width: 400px;
    height: 600px;
    margin: 0 auto;
    margin-top: 90px;
    border-radius: 10px;
    background-color: #ccc;
    box-shadow: 0px 0px 6px #3f3f3f;
  }
}
</style>
// background-color: #3f3f3f;
// 提示文本： #ffffff
// 警告文本： #de5e60
// 填充色：b5a693
// 填充色：b5a98c
// 填充色：a69e97