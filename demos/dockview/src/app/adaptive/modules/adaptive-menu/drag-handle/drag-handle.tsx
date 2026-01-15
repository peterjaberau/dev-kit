import { chakra, Icon } from "@chakra-ui/react"
import { LuGripVertical as DragHandleVerticalIcon } from "react-icons/lu"

const styles = {
  root: {
    color: "#505258",
    display: `var(--drag-handle-display, none)`,
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    marginInlineStart: "-12px",
  },
}

export default function DragHandle() {
	return (
    <Icon size={'sm'} css={styles.root} aria-hidden="true">
        <DragHandleVerticalIcon />
    </Icon>
  )
}
