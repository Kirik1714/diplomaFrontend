<script setup>
import Button from 'primevue/button';

</script>

<template>
    <div class="banner-slogan flex justify-center ">
        <img src="../assets/images/banner/prod-slogan-bg.png" alt="">

        <div class="absolute text-white mt-44 text-4xl text-center flex flex-col items-center">
            Ваше здоровье - наша забота, <br>
            с любовью и страстью к каждой детали!
            <div class="text-2xl mt-10 ">

                <router-link to="/medicines"  rel="noopener">
                    <Button label="Каталог продукции" class="hover:bg-white hover:text-black transition duration-300 delay-150" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.banner-slogan {

    background: #45d153 url(/assets/css/../i/prod-slogan-bg.png) no-repeat 50% 50%;
    height: 400px;

}
</style>
