<template>
	<div class="SettingsTheme">
		<h1>Theme</h1>

		<div class="SettingsTheme__list">
			<div class="SettingsTheme__item ThemeItem" v-for="(theme, hash) in themes" :key="hash">
				<a class="ThemeItem__delete" @click="deleteTheme(hash)">
					<i class="mdi mdi-close"></i>
				</a>

				<img class="ThemeItem__thumb" :src="theme.thumb">
				<div class="ThemeItem__colors">
					<div class="ThemeItem__color Color" v-for="(color, styleId) in theme.style" :key="styleId">
						<div class="Color__view" :style="{background: color}"
							@click="showPicker(hash, styleId, $event)">

						</div>

						<span class="Color__text">
							{{getReadableName(styleId)}}
						</span>
					</div>
				</div>
			</div>

			<dropzone class="SettingsTheme__item" @upload="addTheme">
				Click or Drop to Add
			</dropzone>
		</div>

		<chrome-picker class="SettingsTheme__picker" v-if="picker"
			:style="pickerStyle" :value="pickerColor"
			@input="pickerColor = `rgba(${$event.rgba.r}, ${$event.rgba.g}, ${$event.rgba.b}, ${$event.rgba.a})`"
			v-click-outside="closePicker">

		</chrome-picker>
	</div>
</template>

<style lang="less" scoped>
	.SettingsTheme {
		display: flex;
		flex-direction: column;
		align-items: stretch;

		margin-top: 30px;
		height: 100%;
		overflow: auto;

		&__item {
			background: #eaebec;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px 10px;

			&:not(:last-child) {
				margin-bottom: 30px;
			}
		}

		&__picker {
			position: fixed;
		}
	}

	.ThemeItem {
		position: relative;

		&__colors {
			margin-left: 20px;
		}

		&__delete {
			cursor: pointer;
			position: absolute;
			top: 5px;
			right: 5px;
			font-size: 2rem;
			color: #202020;
		}
	}

	.Color {
		display: flex;
		align-items: center;

		&:not(:last-child) {
			margin-bottom: 5px;
		}

		&__view {
			cursor: pointer;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			border: 1px solid #a1a2a3;
		}

		&__text {
			margin-left: 5px;
		}
	}
</style>

<script>
	import { Chrome } from "vue-color";
	import Dropzone from "../components/Dropzone.vue";

	import ClickOutside from "v-click-outside";
	import DefaultStyle from "../src/DefaultStyle";
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				themes: {},
				picker: null
			};
		},

		computed: {
			pickerStyle() {
				return {
					left: `${this.picker.x}px`,
					top: `${this.picker.y}px`
				};
			},

			pickerColor: {
				get() {
					return this.themes[this.picker.targetHash].style[this.picker.targetStyle];
				},

				set(val) {
					this.themes[this.picker.targetHash].style[this.picker.targetStyle] = val;
				}
			}
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

			async deleteTheme(hash) {
				await FileSystem.deleteImage(hash);
				await this.refresh();
			},

			async refresh() {
				const themeKeys = await FileSystem.keyImages();
				const themes = {};

				for (let hash of themeKeys) {
					const thumb = await FileSystem.getImage(hash, true);
					const style = await FileSystem.getRaw(`theme/style-${hash}`, DefaultStyle);

					themes[hash] = {hash, thumb, style};
				}

				this.themes = themes;
			},

			getReadableName(name) {
				return name[0].toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, p1) => ` ${p1.toUpperCase()}`);
			},

			async showPicker(hash, styleId, event) {
				if(this.picker) await this.closePicker();

				const rect = event.target.getBoundingClientRect();
				this.picker = {
					x: rect.x + 40,
					y: rect.y + 40,
					targetHash: hash,
					targetStyle: styleId
				};
			},

			async closePicker() {
				await FileSystem.setRaw(
					`theme/style-${this.picker.targetHash}`,
					this.themes[this.picker.targetHash].style
				)

				this.picker = null;
			}
		},

		async mounted() {
			await this.refresh();
		},

		directives: {
			ClickOutside: ClickOutside.directive
		},

		components: {
			ChromePicker: Chrome,
			Dropzone
		}
	};
</script>
