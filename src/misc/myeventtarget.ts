/**
 * The purpose of this class is to circumvent the bug below
 * Extend MyEventTarget instead of EventTarget
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1473306
 */
export class MyEventTarget<T extends string = string, E extends Event = Event> {
	#eventTarget = new EventTarget();

	addEventListener(type: T, callback: MyEventListenerOrEventListenerObject<E> | null, options?: AddEventListenerOptions | boolean): void {
		this.#eventTarget.addEventListener(type, callback as EventListenerOrEventListenerObject, options);
	}

	dispatchEvent(event: E): boolean {
		return this.#eventTarget.dispatchEvent(event);
	}

	removeEventListener(type: T, callback: MyEventListenerOrEventListenerObject<E> | null, options?: EventListenerOptions | boolean): void {
		this.#eventTarget.removeEventListener(type, callback as EventListenerOrEventListenerObject, options);
	}

	getEventTarget(): EventTarget {
		return this.#eventTarget;
	}
}

type MyEventListenerOrEventListenerObject<E extends Event = Event> = MyEventListener<E> | MyEventListenerObject<E>;

interface MyEventListener<E extends Event = Event> {
	(evt: E): void;
}

interface MyEventListenerObject<E extends Event = Event> {
	handleEvent(object: E): void;
}
