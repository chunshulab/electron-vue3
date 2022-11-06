<template>
  <div class="header">
    <router-link custom v-slot="{ isActive, navigate }" to="/home">
      <div :class="{ active: isActive }" @click="navigate">网站收藏</div>
    </router-link>
    <router-link custom v-slot="{ isActive, navigate }" to="/imageGallery"
      ><div :class="{ active: isActive }" @click="navigate">
        图片收基
      </div></router-link
    >
  </div>
</template>
<script setup>
import { ref } from 'vue'
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  height: auto;
  overflow: hidden;
  background: #1a84ff;
  color: #fff;
  .active {
    font-weight: bold;
  }
  div {
    cursor: pointer;
    margin: 0px 15px;
    height: 35px;
    line-height: 35px;
  }
}
</style>
