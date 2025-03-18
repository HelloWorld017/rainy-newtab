import { ZColor } from '@/schemas/ThemeStyle';
import { DEFAULT_IMAGE_URL } from './theme';
import type { MessageWeatherResponse } from '@/schemas/Message';
import type { ThemeStyle } from '@/schemas/ThemeStyle';

export const MOCK_THEME = {
	test: {
		key: 'test',
		style: {
			'fill-primary': ZColor.parse('#ffffff'),
		} satisfies ThemeStyle,
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
