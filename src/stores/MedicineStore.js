import axios from "axios";
import { defineStore } from "pinia";
import { useFilterStore } from "./FilterStore";
import { ref } from "vue";
const filterStore=useFilterStore();

export const useMedicineStore = defineStore("medicine", {
  state: () => ({
    medicines: [],
    medicine: {},
    isLoading: ref(false),
    current_page:0,
    
    totalCountMedicines: ref(null), 

  }),
  actions: {
    async getMedicines(selectedCategories, selectedForms,selectedOption,selectedSuppliers, searchValue,page=1) {
      try {
          if (!selectedCategories && !selectedForms && !selectedOption && !selectedSuppliers && !searchValue) {
              console.log('No filters selected. Fetching all medicines...');
              console.log('page:',page);
              this.isLoading = true;
              const supplierIds = selectedSuppliers?.map(supplier => supplier.id);

              const { data } = await axios.get("http://backenddimploma/api/medicines",{
              
                params: {
                  classification: selectedCategories || null,
                  selectedForms: selectedForms || null,
                  sorted: selectedOption?.code || null,
                  supplier: supplierIds || null,
                  search: searchValue || null,
                  page
                }
              
              });
              console.log('Response Data:', data);
              this.medicines = data.data;
              this.totalCountMedicines=data.total;
              this.current_page= data.current_page;


          } else {  
              console.log('classification:', selectedCategories);
              console.log('Filters:', selectedForms);
              console.log('Filters:', selectedOption);
              console.log('Filters:', searchValue);


              this.isLoading = true;
              const supplierIds = selectedSuppliers?.map(supplier => supplier.id);

              const { data } = await axios.post("http://backenddimploma/api/medicines", {
                  classification: selectedCategories || null,
                  selectedForms: selectedForms || null,
                  sorted: selectedOption?.code || null,
                  supplier: supplierIds || null,
                  search: searchValue || null,
                  page
               
              });
              filterStore.searchValue='';

              
              // console.log('Response Data:', data);
              this.medicines = data.data;
              this.totalCountMedicines=data.total;
              this.current_page= data.current_page;
          }
      } catch (error) {
          console.error('Ошибка получения медикаментов', error);
      } finally {
          this.isLoading = false;
      }
  },
  
  
    async getMedicine(id) {
      try {
    
          const { data } = await axios.get(`http://backenddimploma/api/medicines/${id}`)
        console.log(data);
        this.medicine = data
      } catch (error) {
        console.log('Ошибка получения лекарства',error);
        
      }
    },
    getMinPrice(medicineId) {

      const medicine = this.medicines.find((item) => item.id === medicineId);
      if (!medicine || !medicine.pharmacies || medicine.pharmacies.length === 0) {
        return null;
      }
    
      const minPrice = Math.min(...medicine.pharmacies.map((pharmacy) => pharmacy.total_price));
      
      // Округление до двух десятичных знаков
      const roundedMinPrice = Number(minPrice.toFixed(2));
    
      return roundedMinPrice;
    },
    
  },
});
