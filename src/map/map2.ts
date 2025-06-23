/**
 * Map2 holds a key-key-value triplet using an underlying Map
 * Any value can be used as either keys or value
 */
export class Map2<K1, K2, V> {
	#map = new Map<K1, Map<K2, V>>();

	clear(): void {
		this.#map.clear();
	}

	delete(key1: K1, key2: K2): boolean {
		return this.#map.get(key1)?.delete(key2) ?? false;
	}

	forEach(callbackfn: (value: V, key1: K1, key2: K2, map: Map2<K1, K2, V>) => void, thisArg?: any): void {
		this.#map.forEach(
			(value: Map<K2, V>, key1: K1) => {
				value.forEach(
					(value: V, key2: K2) => callbackfn.call(thisArg, value, key1, key2, this)
				)
			},
		);
	}

	get(key1: K1, key2: K2): V | undefined {
		return this.#map.get(key1)?.get(key2);
	}

	has(key1: K1, key2: K2): boolean {
		return this.#map.get(key1)?.has(key2) ?? false;
	}

	set(key1: K1, key2: K2, value: V): this {
		if (!this.#map.has(key1)) {
			this.#map.set(key1, new Map<K2, V>());
		}

		this.#map.get(key1)!.set(key2, value);
		return this;
	}

	get size(): number {
		let size = 0

		for (const [_, m] of this.#map) {
			size += m.size;
		}

		return size;
	}

	[Symbol.iterator] = (): Map2Iterator<[K1, K2, V]> => {
		const iterator1 = this.#map.entries();
		let iterator2: MapIterator<[K2, V]> | null = null;

		let current1: IteratorResult<[K1, Map<K2, V>], undefined>;

		const next = (): IteratorResult<[K1, K2, V], undefined> => {
			if (iterator2 == null) {
				current1 = iterator1.next();
				if (current1.done) {
					return { done: true } as IteratorResult<[K1, K2, V], undefined>;
				}

				iterator2 = current1.value[1].entries();
			}

			let current2 = iterator2.next();
			if (current2.done) {
				iterator2 = null;
				return next();
			}

			return { value: [current1.value![0], current2.value![0], current2.value![1]], done: false };
		}

		return {
			next: next,
			[Symbol.iterator]() {
				return this;
			},
		};
	}
}

interface Map2Iterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
	[Symbol.iterator](): Map2Iterator<T>;
}
