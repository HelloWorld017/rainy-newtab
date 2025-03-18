<template>
	<div class="Date">
		{{ date }}
	</div>
</template>

<style lang="less" scoped>
	.Date {
		font-size: 1.5rem;
		font-family: var(--ui-font);
		letter-spacing: -0.04em;
		color: var(--theme-fill-primary);
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
