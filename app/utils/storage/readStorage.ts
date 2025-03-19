import { browser } from '../browser';
import type { z } from 'zod';

type ReadStorageParams<T, TDefault> = {
	storageKind?: 'local' | 'sync';
	key: string;
	schema: z.ZodType<T, z.ZodTypeDef, unknown>;
	defaultValue: TDefault;
};

export const readStorage = async <T, TDefault = T>({
	storageKind = 'local',
	key,
	schema,
	defaultValue,
}: ReadStorageParams<T, TDefault>): Promise<T | TDefault> => {
	const parseResult = schema.safeParse((await browser?.storage[storageKind].get(key))?.[key]);
	if (!parseResult.success) {
		return defaultValue;
	}

	return parseResult.data;
};
