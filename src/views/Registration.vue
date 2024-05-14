<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/UserStore.js'
import FloatLabel from 'primevue/floatlabel';
import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const userStore = useUserStore();
const name = ref(null);
const email = ref(null);
const password = ref(null);
const password_confirmation = ref(null);

const passwordMismatch = computed(() => {
    return password.value !== password_confirmation.value
});


</script>

<template>
    <div class="text-lg font-semibold w-1/4 mx-auto  ">
        <div class="border shadow-2xl bg-white absolute z-10 pr-10 pl-10  flex flex-col gap-10 rounded-lg	top-16  ">
            <div class="flex flex-col gap-10 items-center">
                <div class="pt-5 text-xl">Регистрация</div>
                <div class="flex flex-col  gap-5">
                    <FloatLabel>
                        <InputText id="mail" v-model="email" class="w-72" />
                        <label for="mail">Почта</label>
                        
                    </FloatLabel>
                    <InlineMessage class="text-xs w-72	 " v-if="userStore.error.email">{{ userStore.error.email[0] }}</InlineMessage>
                </div>
                <div class="flex flex-col  gap-5">
                    <FloatLabel>
                        <InputText id="login" v-model="name" class="w-72" />
                        <label for="login">Логин</label>
                        
                        
                    </FloatLabel>
                    <InlineMessage v-if="userStore.error.name">{{ userStore.error.name[0] }}</InlineMessage>
                </div>
                <div class="flex flex-col  gap-5">
                    <FloatLabel>
                        <Password v-model="password" id="password" promptLabel="Введите пароль(от 5 символов)" weakLabel="Плохой пароль"
                            mediumLabel="Средний пароль" strongLabel="Хороший пароль" toggleMask inputClass="w-72"
                            :class="{ 'p-invalid': passwordMismatch }" />
                        <label for="password">Пароль</label>
                        
                    </FloatLabel>
                    <small v-if="passwordMismatch">Пароли не совпадают</small>
                    <InlineMessage   class="text-xs w-72" v-if="userStore.error.password">{{ userStore.error.password[0] }}</InlineMessage>


                </div>
                <div class="flex flex-col  gap-5">
                    <FloatLabel>
                        <Password v-model="password_confirmation" id="confirm_password" promptLabel="Введите пароль(от 5 символов)"
                            weakLabel="Плохой пароль" mediumLabel="Средний пароль" strongLabel="Хороший пароль" toggleMask
                            inputClass="w-72" :class="{ 'p-invalid': passwordMismatch }" />
                        <label for="password_confirmation">Повторите пароль</label>
                        
                    </FloatLabel>
                    <InlineMessage  class="text-xs w-72" v-if="userStore.error.password_confirmation">{{ userStore.error.password_confirmation[0] }}</InlineMessage>
                </div>
                <div class="">
                    <Button label="Регистрация" @click="userStore.createUser({ name, email, password, password_confirmation })"
                        class="p-2 text-black hover:bg-green-600 hover:text-white w-72" 
                        :class="{ 'p-disabled': passwordMismatch || !email || !password || !name || password.length < 5 }" />
                </div>
            </div>
            <div class="justify-end	  text-base	">
                <router-link to="/login" rel="noopener">
                    <Button label="Есть аккаунт? Войти" link />
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
    height: 845px;
    background: linear-gradient(270deg, #8bee7c 0%, #ecd198 100%);
}</style>
