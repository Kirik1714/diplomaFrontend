<script setup>
import { ref } from 'vue';
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { defineProps } from 'vue';

const props = defineProps({
    order: Object
});
console.log(props.order.id);

const activeOrderIndex = ref(0); // индекс активного (открытого) заказа

</script>

<template>
        <div  class="mt-5">
            <Panel 
                :header="'Заказ ' + order.order_number" 
                toggleable 
                :collapsed="index !== activeOrderIndex"
           
            >
                <div class=" flex flex-col gap-8">
                    
                    <div class="leading-6 flex flex-col br gap-5 rounded" v-for="product in order.products" :key="product.medicine.id">
                        <div class=" flex items-center gap-10 p-5    ">
                            <div>
                                <Image :src="product.medicine.images[0]" alt="Image" imageClass="h-32 rounded-lg" width="200" />
                                <div class="font-bold text-lg">{{ product.medicine.name }}.</div>
                            </div>
                            <div class="w-1/2	">
                                Дозировка: {{ product.medicine.dosage }}, Упаковка: {{ product.medicine.packaging }},
                                <br />
                                Адрес доставки: {{ product.pharmacy.address }} ({{ product.pharmacy.name }})
                                <br />
                                Количество: <span class="font-bold">{{ product.count }} </span> шт, Цена: <span class="font-bold">{{ (product.count * product.medicine.price).toFixed(2) }}</span> BYN
                            </div>
                            <div :class="['status', product.status === 'Отменен' ? 'status-cancelled' : product.status === 'Выдан' ? 'status-ready' : 'status-processing']">
                            {{ product.status ?? 'Принят в обработку' }}
                        </div>
                        </div>
                    </div>
                    <div class="mt-2 text-2xl font-bold">Итого: {{ order.total_price }} BYN</div>
                </div>
            </Panel>
        </div>
</template>

<style scoped>
.br {
    --tw-bg-opacity: 1;

border: 1px solid  rgb(229 229 229 / var(--tw-bg-opacity));
}
.status {
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #000000; /* белый цвет текста для всех статусов */
}

.status-cancelled {
    color: #ffffff; /* белый цвет текста для всех статусов */

    background-color: #f87171; /* красный фон для отмененных */
}

.status-ready {
    color: #ffffff; /* белый цвет текста для всех статусов */

    background-color: #4ade80; /* зеленый фон для готовых */
}

.status-processing {
    background-color: #e2e8f0; /* серый фон для обработки */
}
</style>
