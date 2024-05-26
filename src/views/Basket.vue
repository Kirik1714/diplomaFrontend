<script setup>
import MedicineCartInBasket from '@/components/MedicineCartInBasket.vue';
import EmptyBasket from '@/components/EmptyBasket.vue';
import { useUserStore } from '../stores/UserStore.js';
import { useBasketStore } from '../stores/BasketStore.js';
const basketStore = useBasketStore();
const  userStore= useUserStore();

</script>

<template>
    <div class="mx-28 my-10 ">
        <div class="" v-if="basketStore.medicinesInBasket.length === 0">
            <div class="text-4xl font-medium">Корзина</div>
            <EmptyBasket />
        
        </div>
        <div class="" v-else>

            <div class="text-4xl	font-medium	">Оформление заказа</div>
            <div class="text-lg	font-light mt-10">Самовывоз</div>
            <div class="flex  flex-col gap-10 mt-5">
                <div class="" v-for="medicine of basketStore.medicinesInBasket">
                    <MedicineCartInBasket  :medicine="medicine" />
    
                
                  
    
    
                </div>
    
                <div class="flex justify-between items-center">
                    <RouterLink to="/medicines">
                        <Button label="Продолжить покупки" />
    
                    </RouterLink>
    
                    <div class=" bg-emerald-100 p-7 rounded-lg	">
                        <div class="flex justify-between items-center text-3xl	gap-5 mb-5"> 
                            <div class="">Итого:</div>
                            <div class="font-semibold		">{{Number( basketStore.getTotalPrice()).toFixed(2) }} BYN</div>
                        </div>
                        <Button label="Оформить заказ"  @click="userStore.createOrder()"  class="w-full"/>
    
                      
                     </div>
                </div>
                
    
            </div>
        </div>

    </div>
</template>


<style scoped>
.br {
    --tw-bg-opacity: 1;

    border: 1px solid  rgb(229 229 229 / var(--tw-bg-opacity));
}
</style>