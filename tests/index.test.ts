import type { Element } from "hast";
import { toHtml } from "hast-util-to-html";
import { rehype } from "rehype";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import { readSync } from "to-vfile";
import { expect, test } from "vitest";

import { rehypeScrollToTop } from "../src/index.js";
import type { RehypeScrollToTopOptions } from "../src/index.js";

const planeProcessor = rehype().data("settings", { fragment: true }).use(rehypeMinifyWhitespace);

const run = (name: string, options: boolean | Partial<RehypeScrollToTopOptions> = true) => {
  const processor = rehype()
    .data("settings", { fragment: true })
    .use(rehypeScrollToTop, options)
    .use(rehypeMinifyWhitespace);

  const inputNode = processor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/input.html`)));
  const input = toHtml(inputNode as unknown as Element);

  const outputNode = planeProcessor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/output.html`)));
  const output = toHtml(outputNode as unknown as Element);

  test(name, () => {
    expect(input).toBe(output);
  });
};

run("basic");
run("disableBottomLink", { bottomLink: { disabled: true } });
run("disableTopLink", { topLink: { disabled: true } });
run("customIDs", { topLink: { id: "custom-top" }, bottomLink: { id: "custom-bottom" } });
run("additionalClasses", { topLink: { classes: "foo" }, bottomLink: { classes: "bar" } });
run("customText", { topLink: { text: "Custom top text" }, bottomLink: { text: "Custom bottom text" } });
run("customAriaLabels", {
  topLink: { ariaLabel: "Custom aria top" },
  bottomLink: { ariaLabel: "Custom aria bottom" },
});
