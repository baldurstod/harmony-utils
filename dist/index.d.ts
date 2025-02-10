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

export declare function setTimeoutPromise(timeout: number, signal?: AbortSignal): Promise<unknown>;

export { }
