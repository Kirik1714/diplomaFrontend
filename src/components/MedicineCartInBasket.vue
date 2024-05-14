<script setup>
import Image from 'primevue/image';
import { useBasketStore } from '../stores/BasketStore';
const props = defineProps({
    medicine: {
        type: Object,
        required: true
    }
})
const basketStore = useBasketStore();


</script>

<template>
        <div class="border br	 rounded">
                    <div class="mb-5  bg-neutral-200	 p-5	">
                        Аптека {{ props.medicine.pharmacy.name }} - {{ props.medicine.pharmacy.address }}
        
                    </div>
                    <div class="flex justify-between items-center p-5">
                        <div class="flex gap-10 items-center ">
        
                            <Image :src=" props.medicine.medicine.images[0] " imageClass="h-28" alt="Image" width="160" />
                            <div class="flex flex-col gap-4 text-sm		">
                                <div class="">
                                    {{ props.medicine.medicine.name }} - {{ props.medicine.medicine.dosage }} упаковка {{ props.medicine.medicine.packaging }}

                                </div>
                                <div class="">
                                    Способ доставки:Самовывоз - {{ props.medicine.pharmacy.address }}
                                </div>
        
                            </div>
                        </div>
                        <div class="flex items-center  gap-10 ">
                            <div class="flex gap-3 bg-neutral-200 pl-3 pr-3 pt-2 pb-2  rounded-lg ">
                                
                                <div class="hover:text-green-600" @click="basketStore.minusItemFromBasket(props.medicine.medicine.id, props.medicine.pharmacy.id)">
        
                                     <i class="pi pi-minus" ></i>
                                 </div>
                                {{ props.medicine.count }}
                                <div class="hover:text-green-600" @click="basketStore.addToBasket({ medicine: props.medicine.medicine, pharmacies: props.medicine.pharmacy })">
        
                                    <i class="pi pi-plus"></i>
                                </div>
        
                                </div>
                                
                                <div class="">{{ Number(props.medicine.medicine.price*props.medicine.count).toFixed(2) }} BYN</div>
                                <div class="" @click="basketStore.removeFromBasket(props.medicine.medicine.id, props.medicine.pharmacy.id)">Удалить</div>
                        </div>
        
        
                    </div>
                </div>


</template>


<style scoped>

</style>