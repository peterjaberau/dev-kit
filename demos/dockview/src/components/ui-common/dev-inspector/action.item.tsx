import { forwardRef } from "react"
import { Button } from "@chakra-ui/react"

export const ActionItem = forwardRef((props: any, ref: any): any => {
  const { css, children, ...rest } = props

  return children ? <>{children}</> : <Button size="sm" variant="outline" css={{ ...css }} {...rest} ref={ref} />
})
