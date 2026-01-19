import { forwardRef, useCallback, useRef } from "react"
import { chakra, Text } from "@chakra-ui/react"
import { expandableItemIndentation } from "./constants"
import { useLevel } from "./control.context"

export const ControlItemImpl = forwardRef((props: any, ref: any) => {
  const {
    visualContentRef,
    dropIndicator,
    onClick,
    isDragging,
    css,
    children,

    description,
    interactionName,
    hasDragIndicator,
    elemBefore,
    elemAfter,
    isDisabled,

    actions,
    actionsOnHover,
    href,
    target,
    isSelected,
    ariaControls,
    ariaExpanded,
    ariaHasPopup,
    isContentTooltipDisabled,

    ...rest
  } = props
  const level = useLevel()
  const labelRef = useRef(null)

  const handleClick = useCallback(
    (event: any) => {
      onClick?.(event)
    },
    [onClick],
  )
  const interactiveElemContent = (
    <chakra.div
      css={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <chakra.div
        css={{
          insetInlineStart: `calc(-1 * ${level} * ${expandableItemIndentation})`,
          position: "absolute",
          inset: 0,
        }}
      />
      <chakra.div
        css={{
          paddingInlineEnd: "1px",
          paddingInlineStart: "1px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          minWidth: "1ch",
          overflow: "hidden",
          "&:focus-within": {
            overflow: "initial",
          },
        }}
      >
        <Text fontWeight="sm" maxLines={1} textStyle="sm" ref={labelRef}>
          {children}
        </Text>
      </chakra.div>
      {dropIndicator}
    </chakra.div>
  )

  return (
    <chakra.div
      ref={visualContentRef}
      {...rest}
      css={{
        minWidth: "72px",
        height: "2rem",
        alignItems: "center",
        userSelect: "none",
        borderRadius: 1,
        color: "var(--chakra-colors-gray-800)",
        "&:hover": {
          backgroundColor: "var(--chakra-colors-gray-100)",
        },
        ...(isDragging && { opacity: 0.4 }),
        ...css,
      }}
      // draggable={hasDragIndicator ? undefined : false}
    >
      <chakra.button ref={ref} onClick={handleClick}>
        {interactiveElemContent}
      </chakra.button>
    </chakra.div>
  )
})

export const ControlItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props
  return <ControlItemImpl {...rest} {...css} ref={ref} />
})
