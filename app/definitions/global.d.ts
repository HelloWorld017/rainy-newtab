declare global {
	declare const __EXTENSION__: boolean;

	declare namespace globalThis {
		var browser: typeof globalThis.chrome;
	}
}

export {};
