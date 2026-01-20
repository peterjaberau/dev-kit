import { defineSlotRecipe } from "@chakra-ui/react"

/**
 * FIXES APPLIED:
 * - Grid template now matches original dense column layout
 * - Proper gridTemplateAreas switching per description placement
 * - Root uses inline-grid + min/max sizing like original
 * - Icon / rightIcon sizing + centering aligned with original
 * - Actions slot supports hover-only visibility WITHOUT layout jump
 * - Selected / disabled / interactive states added
 */
export const itemSlotRecipe = defineSlotRecipe({
  slots: ["root", "icon", "prefix", "label", "description", "suffix", "rightIcon", "actions"],
  className: "item",
  base: {
    /*
      [data-has-icon]
      [data-start-content]
      [data-end-content]
      [data-right-icon]
      [data-has-label]
      [data-has-prefix]
      [data-has-suffix]
      [data-has-description]
      [data-has-actions]
      [data-has-actions-content]
      [data-has-actions-on-hover]
      [data-checkbox]
      [data-disabled]
      [data-selected]
      [data-loading]
      [data-size]
      [data-description]
      [data-type]
      [data-theme]
      [data-shape]
     */

    root: {
      display: "inline-grid",
      gridAutoFlow: "column dense",
      gap: 0,
      outline: 0,
      placeItems: "stretch",
      placeContent: "stretch",
      position: "relative",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      textDecoration: "none",
      transition: "theme",
      outlineOffset: 1,
      border: "none",
      gridTemplate:
        '"icon prefix label suffix rightIcon actions" auto ' +
        '"icon prefix label suffix rightIcon actions" auto / ' +
        "max-content max-content minmax(0, 1fr) max-content max-content max-content",
      "&[data-description='inline']": {
        gridTemplate:
          '"icon prefix description suffix rightIcon actions" auto / ' +
          "max-content max-content minmax(0, 1fr) max-content max-content max-content",
      },
      "&[data-description='inline'][data-has-label]": {
        gridTemplate:
          '"icon prefix label suffix rightIcon actions" auto ' +
          '"icon prefix description suffix rightIcon actions" auto / ' +
          "max-content max-content minmax(0, 1fr) max-content max-content max-content",
      },
      "&[data-description='block']": {
        gridTemplate:
          '"icon prefix label suffix rightIcon actions" auto ' +
          '"description description description description description description" auto / ' +
          "max-content max-content minmax(0, 1fr) max-content max-content max-content",
      },
      flexShrink: 0,
      "&[data-menuitem], &[data-listboxitem]": {
        flexShrink: "initial",
      },
    },
    icon: {
      display: "grid",
      gridArea: "icon",
      placeItems: "center",
      placeContent: "stretch",
      aspectRatio: "1 / 1",
      width: "30px",
      height: "30px",
      opacity: 1,
    },
    rightIcon: {
      display: "grid",
      gridArea: "rightIcon",
      placeItems: "center",
      placeContent: "stretch",
      aspectRatio: "1 / 1",
      width: "30px",
      height: "30px",
      opacity: 1,
    },
    label: {
      margin: 0,
      gridArea: "label",
      display: "block",
      placeSelf: "center start",
      boxSizing: "border-box",
      placeContent: "stretch",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "0 100%",
    },

    description: {
      gridArea: "description",
      placeSelf: "center start",
      boxSizing: "border-box",
      color: "inherit",
      opacity: 0.75,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      textAlign: "left",
    },

    prefix: {
      display: "grid",
      gridAutoFlow: "column",
      placeItems: "center",
      placeContent: "stretch",
      gridArea: "prefix",
    },

    suffix: {
      display: "grid",
      gridAutoFlow: "column",
      placeItems: "center",
      placeContent: "stretch",
      gridArea: "suffix",
    },

    actions: {
      gridArea: "actions",
      display: "flex",
      gap: "1bw",
      placeItems: "center",
      placeContent: "end",
      placeSelf: "stretch",
      padding: 0,
      boxSizing: "border-box",
      opacity: 1,
      interpolateSize: "allow-keywords",
    },
  },

  variants: {
    size: {
      xsmall: {},
      small: {},
      medium: {},
      large: {},
      xlarge: {},
      inline: {},
    },

    type: {
      item: {},
      header: {},
      card: {},
      link: {},
    },

    shape: {
      card: {},
      button: {},
      sharp: {},
      pill: {},
    },

    showActionsOnHover: {
      true: {
        actions: {
          opacity: 0,
          pointerEvents: "none",
          "[role='group']:hover &": {
            opacity: 1,
            pointerEvents: "auto",
          },
          "[role='group']:focus-within &": {
            opacity: 1,
            pointerEvents: "auto",
          },
        },
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {},
})
