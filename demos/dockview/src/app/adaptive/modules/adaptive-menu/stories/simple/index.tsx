"use client"
import { AdaptiveMenu } from "../.."
import { chakra, Container } from "@chakra-ui/react"
import { dataTree } from "../data"
import { forwardRef } from "react"
import { useMenu } from "react"


const Index = () => {
  return (
    <Container maxW="container.sm" border="1px solid black" padding="4">
      <AdaptiveMenu.Root data={dataTree}>
        <Render />
      </AdaptiveMenu.Root>
    </Container>
  )
}

const Render = forwardRef((props: any, ref: any) => {
  const { css, ...rest } = props

  const { menuContext } = useMenu()

  return <chakra.div ref={ref} data-scope="item-text" css={css} {...rest} />
})



export default Index
