---
title: Base Element
description: A custom element to power WCF
---

## What is it?

`<wcf-base>` is an element with some small utility static functions for making custom elements nicer.

### What is in it?

- `WCFBase.getName()`: Returns the name of the class properly formatted for a custom element definition. E.g. `WCFBase => wcf-base`, `MyElement => my-element`
- `WCFBase.define()`: Defines the element using the result of `WCFBase.getName()`

```js
// @TODO: This import could change, don't feel attached to it
import { WCFBase } from '@wcf/base'

class MyElement extends WCFBase {
    constructor() { super() }
    connectedCallback() { console.log("I'm connected!") }
}

MyElement.define() // The element `my-element` is now defined.
```