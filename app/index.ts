import '@fontsource/geist-sans';
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue';

import VueAsyncComputed from 'vue-async-computed';
import App from './App.vue';

const app = createApp(App);
app.use(VueAsyncComputed);
app.mount('#app');
