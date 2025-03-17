<template>
	<div class="Date" v-text="date" />
</template>

<style lang="less" scoped>
	.Date {
		font-size: 3.6rem;
		font-family: var(--ui-font);
		color: var(--theme-vibrant);
	}

	@media (max-width: 1300px) {
		.Date {
			font-size: 2.4rem;
		}
	}

	@media (max-width: 768px) {
		.Date {
			font-size: 2rem;
		}
	}
</style>

<script lang="ts" setup>
	import { computed } from 'vue';
	import { useInterval } from '@/composables/useInterval';

	const current = useInterval(() => new Date(), 50);
	const date = computed(() => {
		const year = current.value.getFullYear();
		const month = (current.value.getMonth() + 1).toString().padStart(2, '0');
		const date = current.value.getDate().toString().padStart(2, '0');
		const dayOfWeek = '日月火水木金土'[current.value.getDay()];

		return `${year}. ${month}. ${date} ${dayOfWeek}`;
	});
</script>
