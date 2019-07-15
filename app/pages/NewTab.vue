<template>
	<background @context="showOptions">
		<clock></clock>

		<div class="Bottom">
			<weather></weather>
			<search-bar></search-bar>
		</div>

		<transition name="Fade">
			<div class="Backdrop" v-if="options" @click="hideOptions"></div>
		</transition>

		<transition name="Dialog">
			<settings v-if="options" @close="hideOptions"></settings>
		</transition>
	</background>
</template>

<style lang="less">
	body, html {
		padding: 0;
		margin: 0;

		width: 100vw;
		height: 100vh;
	}
</style>

<style lang="less" scoped>
	.Bottom {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		position: fixed;
		bottom: 50px;
		right: 50px;
	}

	.Backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .8);
	}

	.Dialog {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter, &-leave-to {
			opacity: 0;
			transform: translateY(100px);
		}
	}

	.Fade {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter, &-leave-to {
			opacity: 0;
		}
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";

	import Background from "../components/Background.vue";
	import Clock from "../widgets/Clock.vue";
	import SearchBar from "../widgets/SearchBar.vue";
	import Settings from "../layouts/Settings.vue";
	import Weather from "../widgets/Weather.vue";

	export default {
		data() {
			return {
				options: false
			};
		},

		components: {
			Background,
			Clock,
			SearchBar,
			Settings,
			Weather
		},

		methods: {
			showOptions() {
				this.options = true;
			},

			hideOptions() {
				this.options = false;
			}
		}
	};
</script>
