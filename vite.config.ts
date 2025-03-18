import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import svgLoader from 'vite-svg-loader';

export default defineConfig({
	build: {
		emptyOutDir: true,
		target: ['chrome130', 'firefox130'],
		rollupOptions: {
			input: {
				app: resolve(__dirname, 'index.html'),
				worker: resolve(__dirname, 'extension/worker.ts'),
			},
			output: {
				entryFileNames: chunk =>
					chunk.name === 'worker' ? '[name].js' : 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
	esbuild: {
		jsx: 'automatic',
		jsxImportSource: 'vue',
	},
	plugins: [vue(), svgLoader()],
	resolve: {
		alias: [{ find: /^@\//, replacement: `${resolve(__dirname, './app')}/` }],
	},
	define: {
		__EXTENSION__: process.env.IS_EXTENSION === 'true' ? true : false,
	},
});
