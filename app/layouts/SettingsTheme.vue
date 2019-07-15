<template>
	<div class="SettingsTheme">
		<h1>Theme</h1>

		<div class="SettingsTheme__list">
			<div class="SettingsTheme__item ThemeItem" v-for="theme in themes">
				<img class="ThemeItem__thumb" :style="{backgroundImage: theme.thumb}">
			</div>

			<dropzone class="SettingsTheme__item" @upload="addTheme">
				Click or Drop to Add
			</dropzone>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.SettingsTheme {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		&__item {
			background: #eaebec;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px 10px;
		}
	}
</style>

<script>
	import { Chrome } from "vue-color";
	import Dropzone from "../components/Dropzone.vue";

	import DefaultStyle from "../src/DefaultStyle";
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				themes: []
			};
		},

		methods: {
			async addTheme(blob) {
				const url = URL.createObjectURL(blob);
				const image = new Image();
				await new Promise((resolve, reject) => {
					image.onload = () => resolve();
					image.onerror = () => reject();
					image.src = url;
				});

				await FileSystem.addImage(image);
				URL.revokeObjectURL(image);

				await this.refresh();
			},

			async refresh() {
				const themeKeys = await FileSystem.keyImages();
				const themes = [];

				for (let hash of themeKeys) {
					const thumb = URL.createObjectURL(await FileSystem.getImage(hash, true));
					const style = await FileSystem.getRaw(`theme/style-${hash}`, DefaultStyle);

					themes.push({thumb, style});
				}

				this.revoke();
				this.themes = themes;
			},

			revoke() {
				for (let theme of this.themes) {
					URL.revokeObjectURL(theme.thumb);
				}
			}
		},

		async mounted() {
			await this.refresh();
		},

		destroyed() {
			this.revoke();
		},

		components: {
			ChromePicker: Chrome,
			Dropzone
		}
	};
</script>
