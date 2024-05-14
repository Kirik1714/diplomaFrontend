import "./assets/main.css";
import "./assets/reset.css";

import "primeicons/primeicons.css";

import 'primevue/resources/themes/aura-light-green/theme.css'
import Checkbox from "primevue/checkbox"; // Импортируйте компонент Checkbox
import Button from "primevue/button";


import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";


import App from "./App.vue";

import router from "./router";

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.component("Checkbox", Checkbox);
app.component("Button", Button);


app.mount("#app");
