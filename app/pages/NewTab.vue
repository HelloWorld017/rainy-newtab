<template>
	<background>
		<clock></clock>

		<div class="Bottom">
			<weather></weather>
			<search-bar></search-bar>
		</div>
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
</style>

<script>
	import FileSystem from "../src/FileSystem";

	import Background from "../components/Background.vue";
	import Clock from "../components/Clock.vue";
	import SearchBar from "../components/SearchBar.vue";
	import Weather from "../components/Weather.vue";

	export default {
		components: {
			Background,
			Clock,
			SearchBar,
			Weather
		}
	};
</script>
