import "@fontsource/geist-sans";
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";

import NewTab from "./pages/NewTab.vue";
import VueAsyncComputed from "vue-async-computed";

const app = createApp(NewTab);
app.use(VueAsyncComputed);
app.mount('#app');
