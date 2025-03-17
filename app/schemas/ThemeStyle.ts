import { z } from 'zod';

export const ZColor = z
	.string()
	.regex(/^#[0-9a-f]{3,}$/)
	.brand('color');

export const ZThemeStyle = z.object({
	'fill-primary': ZColor.default('#ffffff'),
});

export type ThemeStyle = z.TypeOf<typeof ZThemeStyle>;
