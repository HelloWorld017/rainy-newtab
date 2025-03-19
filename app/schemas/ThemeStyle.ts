import { z } from 'zod';
import { ZColor } from './Color';

export const ZThemeStyle = z.object({
	'fill-primary': ZColor.default('#fff'),
});

export type ThemeStyle = z.TypeOf<typeof ZThemeStyle>;
