import { onMounted, onUnmounted, ref } from 'vue';
import type { UnwrapRef } from 'vue';

export const useInterval = <T>(onTick: () => T, interval: number) => {
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

	return current;
};
