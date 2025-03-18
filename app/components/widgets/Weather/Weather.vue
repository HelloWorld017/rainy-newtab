<template>
	<div class="Weather" v-if="isEnabled && weather">
		<Component
			v-if="weather?.icon"
			:is="weather?.icon"
			:strokeWidth="1.6"
			class="Weather__icon"
		/>
		<div class="Weather__container">
			<span class="Weather__temperature">{{ weather?.temperature }} &deg;C</span>
			<span class="Weather__weather" v-if="shouldShowWeatherName">{{ weather?.name }}</span>
			<span class="Weather__humidity">{{ weather?.humidity }}%</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Weather {
		display: flex;
		align-items: center;

		font-size: 0.9rem;
		font-weight: 400;
		font-family: var(--ui-font);
		letter-spacing: -0.025em;
		color: var(--theme-fill-primary);
		gap: 0.6rem;

		&__icon {
			flex: 0 0 auto;
			font-size: 1.2rem;
			width: 1em;
			height: 1em;
		}

		&__container {
			display: flex;
			text-transform: capitalize;

			& > * {
				display: flex;
				align-items: center;

				&:not(:last-of-type)::after {
					content: '';
					display: block;
					width: 0.12rem;
					height: 0.12rem;
					margin: 0 0.5rem;

					background-color: var(--theme-fill-primary);
					border-radius: 0.15rem;
					opacity: 0.5;
				}
			}
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
	const shouldShowWeatherName = computed(() => config.weather.showWeatherName);

	const fetchWeather = async () => {
		if (!isEnabled) {
			return null;
		}

		const { appId, location } = config.weather;
		const weatherResponse = __EXTENSION__
			? await browser?.runtime.sendMessage<MessageWeatherRequest, MessageWeatherResponse>({
					method: 'weather',
					appId: appId,
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
