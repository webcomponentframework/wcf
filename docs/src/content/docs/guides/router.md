---
title: Router
description: A barebones router
---

## What is it?

`<wcf-router>` is a barebones router designed to swap content between pages. It does this by first looking through the contents and warming the existing links. When a link is clicked, it fetches the HTML from that destination and finds the `<wcf-router>` element inside. Finally it swaps it's current content for the content of the found `<wcf-router>`.

Using a method similar to `instant.page`, `<wcf-router>` also handles prefetching on the `pointerover` event. See `WCFRouter.prefetch`, which is based on `preloadUsingLinkElement` from `instant.page`.

### How to use it?

Take these two pages as example:

```html
<!DOCTYPE html>
<html>
    <body>
        <nav>Your Site</nav>
        <main>
            <wcf-router>
                <header>This is Page One</header>
                ...
                <a href="/page-two">Page Two</a>
            </wcf-router>
        </main>
        <footer>...</footer>
    </body>
</html>
```

```html
<!DOCTYPE html>
<html>
    <body>
        <nav>Your Site</nav>
        <main>
            <wcf-router no-prefetch>
                <header>This is Page Two</header>
                <a href="/">Back</a>
            </wcf-router>
        </main>
    </body>
</html>
```

Upon arriving on the first example, `<wcf-router>` will search it's children for links and add a `pointerover` event listener to prefetch them. When you click on the link, this prefetch will run, adding a `<link rel="prefetch">` to the head. The URL is stashed inside the `WCFRouter.urls` to prevent duplicating. 

When the click is completed, the router will prevent the loading of the next page and request it instead with a `fetch`. 

The result of this `fetch` is then parsed, the `<wcf-router>` is retrieved, any attributes are inherited, and the html is swapped in.

Since the `<wcf-router>` on page two has the attribute `no-prefetch`, it will not attach any prefetch listeners to the links in the new html. When returning to the first page, since there is no `no-prefetch` attribute, the `no-prefetch` attribute will be removed.