import type { MessageWeatherResponse } from '@/schemas/Message';

export const MOCK_WEATHER_RESPONSE = {
	ok: true,
	data: {
		weather: [{ id: 300, icon: '10', main: 'Light drizzle' }],
		main: { temp: 289, humidity: 25 },
	},
} satisfies MessageWeatherResponse;
