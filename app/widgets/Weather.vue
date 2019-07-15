<template>
	<div class="Weather">
		<div class="Weather__weather">
			<!-- <i class="Weather__icon" :class="icon"></i> -->
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
			font-family: 'Noto Sans KR', sans-serif;
			font-size: 3rem;
			font-weight: 600;
		}

		&__condition {
			font-family: 'Titillium Web', sans-serif;
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
</style>

<script>
	import FileSystem from "../src/FileSystem";

	export default {
		data() {
			return {
				weather: 'Loading...',
				icon: 'loading',
				temp: '?',
				humidity: '?'
			};
		},

		methods: {
			async update() {
				const locationCode = await FileSystem.getRaw('weather', 'KSXX0027');
				const weatherRaw = await new Promise(resolve => {
					chrome.runtime.sendMessage({method: 'weather', locationCode}, resolve);
				});
				const weather = (new DOMParser()).parseFromString(weatherRaw, 'text/xml');

				this.weather = weather.querySelector('cc > t').textContent;
				this.icon = weather.querySelector('cc > icon').textContent;
				this.temp = weather.querySelector('cc > tmp').textContent;
				this.humidity = weather.querySelector('cc > hmid').textContent;
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
