<script setup>
import { onMounted, ref, watch } from 'vue';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { useMedicineStore } from '../stores/MedicineStore.js';
import { useFilterStore } from '../stores/FilterStore.js'

import Medicine from '@/components/Medicine.vue';
// import Paginator from '@/components/Paginator.vue';
import MedicineS from '@/components/Skeketon/MedicineS.vue';
import SideFilterS from '@/components/Skeketon/SideFilterS.vue';
import SideFilter from '@/components/SideFilter.vue';
import TopFilter from '@/components/TopFilter.vue';

const medicineStore = useMedicineStore();
const filterStore = useFilterStore();

const queryString = ref(route.query.search);




const clearSearch = () => {
    queryString.value = ''; // Очищаем значение поиска
    const currentPath = route.path; // Получаем текущий путь без параметров запроса
    router.push({ path: currentPath }); // Обновляем URL-адрес без параметров запроса
}
function fetchMedicines() {
    const currentPage = +(route.query.page)|| 1;
    console.log('Текущая страница:', currentPage); 
    medicineStore.getMedicines(
        filterStore.selectedCategories,
        filterStore.selectedForms,
        filterStore.selectedOption,
        filterStore.selectedSuppliers,
        filterStore.searchValue || queryString.value,
        page.value || currentPage
    );
}

onMounted(() => {
    queryString.value = route.query.search || '';

    fetchMedicines();
    filterStore.getCategories();
    filterStore.getForms();
    filterStore.getSuppliers();
});

const page = ref(0);
watch(() => page.value, () => {
    console.log('Новое значение page:', page.value);
    router.push({ query: { ...route.query, page: page.value } });

    fetchMedicines();
});


watch(() => route.query.search, () => {
    queryString.value = route.query.search ;
    console.log('Новое значение queryString:', queryString.value);

    console.log();
    
    fetchMedicines();
});
</script>   

<template>
    <div class="mx-28 py-10 flex flex-col ">
        <div v-if="queryString" class="flex justify-end	 gap-10 items-center">
            <div class="mb-2 text-2xl">Результат поиска: "{{ queryString }}"</div>
            <div class="cursor-pointer" @click="clearSearch">Очистить </div>
        </div>
        <div class="flex gap-10">
            <div class="">
                <div class="" v-if="filterStore.isLoadingForms || filterStore.isLoadingCategories">


                    <SideFilterS />
                </div>
                <div v-else>

                    <SideFilter :queryString="queryString" />
                </div>

            </div>
            <div class="grow flex flex-col">
                <div v-if="filterStore.isLoadingSuppliers" class="flex gap-10 ">
                    <Skeleton width="10rem" height="2rem"></Skeleton>
                    <Skeleton width="11.9rem" height="2rem"></Skeleton>

                </div>

                <TopFilter v-else />
                <div class="mt-6 grid grid-cols-3	 grow gap-10">
                    <div v-if="medicineStore.isLoading" v-for="i in 7" class="">
                        <MedicineS />

                    </div>
                    <div v-else v-for="medicine of medicineStore.medicines" :key="medicine.id">
                        <RouterLink :to="`/medicines/${medicine.id}`" rel="noopener">
                        
                        <Medicine :medicine="medicine" :suppliers="filterStore.suppliers" />

                    </RouterLink>
                    </div>

                </div>
                <div class=" mt-6">
                    <div v-if="medicineStore.isLoading" class="">
                        <Skeleton class="mb-2" height="3.8rem"></Skeleton>

                    </div>
                    <div class="" v-else>

                        <Paginator :rows="2" :totalRecords="medicineStore.totalCountMedicines" @page="page = $event.page + 1">
                            <template #start="slotProps">
                                Страница: {{ medicineStore.current_page }}



                            </template>
                        </Paginator>

                        <!-- <Paginator /> -->
                    </div>


                </div>

            </div>

        </div>
    </div>
</template>

<style scoped>
/* Изменяем цвет текста в списке выбора */

.p-listbox-item {
    color: black;
    /* Черный цвет текста */
}
</style>

