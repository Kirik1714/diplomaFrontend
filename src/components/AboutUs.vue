<template>
  <div class="relative">
    <div class="image-container absolute">
      <img src="../assets/images/banner/pharmacist-at-work.jpg" alt="" class="blurry">
    </div>
    <div :class="{ 'show': showContent }" class="content-on-image">
      <div class="mx-auto py-14 mr-32 flex flex-col  items-end">
        <h1 class="text-5xl font-bold mb-4 mt-32  colorGB">Немного о нас</h1>
        <p class="text-2xl mb-4">О сети аптек<br />PharmaPulse</p>
        <p class="text-lg leading-relaxed text-white   w-2/5  text-justify">
          PharmaPulse - это современная сеть аптек, стремящаяся предложить клиентам не только высококачественные
          медикаменты, но и профессиональные консультации фармацевтов. Мы гордимся широким ассортиментом продукции,
          инновационными сервисами доставки и акцентом на здоровый образ жизни, делая заботу о вашем здоровье нашим
          приоритетом.
        </p>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showContent = ref(false);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 100); // Попробуйте изменить эту задержку по своему усмотрению
});
</script>

<style scoped>
/* Добавим стили для размытия изображения */
.blurry {
  filter: blur(3px);
}

.content-on-image {
  transform: translateX(100%);
  transition: transform 1s ease;
}

.show {
  transform: translateX(0%);
}

.colorGB {
  color: rgb(22, 37, 28);
}

/* Стили для контента на изображении */
/* Стили для заголовка */
h1 {
  font-family: 'Montserrat', sans-serif;
}

/* Стили для подзаголовка */
p.text-2xl {
  font-weight: bold;
  opacity: 0.8;
}

/* Стили для основного текста */
p.text-lg {
  line-height: 1.8;
}
</style>
