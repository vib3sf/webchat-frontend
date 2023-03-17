import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import timeago from "vue-timeago3";

createApp(App).use(store).use(timeago).use(router).mount("#app");
