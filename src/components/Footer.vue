<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


</script>

<template>
    <div class="">
        <div class="flex  justify-evenly mt-8">

            <div class="border   ">
                <a href="https://borimed.com/" target="_blank">

                    <img src="../assets/images/partners/borimed.png" class=" foto" alt="">
                </a>
            </div>
            <div class="border  ">
                <a href="https://president.gov.by/ru" target="_blank">

                    <img src="../assets/images/partners/Center.png" class=" foto" alt="">
                </a>
            </div>
            <div class="border    ">
                <a href="https://gospharmnadzor.by/" target="_blank">

                    <img src="../assets/images/partners/gy.jpg" class=" foto" alt="">
                </a>
            </div>
            <div class="border  ">
                <a href="https://minzdrav.gov.by/" target="_blank">

                    <img src="../assets/images/partners/Med.png" class=" foto" alt="">
                </a>
            </div>
            <div class="border   ">
                <a href="https://24health.by/" target="_blank">
                    <img src="../assets/images/partners/People.png" class=" foto" alt="">
                </a>
            </div>
        </div>

        <div class="border-t-2 mt-10 pt-10 stick_top ml-20 mr-20 flex gap-5 items-center justify-evenly mb-10 ">
            <div class="leading-7 flex flex-col gap-5">
                <div class="">
                    © 2024 РУП «ФармаПульс» <br />
                    Дата внесения сведений в<br />
                    Торговый реестр Республики Беларусь - 01.09.2020.
                </div>
                <div class=" flex gap-5">
                <i class="pi pi-instagram" style="font-size: 1.5rem"></i>
                <i class="pi pi-telegram" style="font-size: 1.5rem"></i>
                <i class="pi pi-whatsapp" style="font-size: 1.5rem"></i>
                <i class="pi pi-youtube" style="font-size: 1.5rem"></i>
                <i class="pi pi-telegram" style="font-size: 1.5rem"></i>
                <i class="pi pi-facebook" style="font-size: 1.5rem"></i>

       


                </div>
            </div>
            <div class="stick h-28  "></div>
            <div class=" flex gap-5 flex-col items-center">
                <i class="pi pi-envelope" style="font-size: 2rem"></i>

                <a href="mailto:kirill@bk.by" target="_blank">kirill@bk.by</a>
            </div>
            <div class=" h-28  stick "> </div>

            <div class="flex gap-5 flex-col items-center ">
                <i class="pi pi-phone" style="font-size: 2rem"></i>
                <a href="tel:+375 29 123 45 67">+375 29 123 45 67</a>
            </div>
            <div class="stick h-28  "></div>
            <div class=" pr-5 flex gap-5   flex-col items-center">
                <i class="pi pi-map" style="font-size: 2rem"></i>
                <a href="https://yandex.ru/maps/?text=Борисов, ул. Чапаева, 64" class="text-center" target="_blank">г. Борисов,<br/> ул. Чапаева, 64,</a>

               
            </div>
            
            
        </div>
    </div>
</template>

<style scoped>
.foto {

    height: 90px;
}
.stick {
    --tw-border-opacity: 1;
    border: 2px solid rgb(217 249 157 / var(--tw-border-opacity));
}
.stick_top{
    --tw-border-opacity: 1;
    border-top: 2px solid rgb(190 242 100 / var(--tw-border-opacity));
}
</style>
