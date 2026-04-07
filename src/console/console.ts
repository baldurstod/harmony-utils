import { Map2 } from '../map/map2';

type ErrorLevel = 'error' | 'log' | 'debug' | 'info' | 'warn';
interface ErrorValue { };

let messages: Map2<ErrorLevel, string, number>;
let messages2: Map2<ErrorLevel, string, Set<ErrorValue>>;

function messageOnce(level: ErrorLevel, message: string, max: number): void {
	if (!messages) {
		messages = new Map2<ErrorLevel, string, number>();
	}
	if (!messages.has(level, message)) {
		messages.set(level, message, 0);
	}

	const newCount = messages.get(level, message)! + 1;
	messages.set(level, message, newCount);

	if (newCount <= max) {
		console[level](message);
	}
}

export function errorOnce(message: string, max = 1): void {
	messageOnce('error', message, max);
}

export function warnOnce(message: string, max = 1): void {
	messageOnce('warn', message, max);
}

export function debugOnce(message: string, max = 1): void {
	messageOnce('debug', message, max);
}

export function logOnce(message: string, max = 1): void {
	messageOnce('log', message, max);
}

export function infoOnce(message: string, max = 1): void {
	messageOnce('info', message, max);
}

export function messageStack(level: ErrorLevel, message: string, value: ErrorValue): void {
	if (!messages2) {
		messages2 = new Map2<ErrorLevel, string, Set<ErrorValue>>();
	}

	if (!messages2.has(level, message)) {
		const s = new Set<ErrorValue>();
		messages2.set(level, message, s);
		console[level](message, s);
	}

	messages2.get(level, message)!.add(value);
}

export function errorStack(message: string, value: ErrorValue): void {
	messageStack('error', message, value);
}

export function warnStack(message: string, value: ErrorValue): void {
	messageStack('warn', message, value);
}

export function debugStack(message: string, value: ErrorValue): void {
	messageStack('debug', message, value);
}

export function logStack(message: string, value: ErrorValue): void {
	messageStack('log', message, value);
}

export function infoStack(message: string, value: ErrorValue): void {
	messageStack('info', message, value);
}
