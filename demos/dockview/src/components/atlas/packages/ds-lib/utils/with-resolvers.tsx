import invariant from 'tiny-invariant';

export function withResolvers<TValue>(): {
	promise: Promise<TValue>;
	resolve: (value: TValue | PromiseLike<TValue>) => void;
	reject: (reason?: any) => void;
} {
	let resolve;
	let reject;

	const promise = new Promise<TValue>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	invariant(resolve);
	invariant(reject);

	return { resolve, reject, promise };
}
