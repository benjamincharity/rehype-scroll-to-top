import { type Element, type Root } from "hast";
import { type Plugin } from "unified";

export type RehypeScrollToLink = {
  ariaLabel: string;
  classes: string;
  disabled: boolean;
  id: string;
  text: string;
};

export type RehypeScrollToTopOptions = {
  topLink?: Partial<RehypeScrollToLink>;
  bottomLink?: Partial<RehypeScrollToLink>;
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

const baseClass = "scroll-to";
const bottomClass = "scroll-to--bottom";
const topClass = "scroll-to--top";

export const rehypeScrollToTop: Plugin<[RehypeScrollToTopOptions?], Root> = (options = {}) => {
  const options_ = mergeOptions(options);

  return (tree) => {
    const newChildren = [];
    const { topLink, bottomLink } = options_;
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

function mergeOptions(userOptions: Partial<RehypeScrollToTopOptions> = {}): RehypeScrollToTopOptionsRequired {
  return {
    bottomLink: {
      ...defaultOptions.bottomLink,
      ...userOptions.bottomLink,
    },
    topLink: {
      ...defaultOptions.topLink,
      ...userOptions.topLink,
    },
  };
}

function createLinkElement(props: RehypeScrollToLink & { destinationId: string }): Element {
  const { ariaLabel, classes, disabled, id, text, destinationId } = props;
  const linkElement: Element = {
    type: "element",
    tagName: "a",
    properties: {
      "aria-label": ariaLabel,
      "href": `#${destinationId}`,
      id,
      "className": [classes],
    },
    children: [{ type: "text", value: text }],
  };

  return {
    type: "element",
    tagName: "div",
    properties: {
      className: ["scroll-to-wrapper"],
    },
    children: [linkElement],
  };
}
