function rgbToHsl(r, g, b) {
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s;
    const l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
}
class Color {
    #rgba;
    constructor({ red = 0, green = 0, blue = 0, alpha = 1, hex = '' } = {}) {
        this.#rgba = [red, green, blue, alpha];
        if (hex) {
            this.setHex(hex);
        }
    }
    setHue(hue) {
        const hsl = rgbToHsl(this.#rgba[0], this.#rgba[1], this.#rgba[2]);
        const rgb = hslToRgb(hue, hsl[1], hsl[2]);
        this.#rgba[0] = rgb[0];
        this.#rgba[1] = rgb[1];
        this.#rgba[2] = rgb[2];
    }
    setSatLum(sat, lum) {
        const hsl = rgbToHsl(this.#rgba[0], this.#rgba[1], this.#rgba[2]);
        const rgb = hslToRgb(hsl[0], sat, lum);
        this.#rgba[0] = rgb[0];
        this.#rgba[1] = rgb[1];
        this.#rgba[2] = rgb[2];
    }
    setHex(hex) {
        hex = (hex.startsWith('#') ? hex.slice(1) : hex)
            .replace(/^(\w{3})$/, '$1F') //987      -> 987F
            .replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4') //9876     -> 99887766
            .replace(/^(\w{6})$/, '$1FF'); //987654   -> 987654FF
        if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
            throw new Error('Unknown hex color; ' + hex);
        }
        const rgba = hex
            .match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/)?.slice(1) //98765432 -> 98 76 54 32
            .map(x => parseInt(x, 16)); //Hex to decimal
        if (rgba) {
            this.#rgba[0] = rgba[0] / 255;
            this.#rgba[1] = rgba[1] / 255;
            this.#rgba[2] = rgba[2] / 255;
            this.#rgba[3] = rgba[3] / 255;
        }
    }
    getHex() {
        const hex = this.#rgba.map(x => Math.round(x * 255).toString(16));
        return '#' + hex.map(x => x.padStart(2, '0')).join('');
    }
    getHue() {
        return rgbToHsl(this.#rgba[0], this.#rgba[1], this.#rgba[2])[0];
    }
    getHsl() {
        return rgbToHsl(this.#rgba[0], this.#rgba[1], this.#rgba[2]);
    }
    getRgba() {
        return this.#rgba;
    }
    set red(red) {
        this.#rgba[0] = red;
    }
    get red() {
        return this.#rgba[0];
    }
    set green(green) {
        this.#rgba[1] = green;
    }
    get green() {
        return this.#rgba[1];
    }
    set blue(blue) {
        this.#rgba[2] = blue;
    }
    get blue() {
        return this.#rgba[2];
    }
    set alpha(alpha) {
        this.#rgba[3] = alpha;
    }
    get alpha() {
        return this.#rgba[3];
    }
    getLuminance() {
        return 0.2126 * this.#rgba[0] + 0.7152 * this.#rgba[1] + 0.0722 * this.#rgba[2];
    }
}

/**
 * Map2 holds a key-key-value triplet using an underlying Map
 * Any value can be used as either keys or value
 */
class Map2 {
    #map = new Map();
    clear() {
        this.#map.clear();
    }
    delete(key1, key2) {
        return this.#map.get(key1)?.delete(key2) ?? false;
    }
    forEach(callbackfn, thisArg) {
        this.#map.forEach((value, key1) => {
            value.forEach((value, key2) => callbackfn.call(thisArg, value, key1, key2, this));
        });
    }
    get(key1, key2) {
        return this.#map.get(key1)?.get(key2);
    }
    getMap(key1) {
        return this.#map;
    }
    getSubMap(key1) {
        return this.#map.get(key1);
    }
    has(key1, key2) {
        return this.#map.get(key1)?.has(key2) ?? false;
    }
    set(key1, key2, value) {
        if (!this.#map.has(key1)) {
            this.#map.set(key1, new Map());
        }
        this.#map.get(key1).set(key2, value);
        return this;
    }
    get size() {
        let size = 0;
        for (const [, m] of this.#map) {
            size += m.size;
        }
        return size;
    }
    [Symbol.iterator] = () => {
        const iterator1 = this.#map.entries();
        let iterator2 = null;
        let current1;
        const next = () => {
            if (iterator2 == null) {
                current1 = iterator1.next();
                if (current1.done) {
                    return { done: true };
                }
                iterator2 = current1.value[1].entries();
            }
            const current2 = iterator2.next();
            if (current2.done) {
                iterator2 = null;
                return next();
            }
            return { value: [current1.value[0], current2.value[0], current2.value[1]], done: false };
        };
        return {
            next: next,
            [Symbol.iterator]() {
                return this;
            },
        };
    };
}

/**
 * Create an image from a file.
 * @param file The file containing an image.
 * @returns A promise that fulfills to a decoded image or null
 */
function fileToImage(file) {
    const reader = new FileReader();
    let promiseResolve;
    const promise = new Promise((resolve) => {
        promiseResolve = resolve;
    });
    reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.decode()
            .then(() => promiseResolve(image))
            .catch(() => promiseResolve(null));
    };
    reader.readAsDataURL(file);
    return promise;
}

/**
 * The purpose of this class is to circumvent the bug below
 * Extend MyEventTarget instead of EventTarget
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1473306
 */
class MyEventTarget {
    #eventTarget = new EventTarget();
    addEventListener(type, callback, options) {
        this.#eventTarget.addEventListener(type, callback, options);
    }
    dispatchEvent(event) {
        return this.#eventTarget.dispatchEvent(event);
    }
    removeEventListener(type, callback, options) {
        this.#eventTarget.removeEventListener(type, callback, options);
    }
    getEventTarget() {
        return this.#eventTarget;
    }
}

class Item {
    data;
    next = null;
    constructor(data) {
        this.data = data;
    }
}
class Queue {
    #first = null;
    #last = null;
    constructor(values) {
        for (const value of values) {
            this.enqueue(value);
        }
    }
    enqueue(value) {
        const item = new Item(value);
        if (!this.#first) {
            this.#first = item;
        }
        if (this.#last) {
            this.#last.next = item;
        }
        this.#last = item;
    }
    dequeue() {
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

/**
 * Static version of MyEventTarget
 */
class StaticEventTarget {
    static eventTarget = new EventTarget();
    static addEventListener(type, callback, options) {
        this.eventTarget.addEventListener(type, callback, options);
    }
    static dispatchEvent(event) {
        return this.eventTarget.dispatchEvent(event);
    }
    static removeEventListener(type, callback, options) {
        this.eventTarget.removeEventListener(type, callback, options);
    }
}

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
function once(fn, context) {
    let result;
    let fn2 = fn;
    return (...args) => {
        if (fn2) {
            result = fn2.apply(context ?? this, args);
            fn2 = null;
        }
        return result;
    };
}

function setTimeoutPromise(timeout, signal) {
    return new Promise((resolve, reject) => {
        const timeoutID = setTimeout(resolve, timeout);
        if (signal) {
            if (signal.aborted) {
                clearTimeout(timeoutID);
                reject(new Error('timeout aborted'));
            }
            else {
                signal.addEventListener('abort', () => {
                    clearTimeout(timeoutID);
                    reject(new Error('timeout aborted'));
                });
            }
        }
    });
}

export { Color, Map2, MyEventTarget, Queue, StaticEventTarget, fileToImage, once, setTimeoutPromise };
