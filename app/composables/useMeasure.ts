import { ref } from 'vue';

export const useMeasure = () => {
	const size = ref<[number, number] | null>(null);
	const observer = new ResizeObserver(([state]) => {
		const nextSize = state?.contentBoxSize[0];
		if (!nextSize) {
			return;
		}

		size.value = [nextSize.inlineSize, nextSize.blockSize];
	});

	const targetRef = (child: HTMLElement) => {
		if (child) {
			observer.observe(child);
			return () => observer.unobserve(child);
		}
	};

	return [targetRef, size] as const;
};
