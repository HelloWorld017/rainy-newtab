<template>
	<label class="Checkbox">
		<input type="checkbox" v-model="_value" />
		<div class="Checkbox__decorator"></div>
		<slot></slot>
	</label>
</template>

<style lang="less" scoped>
.Checkbox {
	cursor: pointer;
	display: flex;
	align-items: center;
	font-family: var(--ui-font);
	font-size: 1rem;

	&__decorator {
		display: block;
		width: 10px;
		height: 10px;
		border: 2px solid #202020;
		border-radius: 50%;
		margin-right: 12px;

		transition: all 0.4s ease;
	}

	& > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		z-index: -1;
	}

	& > input[type='checkbox']:checked + &__decorator {
		border-color: #00bcd4;
		background: #00bcd4;
	}
}
</style>

<script>
export default {
	props: {
		modelValue: String,
	},

	computed: {
		_value: {
			get() {
				return this.modelValue === 'true';
			},

			set(value) {
				this.$emit('update:modelValue', value.toString());
			},
		},
	},
};
</script>
