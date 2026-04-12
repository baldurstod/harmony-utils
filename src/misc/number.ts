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

export function toHumanReadable(input: number, precision = 0): string {

	let symbol = '';
	let value = input;

	const dec = Math.pow(10, Math.round(Math.max(precision, 0)));

	for (const [prefix, s] of prefixes) {
		if (input > prefix) {
			symbol = s;
			if (dec === 1) {
				value = Math.round(value / prefix);
			} else {
				value = Math.round(value / (prefix / dec)) / dec;
			}
			break;
		}
	}

	if (symbol) {
		return `${value} ${symbol}`;
	}

	return String(input);
}
