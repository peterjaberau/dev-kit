import { forwardRef } from "react"
import { Button } from "@chakra-ui/react"

export const ActionItem = forwardRef((props: any, ref: any): any => {
  const { css, label, icon, render, trigger, ...rest } = props

  return (
    <Button onClick={trigger} size="sm" variant="outline" css={{ ...css }} {...rest} ref={ref}>
      {render ? (
        render
      ) : (
        <>
          {label && label} {icon && icon}
        </>
      )}
    </Button>
  )
})
