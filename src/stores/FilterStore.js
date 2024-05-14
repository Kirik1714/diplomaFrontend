import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filter", {
    state: () => ({
        searchValue: ref(''),
        categories:[],
        forms: [],
        suppliers: [],

        options : ref([
            { name: 'Сначала по алфавиту', code: 'alphabetical' },
            { name: 'Сначала дешевые', code: 'cheap' },
            { name: 'Сначала дорогие', code: 'expensive' }
        ]),
        selectedCategories: ref(),
        selectedForms: ref(),
        selectedOption: ref(), 
        selectedSuppliers: ref(),

        isLoadingCategories: ref(false),
        isLoadingForms: ref(false),
        isLoadingSuppliers: ref(false),
    }),
    actions: {
        async getCategories() {
            try {
                this.isLoadingCategories = true; // Установка isLoading в true перед выполнением запроса
                const { data } = await axios.get("http://backenddimploma/api/classification");
                this.categories = data;

            } catch (error) {
                console.log('Ошибка получения категорий', error);
            } finally {
                this.isLoadingCategories = false; // Установка isLoading в false после получения ответа
            }
        },
        async getForms() {
            try {
                this.isLoadingForms = true;
                const { data } = await axios.get("http://backenddimploma/api/forms");
                this.forms = data;
            } catch (error) {
                console.log('Ошибка получения форм', error);
            } finally {
                this.isLoadingForms = false;
            }
        },
        async getSuppliers() {
            try {
                this.isLoadingSuppliers = true;
                const { data } = await axios.get("http://backenddimploma/api/suppliers");
                this.suppliers = data;
            } catch (error) {
                console.log('Ошибка получения поставщиков', error);
            } finally {
                this.isLoadingSuppliers = false;
            }
        },
        clearFilters() {
            console.log('очистка фильтров');
            console.log(this.searchValue.value);
            this.selectedCategories = ref();
            this.selectedForms = ref();
        
        },
        clearOptions() {
            this.selectedSuppliers = ref();
            this.selectedOption = ref();
        }
    },
   
})