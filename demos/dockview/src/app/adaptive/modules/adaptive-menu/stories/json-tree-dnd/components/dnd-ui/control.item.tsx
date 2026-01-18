import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const ControlItemImpl = (props: any, ref: any) => {
  const { css, ...rest } = props
  return <chakra.div>item rendered</chakra.div>
}


export const ControlItem = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props
  return <chakra.div ref={ref} {...css} {...rest} />
})
