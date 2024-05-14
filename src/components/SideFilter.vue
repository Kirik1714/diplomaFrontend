<script setup>
import { ref ,onMounted} from 'vue'

import {useFilterStore} from '../stores/FilterStore.js'
import { useMedicineStore } from '../stores/MedicineStore.js';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
const props=defineProps({
    queryString:String,

})

const filterStore = useFilterStore();
const medicineStore = useMedicineStore();


function applyFilters() {
    console.log('Поиск',props.queryString );

    medicineStore.getMedicines(filterStore.selectedCategories, filterStore.selectedForms, filterStore.selectedOption, filterStore.selectedSuppliers, filterStore.searchValue=props.queryString);
}
const clearFilter=()=>{
    console.log('ТУт');
    filterStore.clearFilters();
    medicineStore.getMedicines( filterStore.selectedCategories, filterStore.selectedForms, filterStore.selectedOption, filterStore.selectedSuppliers, filterStore.searchValue=props.queryString);
}

</script>

<template>
     <div class="flex flex-col gap-5">
                <div class="filter  flex flex-col gap-2 border-2 w-72 bg-white rounded-lg p-4 gap-4">
                    <div class="bg-green-200  rounded-lg p-4">
                        <div class="text-sm font-bold">Область применения</div>
                        <div v-for="category of filterStore.categories" :key="category.id"
                            class="flex align-items-center gap-2 mt-2 text-sm">
                            <Checkbox v-model="filterStore.selectedCategories" :inputId="'' + category.id" name="category"
                                :value="category.id" class="mb-2" />
                            <label :for="category.key">{{ category.name }}</label>
                        </div>
                    </div>
                    <div class="">
                        <div class="text-sm font-bold">Форма применения</div>
                        <Dropdown v-model="filterStore.selectedForms" editable :options="filterStore.forms" filter optionLabel="name"
                            placeholder="Выберите форму" class="w-full  p-2" />

                    </div>

                </div>

 
                <div class="flex justify-between">

                    <Button label="Применить" @click="applyFilters" class=" p-2 text-black hover:bg-green-600 hover:text-white " />
                    
                    <Button label="Сбросить"  severity="secondary" @click="clearFilter()"  class=" p-2 text-black hover:bg-gray-600 hover:text-white" />

                </div>


            </div>
</template>

<style scoped>


</style>