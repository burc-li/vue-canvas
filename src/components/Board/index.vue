<script setup>
import { ref, onMounted } from 'vue'
import BoardCanvas from './board.js'

const canvas = ref(null)

onMounted(() => {
  new BoardCanvas(canvas.value)
})
</script>

<template>
  <div class="board">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="less" scoped>
.board {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  background-color: antiquewhite;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  background-color: antiquewhite;
}
</style>
