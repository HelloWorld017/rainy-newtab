import { z } from 'zod';

export const ZColor = z
	.string()
	.regex(/^#[0-9a-f]{3,}$/)
	.brand('color');

export const ZThemeStyle = z.object({
	vibrant: ZColor.default('#ffffff'),
	darkVibrant: ZColor.default('#000000'),
	lightVibrant: ZColor.default('#ffffff'),
	muted: ZColor.default('#ffffff80'),
	darkMuted: ZColor.default('#00000080'),
	lightMuted: ZColor.default('#ffffff80'),
});

export type ThemeStyle = z.TypeOf<typeof ZThemeStyle>;
