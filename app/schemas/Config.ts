import { z } from 'zod';

export const ZConfig = z.object({
	initial: z.boolean().default(true),
	weather: z
		.object({
			appId: z.string().nullable().default(null),
			location: z.string().default('Seoul, KR'),
		})
		.default({}),
});

export type Config = z.TypeOf<typeof ZConfig>;
