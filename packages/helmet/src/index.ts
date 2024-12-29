import { CBase } from '@bycosmo/base';

type ValidTags = HTMLTitleElement|HTMLBaseElement|HTMLLinkElement|HTMLScriptElement|HTMLMetaElement|HTMLStyleElement
type PotentiallyValidTags = HTMLElement|ValidTags


export class CHelmet extends CBase {
	static els = new WeakSet<ValidTags>();
	
    constructor() {
        super();
	}
	
	connectedCallback() {
        for (const child of this.children) {
            this.parseChild(child as PotentiallyValidTags);
        }
        
        const { documentElement: html, body } = document;

		Object.values(this.attributes).forEach(({ name, value }) => {
            const [,attrName] = name.split('-');

            if (name.indexOf('body-') === 0) {
                if (name.indexOf('class') > -1) {
                    body.classList.add(value);
                } else {
                    body.setAttribute(attrName, value);
                }
            }
            if (name.indexOf('html-') === 0) {
                if (name.indexOf('class') > -1) {
                    html.classList.add(value);
                } else {
                    html.setAttribute(attrName, value);
                }
            }
        });
	}
	
	track(el: ValidTags) {
		el.dataset.fromHelmet = 'true';
		CHelmet.els.add(el);
	}
	
	replaceIfExists(el:ValidTags, search: string) {
		const existingEl = document.head.querySelector(search);
		if (!existingEl) document.head.append(el);
		else {
			document.head.replaceChild(el, existingEl);
		}
	}

    isValidTag(el:PotentiallyValidTags): el is ValidTags {
        return ['title','meta','style','script','noscript','link','base'].includes(el.localName);
    }

	handleInvalidTag(el:PotentiallyValidTags) {
		el.remove();
	}
	
	parseChild(el: PotentiallyValidTags) {
        if (!this.isValidTag(el)) {
			this.handleInvalidTag(el);
			return;
		}

		this.track(el);
		switch (el.localName) {
			case 'title':
			case 'meta': 
			case 'base':
				this.replaceIfExists(el, el.localName === 'meta' ? `[name="${el.getAttribute('name')}"]` : el.localName);
				break;
			case 'noscript':
			case 'link':
			case 'style':
				/** Organize it better */
				document.head.append(el);
				break;
			case 'script':
				/** Pretty sure script tags should just be left alone */
				/** Argument could be made that script tags which hold JSON should be moved to head, but I won't make it */
				break;
		}
	}
}