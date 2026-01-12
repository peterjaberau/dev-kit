# HTML Style Converter

### `inlineToClass(html)`

The `inlineToClass` function takes an HTML string as input and modifies it to remove all inline styles. The inline styles are extracted and placed in a `<style>` tag at the bottom of the page. The corresponding classes are added to the affected elements.

```typescript
import { inlineToClass } from './utils';

const htmlString = `
  <html>
    <head>
      <title>Example HTML</title>
    </head>
    <body>
      <div style="color: red;">Hello, world!</div>
    </body>
  </html>
`;

const convertedHTML = inlineToClass(htmlString);
console.log(convertedHTML);
```

### `classToInline(html)`

The `classToInline` function takes an HTML string as input and modifies it to remove all CSS classes. The classes are converted back to inline styles, applying the original styling to the respective elements.

```typescript
import { classToInline } from './utils';

const htmlString = `
  <html>
    <head>
      <title>Example HTML</title>
    </head>
    <body>
      <div class="class-123" style="font-weight: bold;">Hello, world!</div>
    </body>
  </html>
`;

const convertedHTML = classToInline(htmlString);
console.log(convertedHTML);
```
