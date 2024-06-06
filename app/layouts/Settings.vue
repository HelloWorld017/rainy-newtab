<template>
	<section class="Settings">
		<a class="Settings__close" @click.prevent="close">
			<i class="mdi mdi-close"></i>
		</a>

		<span class="Settings__description">Refresh to apply</span>

		<div class="Settings__tab">
			<h1>Weather</h1>
			<checkbox :value="weatherEnabled" @change="setWeatherEnabled">
				Enabled
			</checkbox>
			<checkbox :value="weatherIcon" @change="setWeatherIcon">
				Icon
			</checkbox>

			<label class="Settings__text">
				Location

				<input type="text" ref="weatherLocation"
					autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
					:value="weatherLocation" @change="setWeatherLocationNative">
			</label>

			<label class="Settings__text">
				<a href="https://openweathermap.org/appid">OpenWeatherMap AppId</a>

				<input type="text" ref="weatherAppId"
					autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
					:value="weatherAppId" @change="setWeatherAppIdNative">
			</label>
		</div>

		<div class="Settings__tab">
			<h1>Search</h1>

			<checkbox :value="searchEnabled" @change="setSearchEnabled">
				Enabled
			</checkbox>

			<label class="Settings__text">
				Search URL

				<input type="text" ref="searchUrl"
					autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
					:value="searchUrl" @change="setSearchUrlNative">
			</label>
		</div>

		<settings-theme></settings-theme>
	</section>
</template>

<style lang="less" scoped>
	.Settings {
		position: fixed;
		top: 10vh;
		left: 10vw;

		background: #f1f2f3;
		width: 80vw;
		height: 80vh;
		overflow: auto;
		padding: 30px;
		box-sizing: border-box;

		font-family: var(--ui-font);

		&__description {
			font-size: 1rem;
		}

		&__close {
			position: absolute;
			top: 30px;
			right: 30px;

			cursor: pointer;
			color: #202020;
			font-size: 2rem;
			text-decoration: none;
			z-index: 2;
		}

		&__tab {
			margin-left: 10px;

			h1 {
				margin-left: -10px;
				margin-top: 30px;
				margin-bottom: 10px;
			}
		}

		&__text {
			font-family: var(--ui-font);
			font-size: .8rem;
			display: flex;
			flex-direction: column;
			margin-top: 20px;
			max-width: 400px;

			input {
				font-family: var(--ui-font);
				font-size: 1.2rem;
				padding: 5px 10px;
				background: transparent;
				border: none;
				border-bottom: 2px solid #202020;
				outline: none;

				&::selection {
					background: #202020;
					color: #f1f2f3;
				}
			}
		}
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";

	import Checkbox from "../components/Checkbox.vue";
	import SettingsTheme from "../layouts/SettingsTheme.vue";

	const {computed, methods} = FileSystem.bindFs({
		weatherEnabled: ['config/weather.enabled', 'true'],
		weatherIcon: ['config/weather.icon', 'true'],
		weatherLocation: ['config/weather.location', 'Daejeon, KR'],
		weatherAppId: ['config/weather.appid', ''],
		searchEnabled: ['config/search.enabled', 'true'],
		searchUrl: ['config/search.url', 'https://google.com/search?q=%1']
	});

	export default {
		data() {
			return {};
		},

		asyncComputed: computed,

		methods: {
			close() {
				this.$emit('close');
			},

			...methods,

			setWeatherAppIdNative() {
				this.setWeatherAppId(this.$refs.weatherAppId.value);
			},

			setWeatherLocationNative() {
				this.setWeatherLocation(this.$refs.weatherLocation.value);
			},

			setSearchUrlNative() {
				this.setSearchUrl(this.$refs.searchUrl.value);
			}
		},

		components: {
			Checkbox,
			SettingsTheme
		}
	};
</script>
