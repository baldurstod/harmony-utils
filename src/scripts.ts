export async function loadScripts(scripts: Array<string>): Promise<void> {
	const promises: Array<Promise<void>> = [];
	const resolves: Array<(value: void) => void> = [];

	for (let i = 0; i < scripts.length; i++) {
		promises.push(new Promise(resolve => resolves.push(resolve)));
	}

	const loader = function (src: string, handler: () => void, resolve: (value: void) => void) {
		const script = document.createElement('script') as HTMLScriptElement;
		script.src = src;
		script.onload = () => {
			script.onload = null;
			resolve();
			handler();
		}
		const head = document.getElementsByTagName('head')[0];
		(head || document.body).appendChild(script);
	};
	(function run() {
		if (scripts.length != 0) {
			loader(scripts.shift()!, run, resolves.shift()!);
		}
	})();

	await Promise.all(promises);
}
