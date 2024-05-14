import { ref,  watch } from "vue";

import api from "../api";
import router from "../router";

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);


  const error = ref({});
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
          getUser();
          router.push({ name: "medicines" });
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
      watch(
        user,
        (state) => {
          localStorage.setItem("user", JSON.stringify(state));
        },
        {
          deep: true,
        }
      );
      
      return {createUser, loginUser, getUser, user, error, logoutUser}
})