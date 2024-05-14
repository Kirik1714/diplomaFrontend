<script setup>
import { ref, reactive, onMounted } from 'vue';
import ScrollPanel from 'primevue/scrollpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Paginator from 'primevue/paginator';
import Image from 'primevue/image';
import { useRoute } from 'vue-router'


import { useMedicineStore } from '../stores/MedicineStore.js';
import { useBasketStore } from '../stores/BasketStore.js';
const basketStore = useBasketStore();
const medicineStore = useMedicineStore();
const route = useRoute();



// Реактивные переменные для пагинации
const pagination = reactive({
  first: 0, // Первая запись на странице
  totalRecords: 0, // Общее количество записей
});

// Загрузка данных при монтировании компонента
onMounted(() => {
  getMedicine(route.params.id);
});

// Метод для загрузки данных и обновления пагинации
async function getMedicine(id) {
  try {
    // Загружаем данные о лекарстве
    await medicineStore.getMedicine(id);


    // Обновляем данные пагинации
    pagination.totalRecords = medicineStore.medicine.images.length;
  } catch (error) {
    console.log('Ошибка получения лекарства', error);
  }
}

</script>

<template>
  <div class="mx-44 py-10 ">
    <div class=" flex flex-col p-3">
      <div class="flex gap-12 ">
        <div class=" flex flex-col w-6/12">
          <!-- Проверка перед использованием images -->
          <div class="w-full">
            <div class="pb-3" v-if="medicineStore.medicine.images && medicineStore.medicine.images.length > 0">
              <Image :src="medicineStore.medicine.images[pagination.first]" alt="Image" width="570" imageClass="h-96"
                preview />
            </div>
            <div class="">

              <Paginator v-model:first="pagination.first" :rows="1" :totalRecords="pagination.totalRecords"
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate=" {first} из {totalRecords} " />


            </div>

          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="font-bold	text-3xl	">{{ medicineStore.medicine.name }}</div>
          <div class="font-semibold	 ">Лекарственная форма: <span class="font-light">{{ medicineStore.medicine.form
          }}</span> </div>
          <div class="font-semibold	">Дозировка: <span class="font-light">{{ medicineStore.medicine.dosage }}</span>
          </div>
          <div class="font-semibold	">Упаковка: <span class="font-light">{{ medicineStore.medicine.packaging }}</span>
          </div>
          <div class="font-semibold	">Фармакотерапевтическая группа, ATX: <span class="font-light">{{
            medicineStore.medicine.atx }} </span> </div>
          <div class="font-semibold pt-2 ">Описание: <span class="font-light leading-5">{{
            medicineStore.medicine.description }}</span> </div>
          <div class="font-semibold  ">Состав: <span class="font-light leading-5">{{ medicineStore.medicine.structure
          }}</span> </div>

        </div>
      </div>
      <div class="mt-10">
        <Accordion :activeIndex="0">
          <AccordionTab header="ПОКАЗАНИЯ К ПРИМЕНЕНИЮ">
            <p class="m-0 leading-6">
              {{ medicineStore.medicine.indications }}
            </p>
          </AccordionTab>
          <AccordionTab header="ПРОТИВОПОКАЗАНИЯ">
            <p class="m-0 leading-6">
              {{ medicineStore.medicine.contraindications }}
            </p>
          </AccordionTab>
          <AccordionTab header="СПОСОБ ПРИМЕНЕНИЯ И ДОЗЫ">
            <p class="m-0 leading-6">
              {{ medicineStore.medicine.methods }}
            </p>
          </AccordionTab>
          <AccordionTab header="УПАКОВКА И УСЛОВИЯ ОТПУСКА ИЗ АПТЕК">
            <p class="m-0 leading-6">
              {{ medicineStore.medicine.release }}
            </p>
          </AccordionTab>
        </Accordion>
      </div>

      <div class="m pt-10 ">
        <div class="font-semibold text-2xl mb-5">Наличие и цены</div>
        <ScrollPanel style="width: 100%; height:300px;" v-if="medicineStore.medicine.pharmacies?.length > 0">
          <div class="flex justify-between items-center border-2 rounded-lg p-4  hover:bg-gray-100 "
            v-for="pharmacies of medicineStore.medicine.pharmacies">
            <div class=" flex flex-col gap-1 w-2/5">

              <div class="text-gray-600 ">Название аптек: <span class="font-medium text-black">{{ pharmacies.name
              }}</span></div>
              <div class="text-gray-600 ">Адрес аптеки: <span class="font-medium text-black">{{ pharmacies.address
              }}</span></div>
              <div class="text-gray-600 ">Режим работы : С <span class="font-medium text-black">{{
                pharmacies.work_start.slice(0, 5) }}</span> по <span class="font-medium text-black">{{
    pharmacies.work_end.slice(0, 5) }}</span> </div>
              <div class="text-gray-600 text-lg	 ">Телефон: <span class="font-medium text-black">{{ pharmacies.phone
              }}</span></div>
            </div>
            <div :class="{ 'text-red-600': pharmacies.quantity <= 0, 'text-green-600': pharmacies.quantity > 0 }"> {{
              pharmacies.availability }} </div>

            <div class="font-bold	text-lg	"> {{ Number(pharmacies.total_price).toFixed(2) }} BYN</div>
            <div class="mr-3">
              <div
                v-if="basketStore.medicinesInBasket.find(item => item.medicine.id === medicineStore.medicine.id && item.pharmacy.id === pharmacies.id)">
                <div class="flex items-center w-24  gap-10 ">
                  <div class="flex gap-3 bg-neutral-200 w-full justify-evenly pt-2 pb-2  rounded-lg">
                    
                    <div class="hover:text-green-600">
                      <i class="pi pi-minus"
                        @click="basketStore.minusItemFromBasket(medicineStore.medicine.id, pharmacies.id)"></i>
                    </div>
                    {{ basketStore.medicinesInBasket.find(item => item.medicine.id === medicineStore.medicine.id &&
                     item.pharmacy.id === pharmacies.id).count }}
                      
                      <div class="hover:text-green-600">
  
                        <i class="pi pi-plus"
                          @click="basketStore.addToBasket({ medicine: medicineStore.medicine, pharmacies })"></i>
                      </div>
                  </div>


                </div>

              </div>
              <div v-else-if="pharmacies.quantity > 0">
                <div @click="basketStore.addToBasket({ medicine: medicineStore.medicine, pharmacies})"
                  class="bg-green-700 p-2  w-24  text-center text-white hover:bg-green-600 border-2 rounded-lg transition duration-150 ease-in-out">
                  Заказать
                </div>
              </div>

              <!-- Ищем объект корзины с соответствующим medicineId и pharmacyId -->

              <div v-else>
                В лист ожидания
              </div>
            </div>
          </div>




        </ScrollPanel>
        <div class="flex justify-center flex-col items-center" v-else>
          <div class="text-center text-lg font-semibold mb-2">Нет в наличии или под заказ</div>
          <router-link to="/medicines" class="text-blue-600 hover:underline">Вернуться</router-link>
        </div>

      </div>


    </div>

    <!-- Добавляем пагинацию -->
  </div>
</template>

<style scoped>
.p-image-preview-container {
  width: 470px;

}</style>