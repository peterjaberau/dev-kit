import { forwardRef } from "react"
import { chakra, Heading } from "@chakra-ui/react"
import { Button } from "antd"

export const ActionInspect = forwardRef((props: any, ref: any): any => {
  const { css, ...rest } = props

  return <Button size={"sm"} variant={"outline"} css={{ ...css }} {...rest} ref={ref} />
})
