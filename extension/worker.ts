import { WEATHER_SERVER } from '@/constants/services';
import { ZWeather } from '@/schemas/Weather';
import { browser } from '@/utils/browser';
import type { MessageRequest, MessageWeatherResponse } from '@/schemas/Message';
import type { Weather } from '@/schemas/Weather';

let lastWeather: { fetchedAt: number; location: string; data: Weather } | null = null;

browser?.runtime.onMessage.addListener((request: MessageRequest, sender, sendResponse) => {
	if (sender.id !== browser?.runtime.id) {
		return false;
	}

	if (request.method === 'weather') {
		const sendWeatherResponse = sendResponse as (response: MessageWeatherResponse) => void;
		if (
			lastWeather &&
			lastWeather.location === request.location &&
			Date.now() - lastWeather.fetchedAt < 60_000
		) {
			sendWeatherResponse({ ok: true, data: lastWeather.data });
			return true;
		}

		fetch(WEATHER_SERVER(request.location, request.appId))
			.then(response => response.json())
			.then(json => ZWeather.parse(json))
			.then(
				data =>
					(lastWeather = {
						data,
						fetchedAt: Date.now(),
						location: request.location,
					})
			)
			.then(({ data }) => sendWeatherResponse({ ok: true, data }))
			.catch(() => sendWeatherResponse({ ok: false, data: null }));

		return true;
	}
});
