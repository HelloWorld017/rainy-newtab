import { z } from 'zod';

export const ZNowPlaying = z.object({
	artist: z.string(),
	album: z.string(),
	cover: z.string(),
	duration: z.number(),
	position: z.number(),
	title: z.string(),
});

export const ZNowPlayingUpdate = z.object({
	type: z.literal('wnp-info'),
	player: ZNowPlaying,
});

export type NowPlaying = z.TypeOf<typeof ZNowPlaying>;
export type NowPlayingUpdate = z.TypeOf<typeof ZNowPlayingUpdate>;
