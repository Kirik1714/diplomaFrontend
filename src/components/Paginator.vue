<template>
    <div class="paginator">
      <button @click="decrementPage" :disabled="currentPage.value === 1">Prev</button>
      <span>{{ currentPage.value }}</span>
      <button @click="incrementPage" :disabled="currentPage.value === totalPages">Next</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useMedicineStore } from '../stores/MedicineStore.js';
  import { useFilterStore } from '../stores/FilterStore.js';
  
  const medicineStore = useMedicineStore();
  const filterStore = useFilterStore();
  
  const currentPage = ref(1);
  const rowsPerPage = ref(10);
  const totalPages = medicineStore.totalCountMedicines;
  
  const incrementPage = () => {
    if (currentPage.value < totalPages.value) {
        console.log('1111');
      currentPage.value++;
    }
  };
  
  const decrementPage = () => {
    if (currentPage.value > 1) {
        console.log('222');

      currentPage.value--;
    }
  };
  
  watch(() => medicineStore.totalCountMedicines, () => {
    totalPages = Math.ceil(medicineStore.totalCountMedicines / rowsPerPage.value);
  });
  
  watch(() => rowsPerPage.value, () => {
    totalPages = Math.ceil(medicineStore.totalCountMedicines / rowsPerPage.value);
  });
  </script>
  
  <style scoped>
  .paginator {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button {
    margin: 0 5px;
  }
  </style>
  