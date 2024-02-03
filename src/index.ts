import { Plugin } from "unified";
import { Element, Root } from "hast";

export type RehypeScrollToLink = {
  ariaLabel: string;
  classes: string;
  disabled: boolean;
  id: string;
  text: string;
};

export type RehypeScrollToTopOptions = {
  topLink: Partial<RehypeScrollToLink>;
  bottomLink: Partial<RehypeScrollToLink>;
};

export type RehypeScrollToTopOptionsRequired = {
  topLink: RehypeScrollToLink;
  bottomLink: RehypeScrollToLink;
};

const defaultOptions: RehypeScrollToTopOptionsRequired = {
  topLink: {
    ariaLabel: "Scroll to bottom",
    classes: "",
    disabled: false,
    id: "top",
    text: "Scroll to bottom",
  },
  bottomLink: {
    ariaLabel: "Scroll to top",
    classes: "",
    disabled: false,
    id: "bottom",
    text: "Scroll to top",
  },
};

function mergeOptions(userOptions: Partial<RehypeScrollToTopOptions> = {}): RehypeScrollToTopOptionsRequired {
  return {
    bottomLink: {
      ariaLabel: userOptions.bottomLink?.ariaLabel ?? defaultOptions.bottomLink.ariaLabel,
      classes: userOptions.bottomLink?.classes ?? defaultOptions.bottomLink.classes,
      disabled: userOptions.bottomLink?.disabled ?? defaultOptions.bottomLink.disabled,
      id: userOptions.bottomLink?.id ?? defaultOptions.bottomLink.id,
      text: userOptions.bottomLink?.text ?? defaultOptions.bottomLink.text,
    },
    topLink: {
      ariaLabel: userOptions.topLink?.ariaLabel ?? defaultOptions.topLink.ariaLabel,
      classes: userOptions.topLink?.classes ?? defaultOptions.topLink.classes,
      disabled: userOptions.topLink?.disabled ?? defaultOptions.topLink.disabled,
      id: userOptions.topLink?.id ?? defaultOptions.topLink.id,
      text: userOptions.topLink?.text ?? defaultOptions.topLink.text,
    },
  };
}

const baseClass = "scroll-to";
const bottomClass = "scroll-to--bottom";
const topClass = "scroll-to--top";

const createLinkElement = (props: RehypeScrollToLink & { destinationId: string }): Element => {
  const { ariaLabel, classes, disabled, id, text, destinationId } = props;
  return {
    type: "element",
    tagName: "a",
    properties: {
      "aria-label": ariaLabel,
      href: `#${destinationId}`,
      id,
      className: [classes],
    },
    children: [{ type: "text", value: text }],
  };
};

const rehypeScrollToTop: Plugin<[Partial<RehypeScrollToTopOptions>], Root> = (options = {}) => {
  const opts = mergeOptions(options);

  return (tree) => {
    const newChildren = [];
    const { topLink, bottomLink } = opts;
    if (!topLink.disabled) {
      const { ariaLabel, id, text, classes, disabled } = topLink;
      const topLinkElement = createLinkElement({
        ariaLabel,
        classes: `${classes} ${baseClass} ${topClass}`,
        destinationId: bottomLink.id,
        disabled,
        id,
        text,
      });
      newChildren.push(topLinkElement);
    }

    // Append original children
    newChildren.push(...tree.children);

    if (!bottomLink.disabled) {
      const { ariaLabel, id, text, classes, disabled } = bottomLink;
      const bottomLinkElement = createLinkElement({
        ariaLabel,
        classes: `${classes} ${baseClass} ${bottomClass}`,
        destinationId: topLink.id,
        disabled,
        id,
        text,
      });
      newChildren.push(bottomLinkElement);
    }

    tree.children = newChildren;
    return tree;
  };
};

export default rehypeScrollToTop;
