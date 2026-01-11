import { forwardRef } from "react"
import { chakra, Heading } from "@chakra-ui/react"

export const Title =
  forwardRef((props: any, ref: any): any => {
    const { css, ...rest } = props
    return <Heading textStyle={"md"} css={{ ...css }} {...rest} ref={ref} />
  })
