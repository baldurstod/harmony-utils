/**
 * The purpose of this class is to circumvent the bug below
 * Extend MyEventTarget instead of EventTarget
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1473306
 */
export class MyEventTarget {
	#eventTarget = new EventTarget();

    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void {
		this.#eventTarget.addEventListener(type, callback, options);
	}

    dispatchEvent(event: Event): boolean {
		return this.#eventTarget.dispatchEvent(event);
	}

    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
		this.#eventTarget.removeEventListener(type, callback, options);
	}
}
