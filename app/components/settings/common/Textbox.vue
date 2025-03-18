<template>
	<label class="Textbox">
		<span class="Textbox__label">
			<slot></slot>
		</span>
		<input
			type="text"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			v-model="model"
		/>
	</label>
</template>

<style lang="less" scoped>
	.Textbox {
		color: #ffffff;
		font-family: var(--ui-font);
		font-size: 14px;
		display: flex;
		flex-direction: column;
		max-width: 400px;

		&__label {
			color: #c1c1c1;
			padding-left: 4px;
		}

		& > input[type='text'] {
			font-family: var(--ui-font);
			font-size: 16px;
			padding: 12px 24px;
			margin-top: 8px;
			background: transparent;
			border: none;
			border: 1px solid #404040;
			border-radius: 10px;
			color: #ffffff;
			outline: none;

			&::selection {
				background: #f1f1f1;
				color: #202020;
			}
		}
	}
</style>

<script lang="ts" setup>
	const model = defineModel<string>();
</script>
