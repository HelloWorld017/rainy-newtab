type AsKebabCase<
	T extends string,
	TResult extends string = '',
> = T extends `${infer TCurrent}${infer TNext}`
	? AsKebabCase<
			TNext,
			`${TResult}${TCurrent extends Lowercase<TCurrent> ? TCurrent : `-${Lowercase<TCurrent>}`}`
		>
	: TResult extends `-${infer TOutput}`
		? TOutput
		: TResult;

export const asKebabCase = <T extends string>(
	string: T
): string extends T ? string : AsKebabCase<T> =>
	string
		.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
		.replace(/^-/, '') as AsKebabCase<T>;
