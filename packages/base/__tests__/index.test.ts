// @vitest-environment jsdom
import { WCFBase } from "../src";
import { it, describe, expect } from 'vitest';

describe('@wcf/base', () => {
    it('should generate a valid element name', () => {
        class WCFNameCheck extends WCFBase {};
        expect(WCFNameCheck.getName()).toBe('wcf-name-check');
    });

    it('should define custom elements', () => {
        class WCFShouldDefine extends WCFBase {};

        WCFShouldDefine.define();
        const gottenEl = customElements.get(WCFShouldDefine.getName());
        expect(gottenEl).toBe(WCFShouldDefine);
    })
})