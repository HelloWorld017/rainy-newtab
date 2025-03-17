import { throttle } from 'es-toolkit';
import { STORAGE_KEY_CONFIG } from '@/constants/storage';
import { ZConfig } from '@/schemas/Config';
import { browser } from '@/utils/browser';

const configInner = await (async () => {
	const defaultConfig = ZConfig.parse({});
	const configRaw = await browser?.storage.sync.get(STORAGE_KEY_CONFIG);
	return ZConfig.safeParse(configRaw).data ?? defaultConfig;
})();

export type ConfigProxy<T> = T extends object
	? ConfigProxyMethods<T> & { [K in keyof T]: ConfigProxy<T[K]> }
	: T;

export type ConfigProxyMethods<T> = {
	$subscribe: <TKey extends keyof T | null>(
		key: TKey,
		callback: (
			value: TKey extends null ? unknown : T[TKey & keyof T],
			key: TKey extends null ? keyof T : TKey
		) => void
	) => () => void;
};

const createConfigProxy = <T>(object: T): ConfigProxy<T> => {
	const subscriptions = new Map<keyof T | null, Set<(value: never, key: never) => void>>();
	const proxyMaps = new Map<keyof T, unknown>();
	const proxyMethods: ConfigProxyMethods<T> = {
		$subscribe: (key, callback) => {
			if (subscriptions.has(key)) {
				subscriptions.set(key, new Set());
			}

			subscriptions.get(key)?.add(callback);
			return () => subscriptions.get(key)?.delete(callback);
		},
	};

	const onUpdate = (key: keyof T) => {
		subscriptions.get(key)?.forEach(onUpdate => onUpdate(object[key] as never, key as never));
		subscriptions.get(null)?.forEach(onUpdate => onUpdate(object[key] as never, key as never));
	};

	return new Proxy(object as ConfigProxy<T & object>, {
		get(target, key, receiver) {
			if (Object.hasOwn(proxyMethods, key)) {
				return proxyMethods[key as keyof ConfigProxyMethods<T>];
			}

			const value = Reflect.get(target, key, receiver);
			if (!value || typeof value !== 'object') {
				return value;
			}

			if (!proxyMaps.has(key as keyof T)) {
				const proxy = createConfigProxy(value as Record<string, unknown>);
				proxyMaps.set(key as keyof T, proxy);
				proxy.$subscribe(null, () => {
					onUpdate(key as keyof T);
				});
			}

			return proxyMaps.get(key as keyof T)!;
		},

		set(target, key, newValue, receiver) {
			const result = Reflect.set(target, key, newValue, receiver);
			onUpdate(key as keyof T);

			return result;
		},
	});
};

export const config = createConfigProxy(configInner);
config.$subscribe(
	null,
	throttle(
		() => browser?.storage.sync.set({ [STORAGE_KEY_CONFIG]: configInner })?.catch(() => {}),
		2000
	)
);
