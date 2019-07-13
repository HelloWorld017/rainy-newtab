<template>
	<div class="Background" :style="{backgroundImage}">
		<slot></slot>
	</div>
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
	import ImageFileSystem from "../src/ImageFileSystem";

	export default {
		data() {
			return {
				url: ''
			};
		},

		computed: {
			backgroundImage() {
				return `src(${this.url})`;
			}
		},

		async created() {
			const keys = await ImageFileSystem.keys();
			const hash = keys[Math.floor(Math.random() * keys.length)];
			const imageBlob = await ImageFileSystem.getImage(hash);
			if(!imageBlob) return;

			const imageUrl = URL.createObjectURL(imageBlob);
			this.url = imageUrl;
		},

		destroyed() {
			if(this.url) URL.revokeObjectURL(this.url);
		}
	};
</script>
