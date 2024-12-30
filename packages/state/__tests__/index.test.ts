// @vitest-environment jsdom
import { it, describe, expect } from 'vitest';
import { WCFState } from '../src';

WCFState.define();

describe('@wcf/helmet', () => {
    it('should register data from an object or array', () => {
        document.body.insertAdjacentHTML('beforeend', `<wcf-state $data="{testing: 1}"></wcf-state>`);
        const stateEl = document.querySelector('wcf-state')! as WCFState<{testing: 1}>;
        expect(stateEl.peek()).toStrictEqual({testing:1});
        
        document.body.insertAdjacentHTML('beforeend', `<wcf-state $data="[1,2,3]"></wcf-state>`);
        const newStateEl = document.querySelector('wcf-state:last-child')! as WCFState<[1,2,3]>;
        expect(newStateEl.peek()).toStrictEqual([1,2,3])
    });

    it('should convert non-object types to { value: x }', () => {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('beforeend', '<wcf-state $data="1"></wcf-state>');
        const stateEl = document.querySelector('wcf-state') as WCFState<{ value: 1 }>;
        expect(stateEl.peek()).toStrictEqual({ value: 1 });
    })

    it('should notify on changes', () => {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('beforeend', '<wcf-state $data="{a:1}"></wcf-state>');
        const stateEl = document.querySelector('wcf-state') as WCFState<Record<string, any>>;
        let read = 0;
        stateEl.addEventListener('signal::read', ({ detail }: CustomEventInit<{ oldValue: any }>) => {
            read += 1;
        });
        let update = 0;
        stateEl.addEventListener('signal::update', ({ detail }: CustomEventInit<{ oldValue: any, newValue: any }>) => {
            update += 1
        })
        stateEl.set({
            a: 2
        })
        // read will only be updated if set is passed true in the second param
        expect(read).toBe(1);
        expect(update).toBe(1);
        stateEl.set({
            b: 2,
        }, true);
        expect(read).toBe(2)
        expect(update).toBe(2);
        expect(stateEl.peek()).toStrictEqual({a:2, b:2});

        stateEl.set([1,2,3]);
        expect(stateEl.peek()).toStrictEqual([1,2,3]);
        stateEl.set([4],true);
        expect(stateEl.peek()).toStrictEqual([1,2,3,4]);
    })
});
