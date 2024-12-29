---
title: Base Element
description: A custom element to power Cosmo
---

## What is it?

`<c-base>` is an element with some small utility static functions for making custom elements nicer.

### What is in it?

- `CBase.getName()`: Returns the name of the class properly formatted for a custom element definition. E.g. `CBase => c-base`, `MyElement => my-element`
- `CBase.define()`: Defines the element using the result of `CBase.getName()`

```js
// @TODO: This import could change, don't feel attached to it
import { CBase } from '@bycosmo/base'

class MyElement extends CBase {
    constructor() { super() }
    connectedCallback() { console.log("I'm connected!") }
}

MyElement.define() // The element `my-element` is now defined.
```