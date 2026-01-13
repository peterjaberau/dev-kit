"use client"
import { Container, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useMemo, useRef } from "react"
import { createSlotRecipeContext } from "@chakra-ui/react"
import { jsonTreeSlotRecipe } from "./json-tree-recipe"
import { JsonTreeProvider, useJsonTreeContext, JsonTreeInstanceProvider } from "./providers"
import { useJsonTreeInstance } from "#adaptive-json-tree/components/dnd-ui/hooks"
const {
  withProvider,
  withContext,
  useStyles: useJsonTreeStyles,
  PropsProvider,
} = createSlotRecipeContext({ recipe: jsonTreeSlotRecipe })

export { useJsonTreeStyles }

interface PrimitiveRootProps {
  [key: string]: any
}

const PrimitiveRoot = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { children, css, ...rest } = props

  const instance = useJsonTreeInstance()
  const tree = useJsonTreeContext()

  return (
    <Container ref={ref} data-scope="tree" data-part="root" css={{ ...css }} bg="transparent" {...rest}>
      {children}
    </Container>
  )
})

export function RenderRoot(props: any) {
  const { data = {}, config = {}, children, forwardedRef, ...rest } = props

  return (
    <JsonTreeInstanceProvider {...data}>
      <JsonTreeProvider value={config}>
        <PrimitiveRoot ref={forwardedRef} {...rest}>
          {children}
        </PrimitiveRoot>
      </JsonTreeProvider>
    </JsonTreeInstanceProvider>
  )
}

export const Root = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return <RenderRoot {...props} forwardedRef={ref} />
})
