<template>
	<div class="Textbox">
		<input
			type="text"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			v-model="model"
		/>
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
	.Textbox {
		font-family: var(--ui-font);
		font-size: 0.8rem;
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		max-width: 400px;

		& > input[type='text'] {
			font-family: var(--ui-font);
			font-size: 1.2rem;
			padding: 5px 10px;
			background: transparent;
			border: none;
			border-bottom: 2px solid #202020;
			outline: none;

			&::selection {
				background: #202020;
				color: #f1f1f1;
			}
		}
	}
</style>

<script lang="ts" setup>
	const model = defineModel<string>();
</script>
