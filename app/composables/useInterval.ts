import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

export const useInterval = <T>(onTick: () => T, interval: number): Ref<T> => {
	let intervalId: ReturnType<typeof setTimeout> | null = null;
	const current = ref(onTick());

	onMounted(() => {
		intervalId = setInterval(() => {
			current.value = onTick() as UnwrapRef<T>;
		}, interval);
	});

	onUnmounted(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	return current as Ref<T>;
};
