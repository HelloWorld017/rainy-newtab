import { z } from 'zod';
import { ZWeather } from './Weather';

export const ZMessageWeatherRequest = z.object({
	method: z.literal('weather'),
	location: z.string(),
	appId: z.string(),
});

export const ZMessageWeatherSuccess = z.object({
	ok: z.literal(true),
	data: ZWeather,
});

export const ZMessageWeatherFailure = z.object({
	ok: z.literal(false),
	data: z.null(),
});

export const ZMessageWeatherResponse = z.union([ZMessageWeatherSuccess, ZMessageWeatherFailure]);

export type MessageWeatherRequest = z.TypeOf<typeof ZMessageWeatherRequest>;
export type MessageWeatherSuccess = z.TypeOf<typeof ZMessageWeatherSuccess>;
export type MessageWeatherFailure = z.TypeOf<typeof ZMessageWeatherFailure>;
export type MessageWeatherResponse = z.TypeOf<typeof ZMessageWeatherResponse>;

export const ZMessageRequest = z.union([ZMessageWeatherRequest, z.never()]);
export const ZMessageResponse = z.union([ZMessageWeatherResponse, z.never()]);
export type MessageRequest = z.TypeOf<typeof ZMessageRequest>;
export type MessageResponse = z.TypeOf<typeof ZMessageResponse>;
