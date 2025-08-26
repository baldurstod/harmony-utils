/**
 * Static version of MyEventTarget
 */
export class StaticEventTarget {
	static #eventTarget = new EventTarget();

    static addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void {
		this.#eventTarget.addEventListener(type, callback, options);
	}

    static dispatchEvent(event: Event): boolean {
		return this.#eventTarget.dispatchEvent(event);
	}

    static removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
		this.#eventTarget.removeEventListener(type, callback, options);
	}

	static getEventTarget(): EventTarget {
		return this.#eventTarget;
	}
}
