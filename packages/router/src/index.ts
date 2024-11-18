import { WCFBase } from "@wcf/base";

const p = new DOMParser();
export class WCFRouter extends WCFBase {

    async go(url:string) {
        // handle swapping innerHTML from other page
        const result = await fetch(url);
        const html = await result.text();

        const dom = p.parseFromString(html, 'text/html');

        const router = dom.querySelector(WCFRouter.name);
        if (!router) throw new Error('Could not find a matching WCFRouter instance on the page.');

        this.innerHTML = '';
        this.insertAdjacentHTML('beforeend', router?.innerHTML);
    }

    connectedCallback() {
        // handle preload
        // add click handler
        this.addEventListener('click', (e) => {
            const { target } = e;
            const closestLink = (target as HTMLElement).closest('a');

            if (!closestLink) return;

            if (closestLink.origin === location.origin && !closestLink.target) {
                e.preventDefault();
                history.pushState(null, '', closestLink+'');
                this.go(closestLink.pathname + closestLink.search);
            }
        })
    }
}