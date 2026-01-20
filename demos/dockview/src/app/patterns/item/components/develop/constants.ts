const args = {
  children: {
    control: { type: "text" },
    description: "The content inside the Item",
  },
  icon: {
    control: { type: null },
    description:
      'Icon rendered before the content. Can be: ReactNode, `"checkbox"`, `true` (empty slot), or function `({ selected, loading, ...mods }) => ReactNode | true`',
  },
  rightIcon: {
    control: { type: null },
    description:
      "Icon rendered after the content. Can be: ReactNode, `true` (empty slot), or function `({ selected, loading, ...mods }) => ReactNode | true`",
  },
  prefix: {
    control: { type: null },
    description: "Element rendered before the content (after icon)",
  },
  suffix: {
    control: { type: null },
    description: "Element rendered after the content (before rightIcon)",
  },
  description: {
    control: { type: "text" },
    description: "Description text displayed with the item",
  },
  descriptionPlacement: {
    options: ["inline", "block"],
    control: { type: "radio" },
    description: "How the description is positioned relative to the main content",
    table: {
      defaultValue: { summary: "inline" },
    },
  },

  /* Presentation */
  size: {
    options: ["xsmall", "small", "medium", "large", "xlarge", "inline"],
    control: { type: "radio" },
    description: "Item size",
    table: {
      defaultValue: { summary: "medium" },
    },
  },
  shape: {
    options: ["card", "button", "sharp", "pill"],
    control: { type: "radio" },
    description: "Shape of the item border radius",
    table: {
      defaultValue: { summary: "button" },
    },
  },
  showActionsOnHover: {
    control: { type: "boolean" },
    description: "When true, actions are hidden by default and shown only on hover, focus, or focus-within",
    table: {
      defaultValue: { summary: false },
    },
  },
  preserveActionsSpace: {
    control: { type: "boolean" },
    description:
      "When true, preserves the actions width when hidden (only changes opacity). Only applies when showActionsOnHover is true.",
    table: {
      defaultValue: { summary: false },
    },
  },
  level: {
    options: [1, 2, 3, 4, 5, 6],
    control: { type: "select" },
    description:
      'Heading level for the Label element when type="header" or type="card". Changes the HTML tag to the corresponding heading (h1-h6).',
    table: {
      defaultValue: { summary: 3 },
    },
  },
}
