import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import "@/css/estilos.css";

import router from "./router/router";
createApp(App).use(router).use(ElementPlus).mount("#app");
