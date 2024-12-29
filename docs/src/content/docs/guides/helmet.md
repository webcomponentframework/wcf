---
title: Helmet
description: A way to update the <head> element
---

## What is it?

`<c-helmet>` is a custom element that works similarly to ReactHelmet.

Take the following HTML:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>This should get replaced</title>
        <meta name="description" content="This could be outdated">
    </head>
    <body>
        <c-head>
            <!-- These get updated with their new content -->
            <title>This is the new title</title>
            <meta name="description" content="This is the most up to date description">
        </c-head>
        <!-- ... -->
        <c-head>
            <link rel="stylesheet" href="..." />
        </c-head>
        <!-- These attributes are passed on to the respective elements -->
        <c-head html-class="page-class" body-class="content-class"></c-head>
    </body>
</html>
```