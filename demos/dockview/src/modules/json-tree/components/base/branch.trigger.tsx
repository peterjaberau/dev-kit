import React, { forwardRef } from "react"
import { Collapsible, HStack } from "@chakra-ui/react"
import { useNode } from "#shared/selectors"

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { nodeRef, ...rest } = props
  const { sendToNode, isOpen } = useNode({ actorRef: nodeRef })

  const handleClick = () => {
    sendToNode({
      type: "BRANCH_OPEN_CHANGED",
      isOpen: !isOpen,
    })
  }

  return (
    <HStack
      data-scope="json-tree"
      data-part="branch-trigger"
      onClick={handleClick}
      _open={{
        pb: 2,
      }}
      width={"full"}
      css={{ cursor: "pointer" }}
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
