import { customRef, getCurrentScope, onScopeDispose, reactive } from 'vue';
import { config } from '@/utils/config';
import type { ConfigProxy } from '@/utils/config';

export const useConfig = () => {
	const createConfigRefProxy = <T extends ConfigProxy<object>>(proxy: T) =>
		new Proxy(proxy, {
			get(target, key, receiver) {
				if (!Object.hasOwn(target, key)) {
					return Reflect.get(target, key, receiver);
				}

				return customRef((track, trigger) => ({
					get() {
						const scope = getCurrentScope();
						if (scope) {
							const dispose = proxy.$subscribe(key as never, trigger);
							onScopeDispose(dispose);
						}

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
