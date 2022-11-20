<template>
  <div class="main">
    <el-icon @click="handleClick" class="icon"><CirclePlus /></el-icon>
    <el-input
      v-model="txt"
      placeholder="请输入网址"
      clearable
      size="large"
      @input="search"
    ></el-input>
  </div>
</template>
<script setup>
import { ref, inject,defineProps,watch} from 'vue'
import _, {update} from 'lodash'
const { setIsShow } = inject('dialos-visible')
const { setKeywords } = inject('searchbar-keywords')
const emits=defineEmits(['update:act'])

let txt = ref('')
const handleClick = () => {
  setIsShow(true)
}
const search = _.debounce((e) => {
  setKeywords(e)
}, 500)
defineExpose({handleClick})

</script>
<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 5% auto 10px auto;
  .icon {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
