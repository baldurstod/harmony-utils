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
    getHsl(): number[];
    getRgba(): number[];
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
 * Map2 holds a key-key-value triplet using an underlying Map
 * Any value can be used as either keys or value
 */
export declare class Map2<K1, K2, V> {
    #private;
    clear(): void;
    delete(key1: K1, key2: K2): boolean;
    forEach(callbackfn: (value: V, key1: K1, key2: K2, map: Map2<K1, K2, V>) => void, thisArg?: any): void;
    get(key1: K1, key2: K2): V | undefined;
    has(key1: K1, key2: K2): boolean;
    set(key1: K1, key2: K2, value: V): this;
    get size(): number;
    [Symbol.iterator]: () => Map2Iterator<[K1, K2, V]>;
}

declare interface Map2Iterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): Map2Iterator<T>;
}

/**
 * The purpose of this class is to circumvent the bug below
 * Extend MyEventTarget instead of EventTarget
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1473306
 */
export declare class MyEventTarget {
    #private;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

export declare function once(this: any, fn: Function, context?: Function): () => any;

export declare class Queue<T> {
    #private;
    constructor(values: T[]);
    enqueue(value: T): void;
    dequeue(): T | null;
}

export declare function setTimeoutPromise(timeout: number, signal?: AbortSignal): Promise<unknown>;

/**
 * Static version of MyEventTarget
 */
export declare class StaticEventTarget {
    #private;
    static addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    static dispatchEvent(event: Event): boolean;
    static removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

export { }
