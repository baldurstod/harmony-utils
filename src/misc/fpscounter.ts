/**
 * An utility class that either count frames per second or quantity per second, averaging the last N samples
 */
export class FpsCounter {
	#sampleSize: number;
	#samples: number[] = [];
	#samples2: number[] = [];
	#lastFrameTime = 0;

	/**
	 * Constructor
	 * @param sampleSize The max number of samples to consider. Default to 10.
	 */
	constructor(sampleSize = 10) {
		this.#sampleSize = sampleSize;
	}

	/**
	 * Add a new frame.
	 * @param currentTime An optional time, in milliseconds. Default to performance.now().
	 */
	addFrame(currentTime = performance.now()): void {
		const deltaTime = (currentTime - this.#lastFrameTime) / 1000;
		this.#lastFrameTime = currentTime;

		this.#samples.push(deltaTime);
		if (this.#samples.length > this.#sampleSize) {
			this.#samples.shift();
		}
	}

	/**
	 * Get the average fps over the last N samples.
	 * @returns The averaged fps
	 */
	getFps(): number {
		const avgDeltaTime = this.#samples.reduce((sum, dt) => sum + dt, 0) / this.#samples.length;
		if (avgDeltaTime === 0) {
			return 0;
		}
		return Math.round(1 / avgDeltaTime);
	}

	/**
	 * Add quantity. Do not mix up addFrame and addQuantity, use a different counter.
	 * @param quantity The quantity to add, for instance an amount of rays.
	 * @param currentTime An optional time, in milliseconds. Default to performance.now().
	 */
	addQuantity(quantity: number, currentTime = performance.now()): void {
		const deltaTime = (currentTime - this.#lastFrameTime) / 1000;
		this.#lastFrameTime = currentTime;

		this.#samples.push(deltaTime);
		this.#samples2.push(quantity);
		if (this.#samples.length > this.#sampleSize) {
			this.#samples.shift();
			this.#samples2.shift();
		}
	}

	/**
	 * Get the average quantity per second over the last N samples.
	 * @returns The averaged quantity per second.
	 */
	getSpeed(): number {
		const len = this.#samples.length;
		const avgDeltaTime = this.#samples.reduce((sum, dt) => sum + dt, 0) / len;
		const sum = this.#samples2.reduce((sum, qty) => sum + qty, 0) / len;
		if (avgDeltaTime === 0) {
			return 0;
		}
		return Math.round(sum / avgDeltaTime);
	}
}
