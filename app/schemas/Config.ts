import { z } from 'zod';

export const ZConfig = z.object({
	initial: z.boolean().default(true),
	weather: z
		.object({
			appId: z.string().nullable().default(null),
			location: z.string().default('Seoul, KR'),
			showWeatherName: z.boolean().nullable().default(false),
		})
		.default({}),
});

export type Config = z.TypeOf<typeof ZConfig>;
