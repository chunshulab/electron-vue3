<template>
  <div>
    <p id="no-item" v-if="websiteStore.find(keywords).length === 0">暂无数据</p>
    <div id="items" v-if="websiteStore.find(keywords).length !== 0">
      <div
        class="read-item"
        @click="itemClick(index, item.url)"
        :class="{ selected: currentIndex === index }"
        v-for="(item, index) in websiteStore.find(keywords)"
        :key="index"
      >
        <img :src="item.screenshot" alt="" />
        <h2>{{ item.title }}</h2>
        <button @click.stop="deletex(item, index)">X</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import useWebsiteStore from '@/store/websiteStore'
import { ElMessage, ElMessageBox } from 'element-plus'
const { keywords } = inject('searchbar-keywords')
const currentIndex = ref(0)
const websiteStore = useWebsiteStore()
const itemClick = (index, url) => {
  currentIndex.value = index
  //window.open(url, '_blank', 'width=800,height=500')
  myApi.open(url)
}
const deletex = (item, index) => {
  currentIndex.value = index
  ElMessageBox.confirm(`确定要删除${item.title}的记录吗？`, '确认信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      websiteStore.deleteItem(item.url)
      currentIndex.value = 0
    })
    .catch(() => {})
}
onMounted(() => {
  websiteStore.init()
})
</script>
<style scoped lang="scss">
.read-item,
button {
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
}
#no-item {
  text-align: center;
  padding: 20px;
}
.selected {
  background-color: #f1f3f4;
  border-left: 10px solid #1a84ff;
}
.read-item {
  display: flex;
  position: relative;
  margin: 0 auto;
  align-items: center;
  border-bottom: 1px solid #f3f4f7;
  padding: 10px;
  &:hover {
    background-color: #f1f3f4;
  }

  h2 {
    font-weight: normal;
    font-size: 16px;
  }
  img {
    width: 130px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid #e8ebed;
  }
  &:hover button {
    display: block;
  }
  button {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    border-radius: 50%;
    display: none;
    border: 1px solid red;
    background-color: red;
    color: #fff;
  }
}
</style>
