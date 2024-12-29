// @vitest-environment jsdom
import { CBase } from "../src";
import { it, describe, expect } from 'vitest';

describe('@bycosmo/base', () => {
    it('should generate a valid element name', () => {
        class CNameCheck extends CBase {};
        expect(CNameCheck.getName()).toBe('c-name-check');
    });

    it('should define custom elements', () => {
        class CShouldDefine extends CBase {};

        CShouldDefine.define();
        const gottenEl = customElements.get(CShouldDefine.getName());
        expect(gottenEl).toBe(CShouldDefine);
    })
})