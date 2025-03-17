export const STORAGE_KEY_CONFIG = 'config';
export const STORAGE_KEY_THEME_KEYS = 'theme/keys';
export const STORAGE_KEY_THEME_IMAGE = (key: string) => `theme/image-${key}` as const;
export const STORAGE_KEY_THEME_THUMB = (key: string) => `theme/thumb-${key}` as const;
export const STORAGE_KEY_THEME_STYLE = (key: string) => `theme/style-${key}` as const;
