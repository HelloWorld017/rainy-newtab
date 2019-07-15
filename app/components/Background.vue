<template>
	<main class="Background" :style="{backgroundImage}" @contextmenu.prevent="onContext">
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
	import DefaultStyle from "../src/DefaultStyle";
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				url: 'https://picsum.photos/1920/1080'
			};
		},

		computed: {
			backgroundImage() {
				return `url(${this.url})`;
			}
		},

		async created() {
			const style = await FileSystem.getRaw(`theme/style-${hash}`, DefaultStyle);

			Object.keys(style).forEach(k => {
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
			onContext() {
				this.$emit('context');
			}
		}
	};
</script>
