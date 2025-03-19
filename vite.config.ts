import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import type { Plugin } from 'vite';

type JSONValue = { [key: string]: JSONValue } | JSONValue[] | string | number | boolean | null;

const target = process.env.TARGET;

const manifestPlugin = (): Plugin => ({
	name: 'vite-manifest-plugin',
	async buildEnd() {
		if (!target) {
			return;
		}

		const manifest = JSON.parse(
			await readFile(resolve(__dirname, 'manifest.json'), 'utf8')
		) as JSONValue;

		const manifestBuilt = JSON.stringify(
			manifest,
			(_key, value: JSONValue) => {
				if (Array.isArray(value) || typeof value !== 'object' || !value) {
					return value;
				}

				return Object.fromEntries(
					Object.entries(value).reduce<[string, JSONValue][]>((prev, [key, value]) => {
						const [, keyTarget, keyName] = key.match(
							/^(?:__(firefox|chrome)__)?(.*)$/
						)!;
						return prev.concat(
							!keyTarget || keyTarget === target ? [[keyName, value]] : []
						);
					}, [])
				);
			},
			4
		);

		this.emitFile({
			type: 'asset',
			fileName: 'manifest.json',
			source: manifestBuilt,
		});
	},
});

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
	plugins: [vue(), svgLoader(), manifestPlugin()],
	resolve: {
		alias: [{ find: /^@\//, replacement: `${resolve(__dirname, './app')}/` }],
	},
	define: {
		__EXTENSION__: !!target,
	},
});
