<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref, provide, toRef } from 'vue'
import Home from './views/Home.vue'
import Header from '@/views/Header.vue'
const isShow = ref(false)
const setIsShow = (value) => {
  isShow.value = value
}
provide('dialos-visible', {
  isShow,
  setIsShow,
})

const keywords = ref('')
const setKeywords = (val) => {
  keywords.value = val
}
provide('searchbar-keywords', {
  keywords,
  setKeywords,
})
</script>
<style scoped></style>
