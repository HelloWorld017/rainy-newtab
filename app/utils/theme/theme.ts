import { z } from 'zod';
import {
	STORAGE_KEY_THEME_IMAGE,
	STORAGE_KEY_THEME_KEYS,
	STORAGE_KEY_THEME_STYLE,
	STORAGE_KEY_THEME_THUMB,
} from '@/constants/storage';
import { ZThemeStyle } from '@/schemas/ThemeStyle';
import { browser } from '../browser';
import { getDigest } from '../digest';
import { encodeImage, getVibrantColor, resizeImage } from '../image';
import { readStorage } from '../storage';
import { createThemeStyleByPalette } from './createThemeStyleByPalette';
import type { ThemeStyle } from '@/schemas/ThemeStyle';

export const getThemeImage = async (key: string) =>
	readStorage({ key: STORAGE_KEY_THEME_IMAGE(key), schema: z.string(), defaultValue: null });

export const getThemeThumbnail = async (key: string) =>
	readStorage({ key: STORAGE_KEY_THEME_THUMB(key), schema: z.string(), defaultValue: null });

export const getThemeStyle = async (key: string) =>
	readStorage({
		key: STORAGE_KEY_THEME_STYLE(key),
		schema: ZThemeStyle,
		defaultValue: ZThemeStyle.parse({}),
	});

export const getThemeKeys = async (): Promise<string[]> =>
	readStorage({
		key: STORAGE_KEY_THEME_KEYS,
		schema: z.array(z.string()),
		defaultValue: [],
	});

export const addTheme = async (image: HTMLImageElement): Promise<void> => {
	if (image.naturalWidth < 300 || image.naturalHeight < 200) {
		throw new Error('Image is too small!');
	}

	const themeStylePromise = getVibrantColor(image).then(palette =>
		createThemeStyleByPalette(palette)
	);

	const dataUrl = encodeImage(resizeImage(image, image.naturalWidth, image.naturalHeight));
	const thumbDataUrl = encodeImage(resizeImage(image, 300, 200));
	const digest = await getDigest(dataUrl);

	await browser?.storage.local.set({
		[STORAGE_KEY_THEME_KEYS]: Array.from(new Set([...(await getThemeKeys()), digest])),
		[STORAGE_KEY_THEME_IMAGE(digest)]: dataUrl,
		[STORAGE_KEY_THEME_THUMB(digest)]: thumbDataUrl,
		[STORAGE_KEY_THEME_STYLE(digest)]: await themeStylePromise,
	});
};

export const deleteTheme = async (key: string): Promise<void> => {
	await browser?.storage.local.set({
		[STORAGE_KEY_THEME_KEYS]: (await getThemeKeys()).filter(themeKey => themeKey !== key),
	});

	await browser?.storage.local.remove([
		STORAGE_KEY_THEME_IMAGE(key),
		STORAGE_KEY_THEME_THUMB(key),
		STORAGE_KEY_THEME_STYLE(key),
	]);
};

export const updateThemeStyle = async (key: string, style: ThemeStyle) =>
	browser?.storage.local.set({ [STORAGE_KEY_THEME_STYLE(key)]: style });
