import { ZThemeStyle } from '@/schemas/ThemeStyle';
import { DEFAULT_IMAGE_URL } from './theme';
import type { MessageWeatherResponse } from '@/schemas/Message';

export const MOCK_THEME = {
	test: {
		key: 'test',
		style: ZThemeStyle.parse({}),
		thumbnail: DEFAULT_IMAGE_URL,
	},
};

export const MOCK_WEATHER_RESPONSE = {
	ok: true,
	data: {
		weather: [{ id: 300, icon: '10', main: 'Light drizzle' }],
		main: { temp: 289, humidity: 25 },
	},
} satisfies MessageWeatherResponse;
