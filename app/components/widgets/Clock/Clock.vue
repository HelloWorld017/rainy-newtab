<template>
	<div class="Clock">
		<SizeAnimated isOverflowVisible>
			<div class="Clock__unit">
				<ClockNumber v-for="number in clocks.hours" :number="number" />
			</div>
		</SizeAnimated>
		<span class="Clock__divider"><DividerColon /></span>
		<SizeAnimated isOverflowVisible>
			<div class="Clock__unit">
				<ClockNumber v-for="number in clocks.minutes" :number="number" />
			</div>
		</SizeAnimated>
		<span class="Clock__divider Clock__seconds"><DividerSlash /></span>
		<SizeAnimated isOverflowVisible>
			<div class="Clock__unit Clock__seconds">
				<ClockNumber v-for="number in clocks.seconds" :number="number" />
			</div>
		</SizeAnimated>
	</div>
</template>

<style lang="less" scoped>
	.Clock {
		font-size: 8rem;
		color: var(--theme-fill-primary);
		margin-left: -0.4rem;

		@media (max-width: 384px) {
			font-size: 6rem;
		}

		&,
		::v-deep(&__unit) {
			display: flex;
			align-items: center;
			gap: 0.01em;
		}

		&__divider {
			display: flex;
		}

		&__seconds {
			font-size: 0.75em;
			opacity: 0.5;

			@media (max-width: 768px) {
				display: none;
			}
		}
	}
</style>

<script lang="ts" setup>
	import { computed } from 'vue';
	import DividerColon from '@/assets/svgs/DividerColon.svg?component';
	import DividerSlash from '@/assets/svgs/DividerSlash.svg?component';
	import SizeAnimated from '@/components/common/SizeAnimated.vue';
	import { useInterval } from '@/composables/useInterval';
	import ClockNumber from './ClockNumber.vue';

	const asClockNumber = (number: number) => number.toString().padStart(2, '0').split('');
	const current = useInterval(() => new Date(), 50);
	const clocks = computed(() => ({
		seconds: asClockNumber(current.value.getSeconds()),
		minutes: asClockNumber(current.value.getMinutes()),
		hours: asClockNumber(current.value.getHours()),
	}));
</script>
