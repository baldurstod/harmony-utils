import { Map2 } from '../map/map2';

type ErrorLevel = 'error' | 'log' | 'debug' | 'info' | 'warn';
interface ErrorValue { };

let messages: Map2<ErrorLevel, string, number>;
let messagesSet: Map2<ErrorLevel, string, Set<ErrorValue>>;
let messagesMap: Map2<ErrorLevel, string, Map<ErrorValue, ErrorValue | undefined>>;

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

function messageSet(level: ErrorLevel, message: string, value: ErrorValue): void {
	if (!messagesSet) {
		messagesSet = new Map2<ErrorLevel, string, Set<ErrorValue>>();
	}

	let s = messagesSet.get(level, message);
	if (!s) {
		s = new Set<ErrorValue>();
		messagesSet.set(level, message, s);
		s.add(value);
		console[level](message, s);
	} else {
		s.add(value);
	}
}

export function errorSet(message: string, value: ErrorValue): void {
	messageSet('error', message, value);
}

export function warnSet(message: string, value: ErrorValue): void {
	messageSet('warn', message, value);
}

export function debugSet(message: string, value: ErrorValue): void {
	messageSet('debug', message, value);
}

export function logSet(message: string, value: ErrorValue): void {
	messageSet('log', message, value);
}

export function infoSet(message: string, value: ErrorValue): void {
	messageSet('info', message, value);
}

function messageMap(level: ErrorLevel, message: string, key: ErrorValue, value?: ErrorValue): void {
	if (!messagesMap) {
		messagesMap = new Map2<ErrorLevel, string, Map<ErrorValue, ErrorValue | undefined>>();
	}

	let s = messagesMap.get(level, message);
	if (!s) {
		s = new Map<ErrorValue, ErrorValue | undefined>();
		messagesMap.set(level, message, s);
		s.set(key, value);
		console[level](message, s);
	} else {
		s.set(key, value);
	}
}

export function errorMap(message: string, key: ErrorValue, value?: ErrorValue): void {
	messageMap('error', message, key, value);
}

export function warnMap(message: string, key: ErrorValue, value?: ErrorValue): void {
	messageMap('warn', message, key, value);
}

export function debugMap(message: string, key: ErrorValue, value?: ErrorValue): void {
	messageMap('debug', message, key, value);
}

export function logMap(message: string, key: ErrorValue, value?: ErrorValue): void {
	messageMap('log', message, key, value);
}

export function infoMap(message: string, key: ErrorValue, value?: ErrorValue): void {
	messageMap('info', message, key, value);
}
