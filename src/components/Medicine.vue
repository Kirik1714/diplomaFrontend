<script setup>
import { useFilterStore } from '@/stores/FilterStore';
import { useMedicineStore } from '../stores/MedicineStore.js';
import Image from 'primevue/image';
const medicineStore = useMedicineStore();

const props = defineProps({
    medicine: {
        type: Object,
        required: true
    },
    suppliers: {
        type: Object,
        required: true
    }
})


</script>

<template>
    <div class="w-58 flex flex-col border-2 rounded-lg p-4 bg-white">
        <RouterLink :to="`/medicines/${props.medicine.id}`" rel="noopener">
        
            <div class="self-center"> 
                <Image :src="props.medicine.images[0]" alt="Image" imageClass="h-48 rounded-lg" width="230" />
            </div>
        </RouterLink>
        <div class="w-56 flex flex-col gap-1"> 
            <div v-if="medicineStore.getMinPrice(props.medicine.id) !== null" class="text-lg font-bold">
                От {{ medicineStore.getMinPrice(props.medicine.id) }} BYN
            </div>
            <div v-else class="text-lg font-bold text-red-600">
                Закончился
            </div>
            <div class="leading-5 text-sm cursor-pointer hover:text-green-500">
                {{ props.medicine.name }}
            </div>
            <div class="text-xs text-gray-400">
                {{ props.suppliers[props.medicine.supplier_id - 1]?.name }}
            </div>
        </div>
        <div class="mt-4 ">
            <Button label="Подробнее" class="bg-green-600 p-2 text-white hover:bg-green-500" />
        </div>
    </div>
</template>

<style scoped>

</style>