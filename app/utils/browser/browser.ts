export const browser: typeof globalThis.chrome | undefined =
	'browser' in globalThis ? globalThis.browser : globalThis.chrome;
