<template>
	<main class="Background" :style="style">
		<img
			v-if="isReadyToShow"
			class="Background__image"
			:class="{ 'Background__image--loaded': isLoaded }"
			:src="url"
			@load="onLoad"
		/>
		<div class="Background__content" @contextmenu.prevent="onContextMenu">
			<slot></slot>
		</div>
	</main>
</template>

<style lang="less" scoped>
	.Background {
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
			background-color: #303030;

			opacity: 0;
			transition: all 0.6s ease;

			&--loaded {
				opacity: 1;
			}
		}
	}
</style>

<script lang="ts" setup>
	import { ref, onBeforeMount } from 'vue';
	import { DEFAULT_IMAGE_URL } from '@/constants/theme';
	import { asKebabCase } from '@/utils/string';
	import { getThemeKeys, getThemeImage, getThemeStyle } from '@/utils/theme';

	const style = ref<Record<string, string>>({});
	const url = ref('');
	const isReadyToShow = ref(false);
	const isLoaded = ref(false);

	onBeforeMount(async () => {
		const keys = await getThemeKeys();
		const themeKey = keys[Math.floor(Math.random() * keys.length)];
		const [themeStyle, themeImage] = await Promise.all([
			getThemeStyle(themeKey),
			getThemeImage(themeKey),
		]);

		url.value = themeImage ?? DEFAULT_IMAGE_URL;
		style.value = Object.fromEntries(
			Object.entries(themeStyle).map(
				([key, color]) => [`--theme-${asKebabCase(key)}`, color] as const
			)
		);

		isReadyToShow.value = true;
	});

	const emit = defineEmits<{ contextmenu: [] }>();
	const onLoad = () => (isLoaded.value = true);
	const onContextMenu = () => emit('contextmenu');
</script>
