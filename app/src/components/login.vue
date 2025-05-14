<template>
  <Popup />
    <div class="form">
    <div class="content">
        <h1 class="healding-1-bold">Вход аккаунта</h1>
        <form @submit.prevent="handleLogin" id="one">
            <section class="auth-form">
                <div class="input-label">
                    <label class="label healding-2-bold" for="login">
                        Логин
                        <span class="label healding-2-bold" id="required">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="loginInput"
                        placeholder="Введите логин"
                        required
                        class="input input-default"
                        id="login"
                    >
                </div>
                <div class="input-label">
                    <label class="label healding-2-bold" for="password">
                        Пароль
                        <span class="label healding-2-bold" id="required">*</span>
                    </label>
                    <input
                        type="password"
                        v-model="password"
                        placeholder="Введите пароль"
                        required
                        class="input input-default"
                        id="password"
                    >
                </div>
                <a href="/register"><p class="texting-1">Нет аккаунта?</p></a>
            </section>
            <button class="button button-primary healding-3">Войти</button>
        </form>
    </div>
        <img src="../img/Login Art.jpg" alt="">
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../http-common' 
import {popup} from '../module/script/usePopup'
import Popup from "../module/popup.vue"

const loginInput = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''

  // 💡 Простая валидация
  if (!loginInput.value || !password.value) {
    errorMessage.value = 'Логин и пароль обязательны'
    return
  }

  try {
    const response = await http.post('/login', {
      login: loginInput.value,
      password: password.value
    })
    const user = response.data.user
    localStorage.setItem('user', JSON.stringify(user))

    if (user.role === 'Преподаватель') {
      popup('success', `Добрый день, ${user.teacher.name}`, 'Очень рады видеть вас снова')
      setTimeout(()=> {
        router.push('/dashboardTeacher')
      }, 2000)
    
      
    } else if (user.role === 'Студент') {
      router.push('/dashboardStudent')  
    } else if (user.role ==='Администратор'){
      router.push('/groupAdmin')
    }
    
    else {
      router.push('/login')
    }
  } catch (error) {
    // 💥 Ошибка авторизации
    if (error.response?.status === 401 || error.response?.status === 400) {
      errorMessage.value = 'Неверный логин или пароль'
      popup('error', 'Ошибка при входе', 'Неверный логин или пароль.Попробуйте еще раз')
    } else {
      errorMessage.value = 'Сервер не отвечает'
      popup('error', 'Ошибка сервера', 'попробуйте соверршить вход чуть позже')
    }
    console.error('Ошибка логина: ', error)
    popup('error', 'Неверный логин или пароль', 'попробуйте еще раз')
  }
}
</script>

<style scoped>
@import '../css/pages/auth.css';
</style>