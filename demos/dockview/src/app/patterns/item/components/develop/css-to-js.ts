const converted = {
  ".t8.t8": {
    border: "var(--border-width) solid var(--clear-color)",
    outline: "0 solid var(--outline-color)",
    outlineOffset: "1px",
  },
  ".t8.t8:not([data-disabled]):not([data-hovered]):not([data-pressed])": {
    color: "var(--dark-02-color)",
    "--current-color": "var(--dark-02-color)",
    "--current-color-rgb": "var(--dark-02-color-rgb)",
  },
  ".t8.t8:not([data-disabled]):not([data-hovered]):not([data-pressed]):not([data-selected]):not([data-focused])": {
    backgroundColor: "rgb(var(--dark-color-rgb) / 0)",
  },
  '.t8.t8[data-shape="button"]': { borderRadius: "6px" },
  '.t9.t9:not([data-size="inline"]):not([data-size="xlarge"]):not([data-size="xsmall"])[data-type="item"]:not(\n    [data-type="card"]\n  ):not([data-type="header"])':
    {
      "--font-size": "var(--t3-font-size, var(--default-font-size, inherit))",
      fontSize: "var(--t3-font-size, var(--default-font-size, inherit))",
      "--line-height": "var(--t3-line-height, var(--default-line-height, inherit))",
      lineHeight: "var(--t3-line-height, var(--default-line-height, inherit))",
      "--letter-spacing": "var(--t3-letter-spacing, var(--default-letter-spacing, inherit))",
      letterSpacing: "var(--t3-letter-spacing, var(--default-letter-spacing, inherit))",
      "--font-weight": "var(--t3-font-weight, var(--default-font-weight, inherit))",
      fontWeight: "var(--t3-font-weight, var(--default-font-weight, inherit))",
      "--font-style": "var(--t3-font-style, var(--default-font-style, inherit))",
      fontStyle: "var(--t3-font-style, var(--default-font-style, inherit))",
      "--text-transform": "var(--t3-text-transform, var(--default-text-transform, inherit))",
      textTransform: "var(--t3-text-transform, var(--default-text-transform, inherit))",
      "--font-family":
        "var(--t3-font-family, var(--default-font-family, var(--font, NonexistentFontName))), var(--font, sans-serif)",
      fontFamily:
        "var(--t3-font-family, var(--default-font-family, var(--font, NonexistentFontName))), var(--font, sans-serif)",
      "--bold-font-weight": "var(--t3-bold-font-weight, var(--default-bold-font-weight, inherit))",
      "--icon-size": "var(--t3-icon-size, var(--default-icon-size, inherit))",
    },
  ".t9.t9": { textDecoration: "none" },
  ".t10.t10:not([data-menuitem]):not([data-listboxitem])": {
    flexShrink: "initial",
  },
  '.t10.t10:not([data-size="inline"])': {
    height: "auto",
    minHeight: "var(--size)",
    maxHeight: "initial",
  },
  ".t10.t10": { margin: "0px" },
  '.t10.t10:not([data-type="card"])': { padding: "0px" },
  '.t10.t10:not([data-size="inline"]):not([data-has-icon]),\n.t10.t10:not([data-size="inline"]):not([data-has-right-icon])':
    {
      width: "auto",
      minWidth: "var(--size)",
      maxWidth: "initial",
    },
  ".t11.t11": {
    display: "inline-grid",
    gap: "0px",
    gridAutoFlow: "column dense",
    placeContent: "stretch",
    placeItems: "stretch",
  },
  '.t11.t11:not([data-description="block"]):not([data-description="inline"])': {
    gridTemplate:
      '"icon prefix label suffix righticon actions" "icon prefix label suffix righticon actions" / max-content max-content minmax(\n      0px,\n      1fr\n    ) max-content max-content max-content',
  },
  ".t12.t12": {
    position: "relative",
    transition:
      "color var(--theme-transition, var(--transition)),\n    background-color var(--theme-transition, var(--transition)),\n    box-shadow var(--theme-transition, var(--transition)),\n    border var(--theme-transition, var(--transition)),\n    border-radius var(--theme-transition, var(--transition)),\n    outline var(--theme-transition, var(--transition)),\n    opacity var(--theme-transition, var(--transition))",
  },
  '.t13.t13:not([data-size="inline"]):not([data-size="small"]):not([data-size="xsmall"])': {
    "--block-padding": "4px",
  },
  '.t13.t13:not([data-description="block"]):not([data-description="inline"])': {
    "--description-padding-bottom": "0",
  },
  '.t13.t13:not([data-description="block"]):not([data-has-start-content])': {
    "--description-padding-left": "var(--inline-padding)",
  },
  '.t13.t13:not([data-description="block"]):not([data-has-end-content])': {
    "--description-padding-right": "var(--inline-padding)",
  },
  ".t13.t13": {
    "--inline-compensation": "4px",
    "--inline-padding":
      "max(\n    var(--min-inline-padding),\n    calc(calc(var(--size) - var(--line-height) - 2px) / 2 + var(--inline-compensation))\n  )",
    "--min-inline-padding": "calc(8px - 1px)",
    boxSizing: "border-box",
    appearance: "none",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    textDecoration: "none",
  },
  '.t13.t13:not([data-description="inline"])': {
    "--label-padding-bottom": "var(--block-padding)",
  },
  ".t13.t13:not([data-has-start-content])": {
    "--label-padding-left": "var(--inline-padding)",
  },
  ".t13.t13:not([data-has-end-content])": {
    "--label-padding-right": "var(--inline-padding)",
  },
  '.t13.t13[data-size="medium"]': { "--size": "var(--size-md)" },
  ".t13.t13:not([data-disabled]):not([data-listboxitem]):not([data-menuitem]):not(:is(a)):not(:is(button))": {
    cursor: "inherit",
  },
  '.t14.t14 > [data-element="Label"]': {
    margin: "0px",
    gridArea: "label",
    display: "block",
    placeSelf: "center start",
    boxSizing: "border-box",
    placeContent: "stretch",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "auto",
    minWidth: "0px",
    maxWidth: "100%",
    "--font-size": "inherit",
    fontSize: "inherit",
    "--line-height": "inherit",
    lineHeight: "inherit",
    "--letter-spacing": "inherit",
    letterSpacing: "inherit",
    "--font-weight": "inherit",
    fontWeight: "inherit",
    "--font-style": "inherit",
    fontStyle: "inherit",
    "--text-transform": "inherit",
    textTransform: "inherit",
    "--font-family": "inherit",
    fontFamily: "inherit",
    "--bold-font-weight": "inherit",
    "--icon-size": "inherit",
    padding: "var(--block-padding) var(--label-padding-right) var(--label-padding-bottom) var(--label-padding-left)",
  },
}
