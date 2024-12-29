import { WCFBase } from "@wcf/base";
import { signal } from './signal';
import type { Signal } from './signal';

type defaultDataType = Record<string|number, any>;

export class WCFState<D extends defaultDataType> extends WCFBase {
    #data: D;
    #signal: Signal<defaultDataType>;

    parseData(value:string): D {
        if (value.search(/(\[|{)/g) > -1) {
            return (new Function(`return ${value}`))() as D
        } else {
            let output:string|number = value;
            const n = parseFloat(value);
            if (n === n) output = n;
            // @ts-ignore
            return { value: output };
        }
    }

    constructor() {
        super()
        const d = this.getAttribute('$data') || '{}';
        this.removeAttribute('$data');
        this.#data = this.parseData(d);
        this.#signal = signal(this, this.#data);
    }

    set(v: any, preserve?: boolean) {
        let value = v;
        const sv = this.#signal.value;
        if (Array.isArray(value) && Array.isArray(sv)) {
            this.#signal.value = preserve ? ([]).concat(sv as [], value as []) : value;
        } else if (typeof value === 'object') {
            this.#signal.value = preserve ? {...sv, ...value} : value!;
        }
    }

    peek() {
        return this.#signal.value;
    }
}