<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <img alt="vue logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="btn-group">
      <RouterLink target="_blank" to="/board">创建一个画板</RouterLink>
      <RouterLink target="_blank" to="/locker">创建一个九宫格手势解锁器</RouterLink>
    </div>
  </main>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.btn-group{
  padding-top: 20px;
  a{
    display: block;
    margin: 0;
    padding: 8px 12px;
    color: #2c3e50;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
