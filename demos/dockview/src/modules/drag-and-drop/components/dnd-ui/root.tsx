"use client"
import { Container, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useRef } from "react"

export const Root = forwardRef<HTMLDivElement, any>((props: any, ref) => {

  return (
    <Container data-scope="drag-drop" data-part="root" css={{ bg: "transparent" }} {...props} ref={ref} />
  )
})
