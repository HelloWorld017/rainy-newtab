import TinyColor from 'tinycolor2';
import { z } from 'zod';

export const ZColor = z
	.string()
	.transform(color => new TinyColor(color))
	.refine(color => color.isValid())
	.transform(color => `#${color.toHex8()}`)
	.brand('color');
