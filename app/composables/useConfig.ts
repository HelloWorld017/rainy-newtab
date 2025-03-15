import { customRef, onScopeDispose, reactive } from 'vue';
import { config } from '@/utils/config/readConfig';
import type { ConfigProxy } from '@/utils/config/readConfig';

export const useConfig = () => {
	const createConfigRefProxy = <T extends ConfigProxy<unknown>>(proxy: T) =>
		new Proxy(proxy, {
			get(target, key, receiver) {
				if (!Object.hasOwn(target, key)) {
					return Reflect.get(target, key, receiver);
				}

				return customRef((track, trigger) => ({
					get() {
						const dispose = proxy.$subscribe(key as never, trigger);
						onScopeDispose(dispose);
						track();

						const value = target[key as keyof T];
						if (typeof value === 'object') {
							return createConfigRefProxy(value as never);
						}
					},
					set(value) {
						Object.assign(target, { [key]: value });
					},
				}));
			},
		});

	return reactive(createConfigRefProxy(config));
};
