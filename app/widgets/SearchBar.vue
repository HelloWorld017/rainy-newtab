<template>
	<form class="SearchBar" @submit.prevent="submit" v-if="enabled">
		<input class="SearchBar__text"
			type="text" v-model="query"
			autocomplete="off" autocorrect="off"
			autocapitalize="off" spellcheck="false">

		<button class="SearchBar__button">
			<i class="SearchBar__icon mdi mdi-magnify"></i>
		</button>
	</form>
</template>

<style lang="less" scoped>
	.SearchBar {
		display: flex;

		&__text {
			border: none;
			border-radius: 90px;
			width: 250px;
			padding: 10px 20px;

			background: var(--search-color);
			font-family: var(--ui-font);
			font-size: 16px;
			font-weight: 300;
			color: var(--search-text-color);
			outline: none;
		}

		&__button {
			display: flex;
			align-items: center;
			justify-content: center;

			border: none;
			border-radius: 18px;
			margin-left: 20px;
			padding: 5px 15px;

			background-image: linear-gradient(to left, rgba(255, 255, 255, .15), rgba(255, 255, 255, .15));
			background-color: var(--search-color);
			outline: none;

			&:hover {
				cursor: pointer;
			}
		}

		&__icon {
			display: inline-flex;
			color: var(--search-text-color);
			font-size: 18px;
		}
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {query: ''};
		},

		asyncComputed: {
			async enabled() {
				return await FileSystem.getRaw('config/search.enabled', 'true') === 'true';
			},

			async url() {
				return await FileSystem.getRaw('config/search.url', 'https://google.com/search?q=%1');
			}
		},

		methods: {
			submit() {
				location.href = this.url.replace(/%1/g, encodeURIComponent(this.query));
			}
		}
	};
</script>
