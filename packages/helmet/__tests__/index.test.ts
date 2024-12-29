// @vitest-environment jsdom
import { it, describe, expect } from 'vitest';
import { CHelmet } from '../src';

CHelmet.define();
console.log(window.HTMLElement);
describe('@bycosmo/helmet', () => {
    it('should reject invalid tags', () => {
        document.body.insertAdjacentHTML('beforeend', '<c-helmet><title>Testing</title></c-helmet>');
        expect(document.querySelector('title')!.textContent).toBe('Testing');
        document.body.insertAdjacentHTML('beforeend', `<c-helmet><p></p></c-helmet>`)
    })

    it('should update title', () => {
        const currentTitle = document.querySelector('title');
        document.body.insertAdjacentHTML('beforeend', '<c-helmet><title>Testing 2</title></c-helmet>');
        expect(currentTitle).not.toBe(document.querySelector('title'));
    })
})
