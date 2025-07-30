export function once(this: any, fn: Function, context?: Function): () => any {
	let result: Function;
	let fn2: Function | null = fn;

	return () => {
		if (fn2) {
			result = fn2.apply(context ?? this, arguments);
			fn2 = null;
		}

		return result;
	};
}
