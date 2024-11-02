function setTimeoutPromise(timeout, signal) {
    return new Promise((resolve, reject) => {
        const timeoutID = setTimeout(resolve, timeout);
        if (signal) {
            if (signal.aborted) {
                clearTimeout(timeoutID);
                reject('aborted');
            }
            else {
                signal.addEventListener('abort', () => {
                    clearTimeout(timeoutID);
                    reject('aborted');
                });
            }
        }
    });
}

export { setTimeoutPromise };
