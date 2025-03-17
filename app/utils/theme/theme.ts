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

const readStorageAsString = async (storageKey: string): Promise<string | null> =>
	z.string().safeParse(await browser?.storage.local.get(storageKey)).data ?? null;

export const getThemeImage = async (key: string) =>
	readStorageAsString(STORAGE_KEY_THEME_IMAGE(key));

export const getThemeThumbnail = async (key: string) =>
	readStorageAsString(STORAGE_KEY_THEME_THUMB(key));

export const getThemeStyle = async (key: string) =>
	ZThemeStyle.safeParse(await browser?.storage.local.get(STORAGE_KEY_THEME_THUMB(key))).data ??
	ZThemeStyle.parse({});

export const getThemeKeys = async (): Promise<string[]> => {
	const keys = await browser?.storage.local.get(STORAGE_KEY_THEME_KEYS);
	return z.array(z.string()).safeParse(keys).data ?? [];
};

export const addTheme = async (image: HTMLImageElement): Promise<void> => {
	if (image.naturalWidth < 300 || image.naturalHeight < 200) {
		throw new Error('Image is too small!');
	}

	const themeStyle = getVibrantColor(image).then(palette =>
		ZThemeStyle.parse({
			'fill-primary': palette.Vibrant?.hex,
		})
	);

	const dataUrl = encodeImage(resizeImage(image, image.naturalWidth, image.naturalHeight));
	const thumbDataUrl = encodeImage(resizeImage(image, 300, 200));
	const digest = await getDigest(dataUrl);

	await browser?.storage.local.set({
		[STORAGE_KEY_THEME_KEYS]: Array.from(new Set([...(await getThemeKeys()), digest])),
		[STORAGE_KEY_THEME_IMAGE(digest)]: dataUrl,
		[STORAGE_KEY_THEME_THUMB(digest)]: thumbDataUrl,
		[STORAGE_KEY_THEME_STYLE(digest)]: themeStyle,
	});
};

export const deleteTheme = async (key: string): Promise<void> => {
	await browser?.storage.local.set({
		[STORAGE_KEY_THEME_KEYS]: (await getThemeKeys()).filter(themeKey => themeKey !== key),
	});

	await browser?.storage.local.remove([
		STORAGE_KEY_THEME_IMAGE(key),
		STORAGE_KEY_THEME_THUMB(key),
	]);
};
