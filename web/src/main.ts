import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import head from "./plugins/use-head";

import "./styles/index.css";

createApp(App).use(router).use(store).use(head).mount("#app");
