# rehype-scroll-to-top

![test workflow](https://github.com/benjamincharity/rehype-scroll-to-top/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/benjamincharity/rehype-scroll-to-top/branch/main/graph/badge.svg?token=T3Z18P56LV)](https://codecov.io/gh/benjamincharity/rehype-scroll-to-top)

## Motivation

I needed an easy way for users to jump to the top of the page or the bottom.

## Install

```
npm i -D @benjamincharity/rehype-scroll-to-top
```

## Sample

### Input

```html
<h1>Title</h1>
<p>Content</p>
```

### Output

```html
<a aria-label="Scroll to bottom" href="#bottom" id="top" class="scroll-to scroll-to--top">Scroll to bottom</a>
<h1>Title</h1>
<p>Content</p>
<a aria-label="Scroll to top" href="#top" id="bottom" class="scroll-to scroll-to--bottom">Scroll to top</a>
```

## Options

| Option                 | Type      | Description                         | Default              |
| ---------------------- | --------- | ----------------------------------- | -------------------- |
| `topLink.ariaLabel`    | `string`  | Aria label for the top link         | `"Scroll to bottom"` |
| `topLink.classes`      | `string`  | CSS classes for the top link        | `""`                 |
| `topLink.disabled`     | `boolean` | Whether the top link is disabled    | `false`              |
| `topLink.id`           | `string`  | ID for the top link                 | `"top"`              |
| `topLink.text`         | `string`  | Text for the top link               | `"Scroll to bottom"` |
| `bottomLink.ariaLabel` | `string`  | Aria label for the bottom link      | `"Scroll to top"`    |
| `bottomLink.classes`   | `string`  | CSS classes for the bottom link     | `""`                 |
| `bottomLink.disabled`  | `boolean` | Whether the bottom link is disabled | `false`              |
| `bottomLink.id`        | `string`  | ID for the bottom link              | `"bottom"`           |
| `bottomLink.text`      | `string`  | Text for the bottom link            | `"Scroll to top"`    |

These options can be passed to the `rehype-scroll-to-top` plugin as part of the `options` object. For example:

```typescript
rehypeScrollToTop({
  topLink: {
    ariaLabel: "Go to bottom",
    classes: "my-custom-class",
    disabled: false,
    id: "my-top-link",
    text: "Go to bottom",
  },
  bottomLink: {
    ariaLabel: "Go to top",
    classes: "my-other-custom-class",
    disabled: false,
    id: "my-bottom-link",
    text: "Go to top",
  },
});
```

This will customize the top and bottom links according to the provided options.

## License

[MIT][license] © [benjamincharity][author]

[license]: license
[author]: https://www.benjamincharity.com
