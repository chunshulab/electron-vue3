<template>
  <main>
    <SearchBar ref="searchbarRef"></SearchBar>
    <Teleport to="body">
      <el-dialog title="添加" width="80%" v-model="isShow">
        <el-input
          size="large"
          @keyup.enter="handleAddClick"
          v-model="addData"
          placeholder="输入网址"
          clearable
        ></el-input>
        <div class="btnx">
          <el-button :loading="isSubmit" @click="cancelHandle">取消</el-button>
          <el-button :loading="isSubmit" @click="handleAddClick" type="primary"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </Teleport>
    <List></List>
  </main>
</template>
<script setup>
import {ref, inject, onMounted, watch} from 'vue'
import SearchBar from './SearchBar.vue'
import List from './List.vue'
import useWebsiteStore from '@/store/websiteStore.js'
import { ElMessage } from 'element-plus'


const websiteStore = useWebsiteStore()
const { isShow, setIsShow } = inject('dialos-visible')
const addData = ref('https://www.chunshu.net')
const isSubmit = ref(false)
const searchbarRef=ref(null)
const watchClick=ref('')
const cancelHandle = () => {
  setIsShow(false)
}
const cb=()=>{
  searchbarRef.value.handleClick()
}
onMounted(async ()=>{
  myApi.openDialog()
  myApi.onRendererEvent(cb)
  //const result= await myApi.onRendererEvent(watchClick)

  //watchClick.value=''

})
watch(
    ()=>watchClick,
    ()=>{
      console.log(value)
      watchClick.value=''
    }
)


const handleAddClick = async () => {
  isSubmit.value = true
  const result = await myApi.sendUrl(addData.value)
  if (result.code === 0) {
    websiteStore.add(result)
    isSubmit.value = false
    setIsShow(false)
  } else {
    isSubmit.value = false
    ElMessage.error('该网站不存在.')
  }
}
</script>
<style scoped lang="scss">
.btnx {
  margin-top: 15px;
}
</style>
