import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';
import svgLoader from 'vite-svg-loader';

const isExtension = process.env.IS_EXTENSION === 'true';

export default defineConfig({
	build: {
		emptyOutDir: true,
		target: ['chrome130', 'firefox130'],
	},
	esbuild: {
		jsx: 'automatic',
		jsxImportSource: 'vue',
	},
	plugins: [vue(), svgLoader(), ...(isExtension ? [webExtension()] : [])],
	resolve: {
		alias: [{ find: /^@\//, replacement: `${resolve(__dirname, './app')}/` }],
	},
	define: {
		__EXTENSION__: isExtension,
	},
});
