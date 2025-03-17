<template>
	<section class="Settings">
		<a class="Settings__close" @click.prevent="close">
			<XIcon />
		</a>

		<div class="Settings__tab">
			<h1>Weather</h1>
			<Checkbox v-model="weatherShowWeatherName">Show Weather Name</Checkbox>
			<Textbox v-model="weatherLocation">Location</Textbox>
			<Textbox v-model="weatherAppId">
				<a href="https://openweathermap.org/appid">OpenWeatherMap AppId</a>
			</Textbox>
		</div>

		<SettingsTheme />
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
	}
</style>

<script lang="ts" setup>
	import { XIcon } from 'lucide-vue-next';
	import { computed } from 'vue';
	import { useConfig } from '@/composables/useConfig';
	import SettingsTheme from './SettingsTheme.vue';
	import Checkbox from './common/Checkbox.vue';

	const config = useConfig();
	const weatherAppId = computed(() => config.weather.appId);
	const weatherLocation = computed(() => config.weather.location);
	const weatherShowWeatherName = computed(() => config.weather.showWeatherName);

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
			},
		},

		components: {
			Checkbox,
			SettingsTheme,
		},
	};
</script>
