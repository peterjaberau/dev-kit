"use client"
import { Container, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef } from "react"
import { slotRecipes } from "../../styles"



export const Root = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const recipe = useSlotRecipe({ recipe: slotRecipes.jsonTree })
  const styles = recipe()

  return (
    <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }} {...props} ref={ref} />
  )
})
