// @ts-check

import { resolve } from 'node:path';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import confusingGlobals from 'confusing-browser-globals';
import importX from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier/recommended';
import * as ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

const importIgnoreList = ['\\.worker'];

const tsParserOptions = {
	tsconfigRootDir: import.meta.dirname,
	project: [resolve(import.meta.dirname, './tsconfig.json')],
	projectService: true,
	extraFileExtensions: ['.vue'],
	/** @type {'latest'} */
	ecmaVersion: 'latest',
};

export default ts.config(
	{
		files: ['app/**/*.ts', 'app/**/*.vue', 'eslint.config.js', 'vite.config.ts'],
		extends: [
			js.configs.recommended,
			...ts.configs.recommendedTypeChecked,
			importX.flatConfigs.recommended,
			importX.flatConfigs.typescript,
			prettier,
		],
		rules: {
			'@stylistic/lines-around-comment': [
				'error',
				{
					beforeBlockComment: false,
					afterBlockComment: false,
					beforeLineComment: false,
					afterLineComment: false,
				},
			],
			'@stylistic/no-confusing-arrow': 'off',
			'@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
			'@stylistic/quotes': [
				'error',
				'single',
				{ avoidEscape: true, allowTemplateLiterals: false },
			],
			'@stylistic/quote-props': ['error', 'consistent'],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{ allowInterfaces: 'with-single-extends' },
			],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/first': 'error',
			'import-x/newline-after-import': 'error',
			'import-x/no-default-export': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-named-as-default-member': 'off',
			'import-x/no-unresolved': ['error', { ignore: importIgnoreList }],
			'import-x/order': [
				'error',
				{
					'groups': [
						'builtin',
						'external',
						'internal',
						'parent',
						'index',
						'sibling',
						'type',
					],
					'newlines-between': 'ignore',
					'alphabetize': { order: 'asc', caseInsensitive: false },
				},
			],
			'import-x/prefer-default-export': 'off',
			'prettier/prettier': 'error',
			'arrow-body-style': ['error', 'as-needed'],
			'camelcase': ['error', { properties: 'never' }],
			'class-methods-use-this': 'off',
			'curly': ['error', 'all'],
			'max-len': 'off',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-restricted-globals': ['error', 'browser', 'chrome', ...confusingGlobals],
			'prefer-const': 'off',
			'prefer-promise-reject-errors': 'off',
		},
		languageOptions: {
			parser: ts.parser,
			parserOptions: tsParserOptions,
		},
		plugins: {
			'@stylistic': stylistic,
		},
		settings: {
			'import-x/ignore': importIgnoreList,
		},
	},
	{
		files: ['*.vue', '**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: ts.parser,
				...tsParserOptions,
			},
		},
	},
	{
		files: ['app/definitions/*.ts', 'eslint.config.js', 'vite.config.ts'],
		rules: {
			'import-x/no-default-export': 'off',
		},
	}
);
