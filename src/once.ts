/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function once(this: unknown, fn: Function, context?: Function): () => unknown {
	let result: Function;
	let fn2: Function | null = fn;

	return (...args) => {
		if (fn2) {
			result = fn2.apply(context ?? this, args) as Function;
			fn2 = null;
		}

		return result;
	};
}
