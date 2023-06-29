<script setup>
import Board from '@/components/Board/index.vue'
</script>

<template>
  <div class="drawing-board" style="overflow: auto;">
    <h3>这是一个画板，您可以随意涂写和绘画！</h3>
    <!-- 画板默认宽度200px 默认高度200px，您可以自定义宽高 -->
    <Board style="width: 100%; height: 100%"></Board>
    <!-- <Board style="width:2000px; height: 2000px"></Board> -->
  </div>
</template>

<style lang="less" scoped>
.drawing-board {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  h3{
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
