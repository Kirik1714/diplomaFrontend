import { ref,  watch } from "vue";
import { useBasketStore } from "./BasketStore.js";


import api from "../api";
import router from "../router";

import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  const basketStore =useBasketStore();
  const error = ref({});
  const orders = ref([]);
  const userInLocalStorage = localStorage.getItem("user");

  if (userInLocalStorage !== null) {
    user.value = JSON.parse(userInLocalStorage);
  }


    const createUser = async (object) => {
        console.log(object);
        try {
          const { data } = await api.post("http://backenddimploma/api/users", object);
          localStorage.setItem("access_token", data.access_token);
          getUser();
          router.push({ name: "medicines" });
        console.log("Пользователь создан", data);
        } catch (errorInResponse) {
          error.value = errorInResponse.response.data.errors;
          console.log('Не удалось создать пользователя', error.value);
          // console.log("Не удалось создать пользователя", errorInResponse);
        }
       
      };
      const loginUser = async (object) => {
        console.log(object);
        try {
          const { data } = await api.post("http://backenddimploma/api/auth/login", {
            email: object.email,
            password: object.password,
          });
    
          localStorage.setItem("access_token", data.access_token);
          await getUser();
           const user = JSON.parse(localStorage.getItem("user"));
           console.log(user); 
           console.log('Pinia',user.value); 

          if (user.is_admin===1){
            console.log('Админ');
            window.open('http://backenddimploma/', '_blank'); // Открыть в новой вкладке
          }
          router.push({ name: "medicines" });
          error.value = {};
        } catch (errorInResponse) {
          error.value = errorInResponse.response.data;
          console.log('Ошибки авторизации',error.value);
    
        }
      };
      const getUser = async () => {
        try {
          const { data } = await api.post("http://backenddimploma/api/auth/me");
          user.value = data;
        } catch (error) {
          console.log("Не удалось получить пользователя", error);
        }
      };
      const logoutUser = async () => {
        try {
          const { data } = await api.post("http://backenddimploma/api/auth/logout");
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          router.push({ name: "home" });
          user.value = null;
        } catch (error) {
          console.log("Не удалось выйти", error);
        }
      };

      const createOrder=async()=>{
        if (!user.value) {
          router.push({ name: 'login' });
          return;
        }
       
        const object = {

          user_id: user.value?.id,
          products: localStorage.getItem("medicinesInBasket"),
          total_price: Number( basketStore.getTotalPrice()).toFixed(2),
        };
     console.log(object);

        try {
         const {data}=await axios.post('http://backenddimploma/api/medicines/orders',object);
         localStorage.removeItem("medicinesInBasket");
         basketStore.medicinesInBasket = [];
      router.push({ name: "Orders", params: { id: user.value?.id } });

        } catch (error) {
      console.log("Не удалось создать заказ", error);
          
        }

      }

      const getOrders = async ( id) => {
        try {
          const { data } = await axios.get(`http://backenddimploma/api/medicines/orders/${id}`);
          orders.value = data;
        
        } catch (error) {
          console.log("Не удалось получить заказ", error);
        }
      };
      watch(
        user,
        (state) => {
          localStorage.setItem("user", JSON.stringify(state));
        },
        {
          deep: true,
        }
      );
      
      return {createUser, loginUser, getUser, user, error,orders, logoutUser,createOrder,getOrders}
})