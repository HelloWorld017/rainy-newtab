<template>
	<div class="SettingsTheme">
		<div class="SettingsTheme__list">
			<TransitionGroup name="TransitionGroupFade">
				<div
					class="SettingsTheme__item ThemeItem"
					v-for="(theme, key) in themes"
					:key="key"
				>
					<a class="ThemeItem__delete" @click="onDeleteTheme(key)">
						<XIcon width="1em" height="1em" />
					</a>

					<img class="ThemeItem__thumbnail" :src="theme.thumbnail" />
					<div class="ThemeItem__colors">
						<div
							class="ThemeItem__color Color"
							v-for="(color, styleKey) in theme.style"
							:key="styleKey"
						>
							<div
								class="Color__view"
								:style="{ background: color }"
								@click="onShowPicker(key, styleKey, $event)"
							/>
						</div>
					</div>
				</div>

				<Dropzone class="SettingsTheme__item" @upload="onAddTheme">
					Click / Drop Images
				</Dropzone>
			</TransitionGroup>
		</div>

		<Transition name="TransitionFade">
			<div
				class="SettingsTheme__picker"
				:style="pickerStyle"
				v-if="picker"
				v-click-outside="onClosePicker"
			>
				<ChromePicker :model-value="pickerColor!" @update:model-value="onUpdatePicker">
					{{ getReadableStyleKey(picker.target[1]) }}
				</ChromePicker>
			</div>
		</Transition>
	</div>
</template>

<style lang="less" scoped>
	.SettingsTheme {
		position: relative;

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 30px;
		}

		&__picker {
			position: absolute;
		}
	}

	.ThemeItem {
		position: relative;
		display: flex;
		flex-direction: column;
		width: calc(max(230px, 33%) - 30px);
		aspect-ratio: 1 / 1;
		border-radius: 20px;
		overflow: hidden;

		&__thumbnail {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__colors {
			position: absolute;
			bottom: 0;
			width: 100%;
			background: rgba(32, 32, 32, 0.8);
			padding: 10px;
			box-sizing: border-box;
		}

		&__delete {
			cursor: pointer;
			position: absolute;
			top: 12px;
			right: 12px;
			font-size: 24px;
			color: #ffffff;
			filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.3));
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
			border-radius: 8px;
			border: 1px solid rgba(255, 255, 255, 0.2);
		}

		&__text {
			margin-left: 5px;
		}
	}
</style>

<script lang="ts" setup>
	import { Chrome as ChromePicker } from '@ckpack/vue-color';
	import { XIcon } from 'lucide-vue-next';
	import { computed, onMounted, ref } from 'vue';
	import { directive as vClickOutside } from 'vue3-click-away';

	import { MOCK_THEME } from '@/constants/mock';
	import { ZColor } from '@/schemas/Color';
	import {
		addTheme,
		deleteTheme,
		getThemeKeys,
		getThemeStyle,
		getThemeThumbnail,
		updateThemeStyle,
	} from '@/utils/theme';
	import Dropzone from './common/Dropzone.vue';
	import type { ThemeStyle } from '@/schemas/ThemeStyle';

	type ThemeItem = {
		key: string;
		thumbnail: string;
		style: ThemeStyle;
	};

	type PickerInfo = {
		position: [number, number];
		target: [string, keyof ThemeStyle];
	};

	const themes = ref<Record<string, ThemeItem>>({});
	const picker = ref<PickerInfo | null>(null);
	const pickerStyle = computed(
		() =>
			picker.value && {
				left: `${picker.value.position[0]}px`,
				top: `${picker.value.position[1]}px`,
			}
	);

	const pickerColor = computed({
		get: () =>
			picker.value && themes.value[picker.value.target[0]].style[picker.value.target[1]],

		set: val =>
			val &&
			picker.value &&
			(themes.value[picker.value.target[0]].style[picker.value.target[1]] = val),
	});

	const refreshThemes = async () => {
		const themeKeys = await getThemeKeys();
		const newThemes: Record<string, ThemeItem> = {};

		if (!__EXTENSION__) {
			themes.value = MOCK_THEME;
			return;
		}

		for (let key of themeKeys) {
			const [thumbnail, style] = await Promise.all([
				getThemeThumbnail(key),
				getThemeStyle(key),
			]);

			newThemes[key] = { key, thumbnail: thumbnail!, style };
		}

		themes.value = newThemes;
	};

	const onAddTheme = async (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		const image = new Image();
		await new Promise<void>((resolve, reject) => {
			image.onload = () => resolve();
			image.onerror = () => reject(new Error('Failed to load image'));
			image.src = url;
		});

		await addTheme(image);
		await refreshThemes();
		URL.revokeObjectURL(url);
	};

	const onDeleteTheme = async (key: string) => {
		await deleteTheme(key);
		await refreshThemes();
	};

	const onClosePicker = async () => {
		if (!picker.value) {
			return;
		}

		await updateThemeStyle(picker.value.target[0], {
			...themes.value[picker.value.target[0]].style,
			[picker.value.target[1]]: pickerColor.value!,
		});

		picker.value = null;
	};

	const onShowPicker = (key: string, styleKey: keyof ThemeStyle, event: MouseEvent) => {
		if (picker.value) {
			return onClosePicker();
		}

		const container = (event.target as HTMLElement).closest('.ThemeItem');
		if (!(container instanceof HTMLElement)) {
			return;
		}

		picker.value = {
			position: [container.offsetLeft + 20, container.offsetTop + 20],
			target: [key, styleKey],
		};
	};

	const onUpdatePicker = ({ hex8 }: { hex8: string }) => {
		pickerColor.value = ZColor.parse(hex8);
	};

	const getReadableStyleKey = (styleKey: keyof ThemeStyle) =>
		styleKey[0].toUpperCase() +
		styleKey.slice(1).replace(/-([a-z])/g, (_, p1: string) => ` ${p1.toUpperCase()}`);

	onMounted(() => refreshThemes());
</script>
