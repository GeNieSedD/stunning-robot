<template>
    <Popup />
    <div class="form">
    <div class="content">
        <h1 class="healding-1-bold">Регистрация аккаунта</h1>
        <form @submit.prevent="register" id="one">
            <section class="auth-form">
                <div class="input-label">
                    <label class="label healding-2-bold" for="login">
                        Логин 
                        <span class="label healding-2-bold" id="required">*</span>
                    </label>
                    <input 
                        type="text" 
                        v-model="login"
                        placeholder="Введите логин" 
                        required 
                        class="input-default" 
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
                        class="input-default" 
                        id="password"
                    >
                </div>
                <a href="/login"><p class="texting-1">есть аккаунт?</p></a>
            </section>
            <button type="submit" class="button button-primary healding-3">Зарегистрироваться</button>
        </form>
    </div>
        <img src="../img/Login Art.jpg" alt="">
    </div>
</template>

<script>
import http from '../http-common';
import {popup} from '../module/script/usePopup'
import Popup from "../module/popup.vue"
export default {
    data() {
        return {
            login: '',
            password: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await http.post('/register', { login: this.login, password: this.password });
                popup('success', `Регистрация успешна`, '')
            } catch (error) {
                alert('Registration failed: ' + error.response.data.message);
            }
        }
    }
}
</script>

<style scoped>
@import '../css/components/block/buttons/button.css';
@import '../css/components/block/inputs/input.css';
@import '../css/pages/auth.css';
@import '../css/components/variables/text-style.css';
@import '../css/components/variables/variables.css';
</style>