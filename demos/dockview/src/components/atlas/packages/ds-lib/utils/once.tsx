export type OncedFn<TFunc extends (this: any, ...args: any[]) => any> = (
	this: ThisParameterType<TFunc>,
	...args: Parameters<TFunc>
) => ReturnType<TFunc>;

export function once<TFunc extends (...args: any[]) => any>(fn: TFunc): OncedFn<TFunc> {
	let cache: { value: ReturnType<TFunc> } | null = null;

	return function result(
		this: ThisParameterType<TFunc>,
		...args: Parameters<TFunc>
	): ReturnType<TFunc> {
		if (!cache) {
			cache = { value: fn.call(this, ...args) };
		}

		return cache.value;
	};
}
