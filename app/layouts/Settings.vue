<template>
	<section class="Settings">
		<a class="Settings__close" @click.prevent="close">
			<i class="mdi mdi-close"></i>
		</a>
		
		<settings-theme></settings-theme>
	</section>
</template>

<style lang="less" scoped>
	.Settings {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background: #f1f2f3;
		width: 80vw;
		height: 80vh;
		padding: 30px;
		box-sizing: border-box;

		font-family: 'Noto Sans KR', sans-serif;

		&__close {
			position: absolute;
			top: 30px;
			right: 30px;

			cursor: pointer;
			color: #202020;
			font-size: 2rem;
			text-decoration: none;
		}
	}
</style>

<script>
	import SettingsTheme from "../layouts/SettingsTheme.vue";

	export default {
		data() {
			return {};
		},

		methods: {
			close() {
				this.$emit('close');
			}
		},

		components: {
			SettingsTheme
		}
	};
</script>