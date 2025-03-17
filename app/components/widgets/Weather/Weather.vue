<template>
	<div class="Weather" v-if="isEnabled && weather">
		<i class="Weather__icon">
			<component :is="weather?.icon" v-if="weather?.icon" />
		</i>

		<div class="Weather__container">
			<span class="Weather__weather">{{ weather?.name }}</span>
			<span class="Weather__temperature">{{ weather?.temperature }} &deg;C</span>
			<span class="Weather__humidity">{{ weather?.humidity }}%</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Weather {
		display: flex;
		align-items: center;
		gap: 12px;

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

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import { useConfig } from '@/composables/useConfig';
	import { useInterval } from '@/composables/useInterval';
	import { MOCK_WEATHER_RESPONSE } from '@/constants/mock';
	import { browser } from '@/utils/browser';
	import { getWeatherIcon } from '@/utils/weather';
	import type { MessageWeatherRequest, MessageWeatherResponse } from '@/schemas/Message';

	const config = useConfig();
	const isEnabled = computed(
		() => !__EXTENSION__ || (config.weather.location && config.weather.appId)
	);

	const fetchWeather = async () => {
		if (!isEnabled) {
			return null;
		}

		const { appId, location } = config.weather;
		const weatherResponse = __EXTENSION__
			? await browser?.runtime.sendMessage<MessageWeatherRequest, MessageWeatherResponse>({
					method: 'weather',
					appId: appId!,
					location,
				})
			: MOCK_WEATHER_RESPONSE;

		const weatherData = weatherResponse?.data;
		const weatherPrimary = weatherData?.weather[0];

		if (!weatherData || !weatherPrimary) {
			return null;
		}

		return {
			icon: getWeatherIcon(weatherPrimary.icon, weatherPrimary.id),
			name: weatherPrimary.main,
			temperature: (weatherData.main.temp - 273.15).toFixed(0),
			humidity: weatherData.main.humidity.toFixed(0),
		};
	};

	type Weather = Exclude<Awaited<ReturnType<typeof fetchWeather>>, null>;
	const weather = ref<Weather | null>(null);

	useInterval(async () => {
		const nextWeather = await fetchWeather();
		if (nextWeather) {
			weather.value = nextWeather;
		}
	}, 60000);
</script>
