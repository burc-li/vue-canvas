<script setup>
import { ref, onMounted } from 'vue'
import Board from '@/canvas/board.js'

const container = ref(null)
onMounted(() => {
  // 新建一个画板
  new Board(container.value)
})
</script>

<template>
  <div class="drawing-board">
    <h3>这是一个画板，您可以随意涂写和绘画！支持撤销(Ctrl+Z) / 恢复(Ctrl+Y)操作</h3>
    <div id="container" ref="container" style="width: 100%; height: 100%"></div>
    <!-- <div id="container" ref="container" style="width: 2000px; height: 2000px"></div> -->
  </div>
</template>

<style lang="less" scoped>
.drawing-board {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  h3{
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
