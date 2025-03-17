<template>
	<div
		class="SizeAnimated"
		:class="{ 'SizeAnimated--visible': isOverflowVisible }"
		:style="{
			width: size ? `${size[0]}px` : 'initial',
			height: size ? `${size[1]}px` : 'initial',
		}"
	>
		<div :class="{ SizeAnimated__children: !!size }" :ref="innerRef">
			<slot />
		</div>
	</div>
</template>

<style lang="less" scoped>
	.SizeAnimated {
		position: relative;
		overflow: hidden;
		transition: all 0.4s ease;

		&--visible {
			overflow: visible;
		}

		&__children {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>

<script lang="ts" setup>
	import { useMeasure } from '@/composables/useMeasure';

	const [innerRef, size] = useMeasure();
	const { isOverflowVisible } = defineProps<{ isOverflowVisible?: boolean }>();
</script>
