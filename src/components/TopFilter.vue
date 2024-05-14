<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFilterStore } from '../stores/FilterStore.js';
import { useMedicineStore } from '../stores/MedicineStore.js';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';

const medicineStore = useMedicineStore();
const filterStore = useFilterStore();


watch([() => filterStore.selectedOption , () => filterStore.selectedSuppliers] , () => {

    medicineStore.getMedicines(filterStore.selectedCategories, filterStore.selectedForms, filterStore.selectedOption, filterStore.selectedSuppliers);
}) 


</script>

<template>
 <div class="flex items-center gap-10">
                <Dropdown v-model="filterStore.selectedOption" :options="filterStore.options" optionLabel="name" placeholder="Сортировка"
                    class=" md:w-20rem" />
                <MultiSelect v-model="filterStore.selectedSuppliers" :options="filterStore.suppliers" filter optionLabel="name"
                    placeholder="Производители" :selectedItemsLabel="'{0} выбрано производителей'" :maxSelectedLabels="3"
                    class=" md:w-20rem" />

                <div class="text-xs text-green-400 cursor-pointer underline decoration-1" @click="filterStore.clearOptions()">{{ (filterStore.selectedOption ||
                    filterStore.selectedSuppliers) ? 'Очистить фильтр' : '' }} </div>
            </div>

</template>

<style scoped>  
</style>