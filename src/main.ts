import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import timeago from "vue-timeago3";

createApp(App).use(createPinia()).use(timeago).use(router).mount("#app");
