import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import head from "./plugins/use-head";
import i18n from "./plugins/i18n";

import "./styles/index.css";

createApp(App).use(router).use(store).use(head).use(i18n).mount("#app");
