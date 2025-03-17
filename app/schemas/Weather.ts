import { z } from 'zod';

export const ZWeather = z.object({
	weather: z.array(
		z.object({
			id: z.number(),
			icon: z.string(),
			main: z.string(),
		})
	),

	main: z.object({
		temp: z.number(),
		humidity: z.number(),
	}),
});

export type Weather = z.TypeOf<typeof ZWeather>;
