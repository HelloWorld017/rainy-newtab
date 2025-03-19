import TinyColor from 'tinycolor2';
import { ZColor } from '@/schemas/Color';
import type { VibrantColorPalette } from '../image';
import type { ThemeStyle } from '@/schemas/ThemeStyle';

export const createThemeStyleByPalette = (palette: VibrantColorPalette): ThemeStyle => {
	const fillPrimary = (() => {
		const baseColor = new TinyColor(palette.Vibrant?.hex);
		return baseColor[baseColor.getLuminance() < 0.5 ? 'lighten' : 'darken'](20).toHex();
	})();

	return {
		'fill-primary': ZColor.parse(fillPrimary),
	};
};
