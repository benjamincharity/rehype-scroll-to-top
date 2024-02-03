import { expect, test } from "vitest";
import { readSync } from "to-vfile";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeScrollToTop, { type RehypeScrollToTopOptions } from "../src";
import { toHtml } from "hast-util-to-html";
import { rehype } from "rehype";

const planeProcessor = rehype().data("settings", { fragment: true }).use(rehypeMinifyWhitespace);

const run = (name: string, options: boolean | Partial<RehypeScrollToTopOptions> = true) => {
  const processor = rehype()
    .data("settings", { fragment: true })
    .use(rehypeScrollToTop, options)
    .use(rehypeMinifyWhitespace);

  const input = toHtml(processor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/input.html`))) as any);

  const output = toHtml(
    planeProcessor.runSync(planeProcessor.parse(readSync(`./tests/fixtures/${name}/output.html`))) as any
  );

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
