<template>
	<main class="ThemeSurface" :style="style">
		<img
			v-if="isReadyToShow"
			class="ThemeSurface__image"
			:class="{ 'ThemeSurface__image--loaded': isLoaded }"
			:src="url"
			@load="onLoad"
		/>
		<div class="ThemeSurface__content" @contextmenu.prevent="onContextMenu">
			<slot></slot>
		</div>
	</main>
</template>

<style lang="less" scoped>
	.ThemeSurface {
		display: flex;
		width: 100%;
		height: 100%;

		&__content {
			position: absolute;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;
		}

		&__image {
			width: 100%;
			height: 100%;

			object-fit: cover;
			object-position: center;

			opacity: 0;
			transition: all 0.6s ease;
			transform: translateZ(0);

			&--loaded {
				opacity: 1;
			}
		}
	}
</style>

<script lang="ts" setup>
	import { ref, onBeforeMount } from 'vue';
	import { DEFAULT_IMAGE_URL } from '@/constants/theme';
	import { ZColor } from '@/schemas/Color';
	import { getThemeKeys, getThemeImage, getThemeStyle } from '@/utils/theme';
	import type { ThemeStyle } from '@/schemas/ThemeStyle';

	const transformThemeStyle = (themeStyle: ThemeStyle) =>
		Object.fromEntries(
			Object.entries(themeStyle).map(([key, color]) => [`--theme-${key}`, color] as const)
		);

	const style = ref<Record<string, string>>(
		transformThemeStyle({
			'fill-primary': ZColor.parse('#ffffff00'),
		})
	);

	const url = ref('');
	const isReadyToShow = ref(false);
	const isLoaded = ref(false);

	onBeforeMount(async () => {
		const keys = await getThemeKeys();
		const themeKey = keys[Math.floor(Math.random() * keys.length)];
		const themeImagePromise = getThemeImage(themeKey);
		const themeStyle = await getThemeStyle(themeKey);

		style.value = transformThemeStyle(themeStyle);
		url.value = (await themeImagePromise) ?? DEFAULT_IMAGE_URL;

		isReadyToShow.value = true;
	});

	const emit = defineEmits<{ contextmenu: [] }>();
	const onLoad = () => (isLoaded.value = true);
	const onContextMenu = () => emit('contextmenu');
</script>
