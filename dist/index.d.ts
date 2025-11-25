export declare class Color {
    #private;
    constructor({ red, green, blue, alpha, hex }?: {
        red?: number | undefined;
        green?: number | undefined;
        blue?: number | undefined;
        alpha?: number | undefined;
        hex?: string | undefined;
    });
    setHue(hue: number): void;
    setSatLum(sat: number, lum: number): void;
    setHex(hex: string): void;
    getHex(): string;
    getHue(): number;
    getHsl(): [number, number, number];
    getRgba(): [number, number, number, number];
    set red(red: number);
    get red(): number;
    set green(green: number);
    get green(): number;
    set blue(blue: number);
    get blue(): number;
    set alpha(alpha: number);
    get alpha(): number;
    getLuminance(): number;
}

/**
 * Create an image from a file.
 * @param file The file containing an image.
 * @returns A promise that fulfills to a decoded image or null
 */
export declare function fileToImage(file: File): Promise<HTMLImageElement | null>;

/**
 * Map2 holds a key-key-value triplet using an underlying Map
 * Any value can be used as either keys or value
 */
export declare class Map2<K1, K2, V> {
    #private;
    clear(): void;
    delete(key1: K1, key2: K2): boolean;
    forEach(callbackfn: (value: V, key1: K1, key2: K2, map: Map2<K1, K2, V>) => void, thisArg?: unknown): void;
    get(key1: K1, key2: K2): V | undefined;
    getSubMap(key1: K1): Map<K2, V> | undefined;
    has(key1: K1, key2: K2): boolean;
    set(key1: K1, key2: K2, value: V): this;
    get size(): number;
    [Symbol.iterator]: () => Map2Iterator<[K1, K2, V]>;
}

declare interface Map2Iterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): Map2Iterator<T>;
}

declare type MyEventListener<E extends Event = Event> = (evt: E) => void;

declare interface MyEventListenerObject<E extends Event = Event> {
    handleEvent(object: E): void;
}

declare type MyEventListenerOrEventListenerObject<E extends Event = Event> = MyEventListener<E> | MyEventListenerObject<E>;

/**
 * The purpose of this class is to circumvent the bug below
 * Extend MyEventTarget instead of EventTarget
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1473306
 */
export declare class MyEventTarget<T extends string = string, E extends Event = Event> {
    #private;
    addEventListener(type: T, callback: MyEventListenerOrEventListenerObject<E> | null, options?: AddEventListenerOptions | boolean): void;
    dispatchEvent(event: E): boolean;
    removeEventListener(type: T, callback: MyEventListenerOrEventListenerObject<E> | null, options?: EventListenerOptions | boolean): void;
    getEventTarget(): EventTarget;
}

export declare function once(this: unknown, fn: Function, context?: Function): () => unknown;

export declare class Queue<T> {
    #private;
    constructor(values: T[]);
    enqueue(value: T): void;
    dequeue(): T | null;
}

export declare function setTimeoutPromise(timeout: number, signal?: AbortSignal): Promise<void>;

/**
 * Static version of MyEventTarget
 */
export declare class StaticEventTarget {
    static readonly eventTarget: EventTarget;
    static addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    static dispatchEvent(event: Event): boolean;
    static removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

export { }
