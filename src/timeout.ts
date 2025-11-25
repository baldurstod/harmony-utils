export function setTimeoutPromise(timeout: number, signal?: AbortSignal): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const timeoutID = setTimeout(resolve, timeout);

		if (signal) {
			if (signal.aborted) {
				clearTimeout(timeoutID);
				reject(new Error('timeout aborted'));
			} else {
				signal.addEventListener('abort', () => {
					clearTimeout(timeoutID);
					reject(new Error('timeout aborted'));
				});
			}
		}
	});
}
