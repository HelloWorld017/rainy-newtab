<template>
	<Transition name="TransitionNumber" mode="out-in">
		<Component :is="numTexts[+number]" :key="number" height="1em" />
	</Transition>
</template>

<style lang="less" scoped>
	.TransitionNumber {
		&-enter-active,
		&-leave-active {
			transition: all 0.3s ease;
		}

		&-enter-from {
			transform: translateY(-10px);
			opacity: 0;
		}

		&-leave-to {
			transform: translateY(10px);
			opacity: 0;
		}
	}
</style>

<script lang="ts" setup>
	import Number0 from '@/assets/svgs/Number0.svg?component';
	import Number1 from '@/assets/svgs/Number1.svg?component';
	import Number2 from '@/assets/svgs/Number2.svg?component';
	import Number3 from '@/assets/svgs/Number3.svg?component';
	import Number4 from '@/assets/svgs/Number4.svg?component';
	import Number5 from '@/assets/svgs/Number5.svg?component';
	import Number6 from '@/assets/svgs/Number6.svg?component';
	import Number7 from '@/assets/svgs/Number7.svg?component';
	import Number8 from '@/assets/svgs/Number8.svg?component';
	import Number9 from '@/assets/svgs/Number9.svg?component';

	const numTexts = [
		Number0,
		Number1,
		Number2,
		Number3,
		Number4,
		Number5,
		Number6,
		Number7,
		Number8,
		Number9,
	];

	defineProps<{ number: string }>();
</script>
