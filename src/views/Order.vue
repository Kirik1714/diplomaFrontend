<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useRoute } from 'vue-router';
import CartInOrder from '../components/CartInOrder.vue';

const userStore = useUserStore();
const route = useRoute();

const orderId = ref(null);

onMounted(() => {
  const id = +route.params.id;
  userStore.getOrders(id);
});
</script>

<template>
  <div class="mx-28 py-10">
    <div class="text-4xl font-medium">
      Информация о заказах
    </div>
    <div class="flex flex-col gap-5">
      <CartInOrder
        v-for="order in [...userStore.orders].reverse()"
        :key="order.id"
        :order="order"
      ></CartInOrder>
    </div>
  </div>
</template>

<style>
</style>
