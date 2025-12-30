import {
  token,
  backgroundColorMap,
  borderColorMap,
  borderWidthMap,
  positiveSpaceMap,
  spacingProperties,
  allSpaceMap,
} from "#atlas-ui/primitives/css"
import { chakra } from "@chakra-ui/react"
import { type ComponentPropsWithoutRef, forwardRef, type ReactNode, type Ref, useCallback, useContext } from "react"

import { noop } from "#atlas-packages/ds-lib"
import InteractionContext, { type InteractionContextType } from "#atlas-ui/context/interaction-context"

// This duplicates FocusRing styles from `@atlaskit/focus-ring`.
const focusRingStyles = {
  "&:focus, &:focus-visible": {
    outlineColor: token("color.border.focused"),
    outlineOffset: token("space.025"),
    outlineStyle: "solid",
    outlineWidth: token("border.width.focused"),
  },
  "&:focus:not(:focus-visible)": {
    outline: "none",
  },
  "@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)": {
    "&:focus-visible": {
      // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
      outline: `${token("border.width")} solid`,
    },
  },
}

const baseStyles = {
  boxSizing: "border-box",
  appearance: "none",
  border: "none",
}
const enabledStyles = {
  cursor: "pointer",
}
const disabledStyles = {
  cursor: "not-allowed",
}

/**
 * __Pressable__
 *
 * A primitive for building custom buttons.
 *
 * - [Examples](https://atlassian.design/components/primitives/pressable/examples)
 * - [Code](https://atlassian.design/components/primitives/pressable/code)
 * - [Usage](https://atlassian.design/components/primitives/pressable/usage)
 */
export const Pressable = forwardRef(
  (
    {
      children,
      backgroundColor,
      padding,
      paddingBlock,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInline,
      paddingInlineStart,
      paddingInlineEnd,
      isDisabled,
      type = "button",
      onClick,
      interactionName,
      componentName,
      style,
      testId,
      css,
      ...htmlAttributes
    }: any,
    ref?: Ref<HTMLButtonElement>,
  ) => {
    const interactionContext = useContext<InteractionContextType | null>(InteractionContext)
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        interactionContext && interactionContext.tracePress(interactionName, e.timeStamp)
      },
      [interactionContext, interactionName],
    )

    const { className: _spreadClass, ...safeHtmlAttributes } = htmlAttributes

    return (
      <chakra.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        css={{
          // ...baseStyles,
          // ...focusRingStyles,
          // ...(isDisabled ? disabledStyles : enabledStyles),
          // backgroundColor: backgroundColorMap[backgroundColor],
          // ...(padding && spacingProperties[padding]),
          // ...(paddingBlock && spacingProperties[paddingBlock]),
          // ...(paddingBlockStart && spacingProperties[paddingBlockStart]),
          // ...(paddingBlockEnd && spacingProperties[paddingBlockEnd]),
          // ...(paddingInline && spacingProperties[paddingInline]),
          // ...(paddingInlineStart && spacingProperties[paddingInlineStart]),
          // ...(paddingInlineEnd && spacingProperties[paddingInlineEnd]),
          // ...style,
          ...css
        }}
      >
        {children}
      </chakra.button>
    )
  },
)

