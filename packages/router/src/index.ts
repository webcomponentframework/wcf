import { CBase } from "@bycosmo/base";

const p = new DOMParser();
export class CRouter extends CBase {
    signals: WeakMap<HTMLAnchorElement, AbortController>;
    urls: Set<string>;

    set shouldPrefetch(v) {
        this.toggleAttribute('no-prefetch', v);
    }
    get shouldPrefetch() {
        return !this.hasAttribute('no-prefetch');
    }

    constructor() {
        super();
        /**
         * Signals maintains a relation of AbortControllers to elements
         * 
         * Ideally if an element is about to be removed from the dom, it would clean up and
         * abort the attached event listener, but that isn't *exactly* possible right now.
         * this means it needs to be done manually.
         */
        this.signals = new WeakMap();
        /**
         * We don't want to prefetch the same url
         * so they are stored here
         */
        this.urls = new Set();
        this.shouldPrefetch = !this.hasAttribute('no-prefetch');
    }

    async go(url:string) {
        // handle swapping innerHTML from other page
        const result = await fetch(url);
        const html = await result.text();

        const dom = p.parseFromString(html, 'text/html');

        const router = dom.querySelector(CRouter.name);
        if (!router) throw new Error('Could not find a matching CRouter instance on the page.');

        /**
         * Cleans up event listeners befor wiping out innerHTML
         */
        this.querySelectorAll('a').forEach(el => this.signals.get(el)!.abort());
        /** Update shouldPrefetch if the fetched router has no-prefetch */
        this.shouldPrefetch = !router.hasAttribute('no-prefetch');

        this.innerHTML = '';
        this.insertAdjacentHTML('beforeend', router?.innerHTML);
    }

    /**
     * Eventually fetchPriority will be configurable on the links themselves
     * 
     * based on preloadUsingLinkElement from instant.page https://github.com/instantpage/instant.page/blob/d3c57412c40e3a662d2eeabfd13befa7d733eb31/instantpage.js#L417
     */
    prefetch(href:string, fetchPriority = 'auto') {
        this.urls.add(href);
        const l = document.createElement('link');
        l.rel = 'prefetch';
        l.href = href;
        l.fetchPriority = fetchPriority;
        l.as = 'document';
        document.head.appendChild(l);
    }

    cookLinks() {
        if (!this.shouldPrefetch) return;

        this.querySelectorAll('a').forEach(el => {
            // Don't try to cook already fetched links
            if (this.urls.has(el.href)) return;

            // use abort controller to remove event listeners
            // after link has been prefetched
            const controller = this.signals.set(el, new AbortController()).get(el);
            el.addEventListener('pointerover', () => {
                this.prefetch(el.href);
                controller!.abort();
            }, { signal: controller!.signal })
        })
    }

    connectedCallback() {
        this.cookLinks();
        // handle preload
        // add click handler
        this.addEventListener('click', async (e) => {
            const { target } = e;
            const closestLink = (target as HTMLElement).closest('a');

            if (!closestLink) return;

            if (closestLink.origin === location.origin && !closestLink.target) {
                e.preventDefault();
                history.pushState(null, '', closestLink+'');
                await this.go(closestLink.pathname + closestLink.search);
                this.cookLinks();
            }
        });
    }
}