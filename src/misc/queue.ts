class Item<T> {
	data: T;
	next: Item<T> | null = null;

	constructor(data: T) {
		this.data = data;
	}
}

export class Queue<T> {
	#first: Item<T> | null = null;
	#last: Item<T> | null = null;

	constructor(values: T[]) {
		for (const value of values) {
			this.enqueue(value);
		}
	}

	enqueue(value: T): void {
		const item = new Item<T>(value);
		if (!this.#first) {
			this.#first = item;
		}
		if (this.#last) {
			this.#last.next = item;
		}
		this.#last = item;

	}

	dequeue(): T | null {
		const item = this.#first;
		if (item) {
			this.#first = item.next;
			if (item == this.#last) {
				this.#last = null;
			}
			return item.data;
		}
		return null;
	}
}
