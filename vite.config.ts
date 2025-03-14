import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import svgLoader from 'vite-svg-loader';

export default defineConfig({
	plugins: [vue(), svgLoader()],
	define: {
		__EXTENSION__: process.env.IS_EXTENSION === 'true' ? true : false,
	},
});
