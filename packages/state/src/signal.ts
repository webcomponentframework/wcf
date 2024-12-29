const SignalMap = new WeakMap<HTMLElement, Signal<any>>()

export function signal<T>(el:HTMLElement, value: T) {
    if (SignalMap.has(el)) return SignalMap.get(el)!;
    const s = new Signal(el, value);
    SignalMap.set(el, s);

    return s;
}

function getValue<T>(v:T) {
    // for now this is just kept at get/set
    // in the future this could be expanded to
    // look more like @vue/reactivity
    return new Proxy(typeof v === 'function' ? v() : v, {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            return Reflect.set(target, key, value);
        }
    });
}

export class Signal<T> {
    #value:any;
    constructor(private el: HTMLElement, private initialValue: T) {
        this.#value = getValue(initialValue);
    }

    notify(type:'read'|'update', oldValue: T, newValue?: T) {
        this.el.dispatchEvent(new CustomEvent(`signal::${type}`, {
            detail: {
                oldValue,
                newValue
            }
        }))
    }

    get value():T {
        const v = this.#value;
        this.notify('read', v);
        return this.#value;
    }

    set value(v: T) {
        const old = this.#value;
        this.#value = getValue(v);
        this.notify('update', old, this.#value);
    }
}