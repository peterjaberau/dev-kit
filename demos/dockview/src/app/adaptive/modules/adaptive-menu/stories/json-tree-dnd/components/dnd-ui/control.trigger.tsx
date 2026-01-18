import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"
import React, { useCallback, useId, useRef } from "react"
import { ControlItem } from "./control.item"
import { useIsExpanded, useOnExpansionToggle, useSetIsExpanded } from "./control.context"

export const ControlTrigger = forwardRef((props: any, ref: any) => {
  const {
    isSelected,
    onClick,
    children,
    interactionName,
    visualContentRef,
    isDragging,
    hasDragIndicator,
    dropIndicator,
  } = props

  const id = useId()
  const onExpansionToggle = useOnExpansionToggle()
  const isExpanded = useIsExpanded()
  const setIsExpanded = useSetIsExpanded()
  const itemRef = useRef<HTMLDivElement>(null)


  const handleClick = useCallback(
    (event: any) => {
      const newValue = !isExpanded
      onClick?.(event, { isExpanded: newValue })
      onExpansionToggle?.(newValue)
      setIsExpanded(newValue)
    },
    [onClick, onExpansionToggle, isExpanded, setIsExpanded],
  )


  return (
    <chakra.div
      ref={itemRef}
      css={{
        display: "flex",
      }}
    >

      <ControlItem
        id={id}
        onClick={handleClick}
        interactionName={interactionName}
        ref={ref}
        visualContentRef={visualContentRef}
        isDragging={isDragging}
        hasDragIndicator={hasDragIndicator}
        dropIndicator={dropIndicator}
      >
        {children}
      </ControlItem>
    </chakra.div>
  )
})


