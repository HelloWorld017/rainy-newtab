import '@fontsource/geist-sans';
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue';

import VueAsyncComputed from 'vue-async-computed';
import NewTab from './pages/NewTab.vue';

const app = createApp(NewTab);
app.use(VueAsyncComputed);
app.mount('#app');
