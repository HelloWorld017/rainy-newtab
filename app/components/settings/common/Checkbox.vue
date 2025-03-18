<template>
	<label class="Checkbox">
		<input type="checkbox" v-model="model" />
		<span class="Checkbox__decorator">
			<CheckIcon width="1em" height="1em" strokeWidth="4" class="Checkbox__icon" />
		</span>
		<slot></slot>
	</label>
</template>

<style lang="less" scoped>
	.Checkbox {
		cursor: pointer;
		display: flex;
		align-items: center;
		color: #c1c1c1;
		font-family: var(--ui-font);
		font-size: 16px;

		&__decorator {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 18px;
			height: 18px;
			border: 1px solid #404040;
			border-radius: 6px;
			margin-right: 12px;

			transition: all 0.4s ease;
		}

		&__icon {
			font-size: 12px;
			color: #000000;
			opacity: 0;
			transition: all 0.4s ease;
		}

		& > input[type='checkbox'] {
			position: absolute;
			opacity: 0;
			z-index: -1;
		}

		& > input[type='checkbox']:checked + &__decorator {
			border-color: #ffffff;
			background: #ffffff;
		}

		& > input[type='checkbox']:checked + &__decorator > &__icon {
			opacity: 1;
		}
	}
</style>

<script lang="ts" setup>
	import { CheckIcon } from 'lucide-vue-next';

	const model = defineModel<boolean>();
</script>
