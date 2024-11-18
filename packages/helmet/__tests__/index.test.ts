// @vitest-environment jsdom
import { it, describe, expect } from 'vitest';
import { WCFHelmet } from '../src';

WCFHelmet.define();
console.log(window.HTMLElement);
describe('@wcf/helmet', () => {
    it('should reject invalid tags', () => {
        document.body.insertAdjacentHTML('beforeend', '<wcf-helmet><title>Testing</title></wcf-helmet>');
        expect(document.querySelector('title')!.textContent).toBe('Testing');
        document.body.insertAdjacentHTML('beforeend', `<wcf-helmet><p></p></wcf-helmet>`)
    })

    it('should update title', () => {
        const currentTitle = document.querySelector('title');
        document.body.insertAdjacentHTML('beforeend', '<wcf-helmet><title>Testing 2</title></wcf-helmet>');
        expect(currentTitle).not.toBe(document.querySelector('title'));
    })
})
