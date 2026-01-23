import { forwardRef } from "react"
import { Button } from "@chakra-ui/react"

export const ActionInspect = forwardRef((props: any, ref: any): any => {
  const { ...rest } = props

  return <Button size={"sm"} variant={"outline"} {...rest} ref={ref} />
})
