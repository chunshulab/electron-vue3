<template>
  <el-row class="allImg" :gutter="10">
    <el-col v-for="(item,index) in fileList" :key="index" :span="6">
      <img :src="`/upload/${item}`"/>
    </el-col>

  </el-row>

</template>
<script setup>
import { ref } from 'vue'
import {onMounted} from "vue";
const fileList=ref([])
onMounted(async ()=>{
  const files= await myApi.getFileList()
  fileList.value=files
})
</script>
<style lang="scss" scoped>
  .allImg{
    div{
      img{width: 100%;}
    }
  }
</style>
