<script setup>
import { ref,watch } from 'vue';
import { useUserStore } from '../stores/UserStore.js';
import FloatLabel from 'primevue/floatlabel';
import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const userStore=useUserStore();


const email=ref(null);
const password=ref(null);

const LoginUser = async (emailIN,passwordIN) => {

    password.value=null
    email.value=null
        await userStore.loginUser({email:emailIN,password:passwordIN})
        
   
}



</script>

<template>
    <div class="text-lg font-semibold w-1/4 mx-auto  prevent-scroll 	">
        <div class="border shadow-2xl bg-white absolute z-10 p-4  flex flex-col gap-10 rounded-lg 	  ">
            <div class="flex flex-col gap-10 items-center">
                <div class="pt-5 text-xl">Форма входа </div>
                <div class="">
                    <FloatLabel>
                        <InputText id="username" v-model="email"  class="w-72" />
                        <label for="username">Логин</label>
                    </FloatLabel>
                </div>
                <div class="">
                    <FloatLabel>

                        <Password v-model="password" id="password" :feedback="false"  toggleMask inputClass="w-72" />
                        <label for="password">Пароль</label>
                    </FloatLabel>

                </div>
                <div class="flex flex-col items-center gap-3">
                    <InlineMessage severity="error" class="w-72" v-if="Object.keys(userStore.error).length">{{userStore.error.error}}</InlineMessage>
                    <Button label="Авторизироваться " @click.prevent="LoginUser(email,password)"  class=" p-2 text-black hover:bg-green-600 hover:text-white w-72 " />

                </div>
            </div>
            <div class="justify-end	  text-base	">
                <router-link to="/registration"  rel="noopener">
                    <Button label=" Нет аккаунта?Регистрация" link />
                </router-link>

            </div>
        </div>
    </div>
    <div class="overlay"></div>
</template>

<style scoped>


.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #8bee7c 0%, #ecd198 100%)
}
</style>