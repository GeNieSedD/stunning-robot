<template>
    <navigation />
</template>
  
  <style scoped>
  @import "../css/components/block/buttons/chapter.css";
  @import "../css/components/block/buttons/button.css";
  @import "../css/components/block/inputs/input.css";
  @import "../css/pages/auth.css";
  @import "../css/components/variables/text-style.css";
  @import "../css/components/variables/variables.css";
  @import "../css/components/block/other/other.css";
  .error {
  color: red;
  margin-top: 10px;
}
  </style>
  <script setup>
import navigation from "../module/navigation.vue"
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '../http-common'

// 📦 Переменные
const router = useRouter()
const user = ref(null)
const groupTitles = ref([])




// 🚀 onMounted — загрузка данных и защита
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/login')
    return
  }
  user.value = JSON.parse(storedUser)
  console.log('✅ USER LOADED: ', user.value)


})

  </script>
  