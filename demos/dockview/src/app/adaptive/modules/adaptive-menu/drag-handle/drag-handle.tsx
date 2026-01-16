import { chakra, Icon } from "@chakra-ui/react"
import { LuGripVertical as DragHandleVerticalIcon } from "react-icons/lu"
import React from "react"

const styles = {
  root: {
    margin: "0px",
    padding: "0px",
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    display: "var(--drag-handle-display, none)",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    marginInlineStart: "-12px",
  },
}

export default function DragHandle() {
  return (
    <chakra.span css={styles.root}>
      <Icon data-tag="1_1_1_1_1_3" data-1-1-1-1-1-3="Icon" data-file="drag-handle" size={"sm"}>
        <svg
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          style={{
            overflow: "hidden",
            color: "currentcolor",
            pointerEvents: "none",
            verticalAlign: "bottom",
            width: "9pt",
            height: "9pt",
          }}
        >
          <path
            d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
            fill="currentcolor"
          />
        </svg>
      </Icon>
    </chakra.span>
  )
}
