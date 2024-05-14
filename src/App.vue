<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <div class="wrapper  flex flex-col">
    <div class=" bg-white w-full stick_bottom">
      <Header />
    </div>
    <div class="grow">

      <RouterView />
    </div>
    <div class="">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.stick_bottom {
  --tw-border-opacity: 1;
    border-bottom:4px solid rgb(132 204 22 / var(--tw-border-opacity));
}
</style>
