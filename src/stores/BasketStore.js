import  {defineStore} from "pinia";

import { ref, watch } from "vue";

export const useBasketStore = defineStore("basket", () => {
  const medicinesInBasket = ref([]); // Используйте ref для создания реактивного массива

  // При первой загрузке извлекаем данные из localStorage, если они там есть
  const medicineInLocalStorage = localStorage.getItem("medicinesInBasket");
  if (medicineInLocalStorage !== null) {
    medicinesInBasket.value = JSON.parse(medicineInLocalStorage);
  }

  const addToBasket = (medicine) => {
    console.log(medicine);
    const pharmacyId = medicine.pharmacies.id;
    const existingMedicineIndex = medicinesInBasket.value.findIndex(
      (item) =>
        item.medicine.id === medicine.medicine.id && item.pharmacy.id === pharmacyId
    );

    // Получаем количество доступного товара в аптеке
    const availableQuantity = medicine.pharmacies.quantity;

    if (existingMedicineIndex === -1) {
        // Если такого товара в корзине еще нет и количество доступно, добавляем его с количеством 1
        if (availableQuantity > 0) {
            medicinesInBasket.value.push({ medicine: medicine.medicine, pharmacy: medicine.pharmacies, count: 1 });
        } else {
            alert('Товар закончился на складе');
        }
    } else {
        // Если товар уже есть в корзине, проверяем доступное количество перед увеличением
        const currentCount = medicinesInBasket.value[existingMedicineIndex].count;
        if (currentCount < availableQuantity) {
            medicinesInBasket.value[existingMedicineIndex].count++;
        } else {
            alert('К сожелению товар закончился в аптеке');
        }
    }
};


  const minusItemFromBasket = (medicineId, pharmacyId) => {
    const existingMedicine = medicinesInBasket.value.find(
      (item) => item.medicine.id === medicineId && item.pharmacy.id === pharmacyId
    );

    if (existingMedicine && existingMedicine.count > 1) {
      existingMedicine.count--;
    } else {
      removeFromBasket(medicineId, pharmacyId);
    }
  };

  const removeFromBasket = (medicineId, pharmacyId) => {
    medicinesInBasket.value = medicinesInBasket.value.filter(
      (item) => !(item.medicine.id === medicineId && item.pharmacy.id === pharmacyId)
    );
  };

  const getTotalPrice = () => {
    return medicinesInBasket.value.reduce((total, item) => total + item.medicine.price * item.count, 0);
  }
  watch(medicinesInBasket,(state)=>{

    localStorage.setItem('medicinesInBasket',JSON.stringify(state))
  },{
    deep:true
  })

  return { medicinesInBasket, addToBasket, minusItemFromBasket, removeFromBasket ,getTotalPrice};
});
