<template>
	<div class="Weather" v-if="enabled">
		<div class="Weather__weather" v-if="icon">
			<i class="Weather__icon mdi" :class="`mdi-${icon}`"></i>
			{{weather}}
		</div>

		<div class="Weather__condition">
			<span class="Weather__temperature">
				Temperature: {{temp}} &deg;C
			</span>
			,
			<span class="Weather__humidity">
				Humidity: {{humidity}}%
			</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Weather {
		background: var(--weather-background);
		color: var(--weather-color);
		margin-bottom: 30px;
		padding: 20px;
		text-align: right;

		&__weather {
			font-family: var(--ui-font);
			font-size: 3rem;
			font-weight: 600;
		}

		&__condition {
			font-family: var(--ui-font);
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";
	import getWeatherIcon from "../src/WeatherIcon";

	export default {
		data() {
			return {
				weather: 'Loading...',
				icon: '',
				temp: '?',
				humidity: '?'
			};
		},

		asyncComputed: {
			async enabled() {
				return (await FileSystem.getRaw('config/weather.enabled', 'true') === 'true') &&
					(await FileSystem.getRaw('config/weather.appid', null));
			},

			async icon() {
				return await FileSystem.getRaw('config/weather.icon', 'true') === 'true';
			}
		},

		methods: {
			async update() {
				const appId = await FileSystem.getRaw('config/weather.appid', '');
				const locationCode = await FileSystem.getRaw('config/weather.location', 'Daejeon, KR');
				
				const weatherRaw = await new Promise(resolve => {
					chrome.runtime.sendMessage({method: 'weather', locationCode, appId}, resolve);
				});
				const weatherParsed = JSON.parse(weatherRaw);
				if(!(weatherParsed && weatherParsed.weather && weatherParsed.weather.length)) return;

				const weather = weatherParsed.weather[0];
				this.weather = weather.main;
				
				this.icon = getWeatherIcon(
					parseInt(weather.icon),
					weather.code
				);
				this.temp = Math.round(weatherParsed.main.temp - 273.15);
				this.humidity = weatherParsed.main.humidity;
			}
		},

		mounted() {
			this.intervalId = setInterval(() => this.update(), 60000);
			this.update();
		},

		beforeDestroy() {
			if(typeof this.intervalId === 'number')
				clearInterval(this.intervalId);
		}
	}
</script>
