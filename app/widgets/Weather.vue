<template>
	<div class="Weather" v-if="enabled">
		<i class="Weather__icon mdi" :class="`mdi-${icon}`"></i>
		<div class="Weather__container">
			<div class="Weather__weather" v-if="iconEnabled && icon">
				{{ weather }}
			</div>

			<div class="Weather__condition">
				<span class="Weather__temperature"> {{ temp }} &deg;C </span>
				<span class="Weather__humidity"> {{ humidity }}% </span>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Weather {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
		background: var(--weather-background);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: var(--weather-color);
		margin-bottom: 30px;
		padding: 20px;
		backdrop-filter: blur(80px);
		border-radius: 25px;
		text-align: right;

		&__icon {
			color: white;
			background: rgba(0, 0, 0, 0.25);
			font-size: max(2rem, 2vmin);
			flex: 0 0 auto;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 1em;
			height: 1em;
			padding: 10px;
			border-radius: 10px;
		}

		&__container {
			display: flex;
			flex-direction: column;
		}

		&__weather {
			font-family: var(--ui-font);
			font-size: max(2rem, 3vmin);
			font-weight: 600;
		}

		&__condition {
			display: flex;
			gap: 12px;
			justify-content: flex-end;
			font-family: var(--ui-font);
			font-size: max(1.2rem, 1.5vmin);
			font-weight: 500;
			opacity: 0.5;
		}
	}
</style>

<script>
	import FileSystem from '../src/FileSystem';
	import getWeatherIcon from '../src/WeatherIcon';

	export default {
		data() {
			return {
				weather: 'Loading...',
				icon: '',
				temp: '?',
				humidity: '?',
			};
		},

		asyncComputed: {
			async enabled() {
				if (!FileSystem.isExtension) {
					return true;
				}

				return (
					(await FileSystem.getRaw('config/weather.enabled', 'true')) === 'true' &&
					(await FileSystem.getRaw('config/weather.appid', null))
				);
			},

			async iconEnabled() {
				return (await FileSystem.getRaw('config/weather.icon', 'true')) === 'true';
			},
		},

		methods: {
			async update() {
				const appId = await FileSystem.getRaw('config/weather.appid', '');
				const locationCode = await FileSystem.getRaw(
					'config/weather.location',
					'Daejeon, KR'
				);

				const weatherRaw = await new Promise(resolve => {
					if (!FileSystem.isExtension) {
						return resolve(
							JSON.stringify({
								weather: [{ icon: 10, code: '300', main: 'Light drizzle' }],
								main: { temp: 289, humidity: 25 },
							})
						);
					}

					chrome.runtime.sendMessage({ method: 'weather', locationCode, appId }, resolve);
				});
				const weatherParsed = JSON.parse(weatherRaw);
				if (!(weatherParsed && weatherParsed.weather && weatherParsed.weather.length)) {
					return;
				}

				const weather = weatherParsed.weather[0];
				this.weather = weather.main;

				this.icon = getWeatherIcon(parseInt(weather.icon), weather.code);
				this.temp = Math.round(weatherParsed.main.temp - 273.15);
				this.humidity = weatherParsed.main.humidity;
			},
		},

		mounted() {
			this.intervalId = setInterval(() => this.update(), 60000);
			this.update();
		},

		beforeDestroy() {
			if (typeof this.intervalId === 'number') {
				clearInterval(this.intervalId);
			}
		},
	};
</script>
