const prefixes: [number, string][] = [
	[1000000000000000000, 'E'],
	[1000000000000000, 'P'],
	[1000000000000, 'T'],
	[1000000000, 'G'],
	[1000000, 'M'],
	[1000, 'k'],
	/*
	[1, ''],
	[0.001, 'm'],
	[0.000001, 'µ'],
	[0.000000001, 'n'],
	*/
]

export function toHumanReadable(input: number): string {

	let symbol = '';
	let value = input;

	for (const [prefix, s] of prefixes) {
		if (input > prefix) {
			symbol = s;
			value = Math.round(value / prefix);
			break;
		}
	}

	if (symbol) {
		return `${value} ${symbol}`;
	}

	return String(input);
}
