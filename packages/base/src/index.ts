export class WCFBase extends HTMLElement {
    constructor() { super() }
    static getName() {
        return this.name.replace(/WCF/,'wcf').replace(/(.)([A-Z])/g, '$1-$2').toLowerCase();
    }
    static define() {
        customElements.define(this.getName(), this);
    }
}