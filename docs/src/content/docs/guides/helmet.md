---
title: Helmet
description: A way to update the <head> element
---

## What is it?

`<wcf-helmet>` is a custom element that works similarly to ReactHelmet.

Take the following HTML:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>This should get replaced</title>
        <meta name="description" content="This could be outdated">
    </head>
    <body>
        <wcf-head>
            <!-- These get updated with their new content -->
            <title>This is the new title</title>
            <meta name="description" content="This is the most up to date description">
        </wcf-head>
        <!-- ... -->
        <wcf-head>
            <link rel="stylesheet" href="..." />
        </wcf-head>
        <!-- These attributes are passed on to the respective elements -->
        <wcf-head html-class="page-class" body-class="content-class"></wcf-head>
    </body>
</html>
```