import React, { forwardRef } from "react"
import { Collapsible, HStack } from "@chakra-ui/react"
import { useTreeItem } from "../../selectors"

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  // export const BranchTrigger = forwardRef<HTMLDivElement, any>((props, ref) => {

  const { itemRef, children, ...rest } = props

  const { sendToTreeItem, isOpen } = useTreeItem({ actorRef: itemRef })

  // const handleClick = () => {
  //   useTreeItem({
  //     type: "toggle",
  //     open: !isOpen,
  //   } as any)
  // }

  const handleClick = (e: any) => {
    sendToTreeItem({ type: "toggle", open: !isOpen })
    // onClick?.(e)
  }

  return (
    <HStack
      data-scope="branch"
      data-part="trigger"
      onClick={handleClick}
      css={{
        '&[data-draggable="dragging"]': {
          opacity: 0.4,
        },
        w: "full",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 1,
      }}
      {...props}
      ref={ref}

      // _open={{
      //   pb: 2,
      // }}
    />
  )
})

/*




  return (
    <Collapsible.Trigger
      data-scope="json-tree"
      data-part="branch-trigger"
      _open={{
        pb: 2,
      }}
      width={"full"}
      css={{ cursor: "pointer" }}
      {...props}
      ref={ref}
    />
  )
 */
