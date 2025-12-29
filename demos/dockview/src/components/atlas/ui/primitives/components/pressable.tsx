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

type BasePressableProps = {
  /**
   * Elements to be rendered inside the Pressable.
   */
  children?: ReactNode
  /**
   * Handler called on click. The second argument provides an Atlaskit UI analytics event that can be fired to a listening channel. See the ['analytics-next' package](https://atlaskit.atlassian.com/packages/analytics/analytics-next) documentation for more information.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Whether the button is disabled.
   */
  isDisabled?: boolean
  /**
   * An optional name used to identify events for [React UFO (Unified Frontend Observability) press interactions](https://developer.atlassian.com/platform/ufo/react-ufo/react-ufo/getting-started/#quick-start--press-interactions). For more information, see [React UFO integration into Design System components](https://go.atlassian.com/react-ufo-dst-integration).
   */
  interactionName?: string
  /**
   * An optional component name used to identify this component in Atlaskit analytics events. This can be used if a parent component's name is preferred over the default 'Pressable'.
   */
  componentName?: string
  /**
   * Additional information to be included in the `context` of Atlaskit analytics events that come from pressable.
   */
  analyticsContext?: Record<string, any>
  /**
   * Token representing background color with a built-in fallback value.
   * @deprecated Please pass via `props.xcss`, eg. `xcss({ backgroundColor: '…' })` instead and include states such as hover values as well.
   */
  backgroundColor?: any
  /**
   * Tokens representing CSS shorthand for `paddingBlock` and `paddingInline` together.
   *
   * @see paddingBlock
   * @see paddingInline
   */
  padding?: any
  /**
   * Tokens representing CSS shorthand `paddingBlock`.
   *
   * @see paddingBlockStart
   * @see paddingBlockEnd
   */
  paddingBlock?: any
  /**
   * Tokens representing CSS `paddingBlockStart`.
   */
  paddingBlockStart?: any
  /**
   * Tokens representing CSS `paddingBlockEnd`.
   */
  paddingBlockEnd?: any
  /**
   * Tokens representing CSS shorthand `paddingInline`.
   *
   * @see paddingInlineStart
   * @see paddingInlineEnd
   */
  paddingInline?: any
  /**
   * Tokens representing CSS `paddingInlineStart`.
   */
  paddingInlineStart?: any
  /**
   * Tokens representing CSS `paddingInlineEnd`.
   */
  paddingInlineEnd?: any
  /**
   * Forwarded ref.
   */
  ref?: Ref<HTMLButtonElement>
}

// This duplicates FocusRing styles from `@atlaskit/focus-ring`.
const focusRingStyles = {
  "&:focus, &:focus-visible": {
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
    outlineColor: token("color.border.focused"),
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
    outlineOffset: token("space.025"),
    outlineStyle: "solid",
    // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
    outlineWidth: token("border.width.focused"),
  },
  // eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
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
        {...safeHtmlAttributes}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        css={{
          ...baseStyles,
          ...focusRingStyles,
          ...(isDisabled ? disabledStyles : enabledStyles),
          backgroundColor: backgroundColorMap[backgroundColor],
          ...(padding && spacingProperties[padding]),
          ...(paddingBlock && spacingProperties[paddingBlock]),
          ...(paddingBlockStart && spacingProperties[paddingBlockStart]),
          ...(paddingBlockEnd && spacingProperties[paddingBlockEnd]),
          ...(paddingInline && spacingProperties[paddingInline]),
          ...(paddingInlineStart && spacingProperties[paddingInlineStart]),
          ...(paddingInlineEnd && spacingProperties[paddingInlineEnd]),
          ...style,
          ...css
        }}
      >
        {children}
      </chakra.button>
    )
  },
)

