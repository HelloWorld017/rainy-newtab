<template>
	<main class="Background">
		<transition name="Fade">
			<div class="Background__image" :style="{backgroundImage}" v-if="readyToShow">
			</div>
		</transition>

		<div class="Background__content" @contextmenu.prevent="onContext">
			<slot></slot>
		</div>
	</main>
</template>

<style lang="less" scoped>
	.Background {
		width: 100%;
		height: 100%;

		&__content {
			position: fixed;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;
		}

		&__image {
			width: 100%;
			height: 100%;

			background-size: cover;
			background-position: center;
			background-color: #303030;
		}
	}

	.Fade {
		&-enter-active, &-leave-active {
			transition: all .6s ease;
		}

		&-enter-from, &-leave-to {
			opacity: 0;
		}
	}
</style>

<script>
	import DefaultStyle from "../src/DefaultStyle";
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				url: '',
				readyToShow: false
			};
		},

		computed: {
			backgroundImage() {
				return `url(${this.url})`;
			}
		},

		async created() {
			const keys = await FileSystem.keyImages();
			const hash = keys[Math.floor(Math.random() * keys.length)];

			const style = await FileSystem.getRaw(`theme/style-${hash}`, DefaultStyle);

			Object.keys(style).forEach(k => {
				document.documentElement.style.setProperty(`--${k}`, style[k]);
			});

			const start = Date.now();
			const imageData = await FileSystem.getImage(hash);

			if(imageData) {
				this.url = imageData;
			} else {
				this.url = 'https://picsum.photos/1920/1080';
			}

			const end = Date.now();
			console.log(`Took ${end - start}ms too show!`);

			this.readyToShow = true;
		},

		destroyed() {
			if(this.url && this.url.startsWith('blob://')) URL.revokeObjectURL(this.url);
		},

		methods: {
			onContext() {
				this.$emit('context');
			}
		}
	};
</script>
