<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useFilterStore } from '../stores/FilterStore.js';
import { useUserStore } from '../stores/UserStore.js';

import TieredMenu from 'primevue/tieredmenu';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();

const userStore = useUserStore();
const filterStore = useFilterStore();

const menu = ref();
const items = ref([
    {
        label: 'Заказы',
        icon: 'pi pi-list',
        command: () => {
            router.push({ name: "Orders", params: { id: userStore.user?.id } });
        }
    },
    {
        label: 'Корзина',
        icon: 'pi pi-shopping-cart',
        command: () => {
            router.push({name:"basket"})
        }
    },
    {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: async () => {
            await userStore.logoutUser();
        }
    }
]);

watch(() => userStore.user, (newUser) => {
    if (newUser && newUser.is_admin === 1) {
        items.value.push({
            label: 'Админ панель',
            icon: 'pi pi-cog',
            command: () => {
                window.open('http://backenddimploma/', '_blank'); // Открыть в новой вкладке
            }
        });
    } else {
        // Убираем админ панель, если пользователь больше не админ
        items.value = items.value.filter(item => item.label !== 'Админ панель');
    }
}, { immediate: true });

const toggle = (event) => {
    menu.value.toggle(event);
};

const handleEnter = () => {
    console.log('Нажата клавиша Enter');
    if (router.currentRoute.value.path === '/') {
        router.push({ name: 'medicines', query: { search: filterStore.searchValue.trim() } });
    } else if (router.currentRoute.value.path === '/medicines') {
        router.replace({ query: { search: filterStore.searchValue.trim() } });
    }
};
</script>

<template setup>
<div class="flex items-center justify-between mx-28 my-10">
    <div class="logo flex w-72 items-center gap-6">
        <router-link to="/" rel="noopener">
            <img src="../assets/images/svg3/logo.png" alt="">
        </router-link>
        <RouterLink to="/medicines">
            <Button label="Продукция" class="text-white m-2" />
        </RouterLink>
    </div>
    <div class="flex flex-col gap-8">
        <nav class="flex gap-5">
            <RouterLink to="/delivery" class="hover:text-green-600">Условия доставки</RouterLink>
            <RouterLink to="/payment" class="hover:text-green-600">Условия оплаты</RouterLink>
            <RouterLink to="/refund" class="hover:text-green-600">Возврат и отмена заказа</RouterLink>
            <RouterLink to="/responsibility" class="hover:text-green-600">Памятка потребителя</RouterLink>
        </nav>
        <IconField iconPosition="left" class="w-full">
            <InputIcon class="pi pi-search"></InputIcon>
            <InputText @keydown.enter="handleEnter" v-model="filterStore.searchValue" placeholder="Поиск по названию" class="h-10 pl-9 w-full" />
        </IconField>
    </div>
    <div class="flex flex-col items-center gap-5">
        <div class="flex gap-2 items-center">
            <i class="pi pi-phone" style="font-size: 1rem"></i>
            <span>+375 45 123 45 67</span>
        </div>
        <div class="flex justify-between items-center gap-5">
            <div v-if="!userStore.user">
                <RouterLink to="/login" class="hover:text-green-600">
                    <div class="flex flex-col items-center gap-3">
                        <i class="pi pi-user" style="font-size: 1.5rem"></i>
                        <span>Войти</span>
                    </div>
                </RouterLink>
            </div>
            <div v-else>
                <Button type="button" :label="userStore.user.name" class="text-2xl" icon="pi pi-user" @click="toggle" text rounded aria-label="User" aria-haspopup="true" aria-controls="overlay_tmenu" />
                <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup class="popup" />
            </div>
            <div v-if="!userStore.user" class="flex flex-col items-center gap-3">
                <RouterLink to="/basket">
                    <div class="flex flex-col items-center gap-3">
                        <i class="pi pi-shopping-cart" style="font-size: 1.5rem"></i>
                        <span>Корзина</span>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</div>
</template>
