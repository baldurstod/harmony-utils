export function setTimeoutPromise(delay, signal) {
	return new Promise((resolve, reject) => {
		const timeoutID = setTimeout(resolve, delay);

		if (signal) {
			if (signal.aborted) {
				clearTimeout(timeoutID);
				reject('aborted');
			} else {
				signal.addEventListener('abort', () => {
					clearTimeout(timeoutID);
					reject('aborted');
				});
			}
		}
	});
}

// You should probably only use that for node apps
export function setImmediatePromise() {
	return new Promise(resolve => setImmediate(resolve));
}
