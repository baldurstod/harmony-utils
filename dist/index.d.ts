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

export declare function setTimeoutPromise(timeout: number, signal?: AbortSignal): Promise<unknown>;

export { }
