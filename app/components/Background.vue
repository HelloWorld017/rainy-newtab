<template>
	<main class="Background" :style="{backgroundImage}" @contextmenu.prevent="showOptions">
		<slot></slot>
	</main>
</template>

<style lang="less" scoped>
	.Background {
		width: 100%;
		height: 100%;

		background-size: cover;
		background-position: center;
		background-color: #202020;
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				option: false,
				url: 'https://picsum.photos/1920/1080'
			};
		},

		computed: {
			backgroundImage() {
				return `url(${this.url})`;
			}
		},

		async created() {
			const style = await FileSystem.getRaw(`theme/style-${hash}`, {
				"clock-color": "#f1f2f3",
				"clock-background": "transparent",
				"weather-color": "#f1f2f3",
				"search-color": "#202020",
				"search-text-color": "#f1f2f3"
			});

			Object.keys(style).forEach(k => {
				console.log(`--${k}`, style[k]);
				document.documentElement.style.setProperty(`--${k}`, style[k]);
			});

			const keys = await FileSystem.keyImages();
			const hash = keys[Math.floor(Math.random() * keys.length)];
			const imageBlob = await FileSystem.getImage(hash);
			if(!imageBlob) return;

			const imageUrl = URL.createObjectURL(imageBlob);
			this.url = imageUrl;
		},

		destroyed() {
			if(this.url) URL.revokeObjectURL(this.url);
		},

		methods: {
			showOptions() {
				this.option = true;
			}
		}
	};
</script>
