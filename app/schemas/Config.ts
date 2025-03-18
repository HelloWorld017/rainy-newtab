import { z } from 'zod';

export const ZConfig = z.object({
	initial: z.boolean().default(true),
	weather: z
		.object({
			appId: z.string().default(''),
			location: z.string().default('Seoul, KR'),
			showWeatherName: z.boolean().default(false),
		})
		.default({}),
});

export type Config = z.TypeOf<typeof ZConfig>;
