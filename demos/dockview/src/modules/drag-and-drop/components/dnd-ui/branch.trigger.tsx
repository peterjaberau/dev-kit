import React, { forwardRef } from "react"
import { Collapsible, HStack } from "@chakra-ui/react"
import { useTreeItem } from "../../selectors"

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, children, ...rest } = props


  const { sendToTreeItem, isOpen } = useTreeItem({ actorRef: itemRef })

  const handleClick = () => {
    useTreeItem({
      type: "toggle",
      open: !isOpen,
    } as any)
  }

  return (
    <HStack
      data-scope="drag-drop"
      data-part="branch-trigger"
      onClick={handleClick}
      // _open={{
      //   pb: 2,
      // }}
      width={"full"}
      // css={{ cursor: "pointer" }}
      {...props}
      ref={ref}
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
