"use client"
import { Container, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useRef } from "react"

export const Root = forwardRef<HTMLDivElement, any>((props: any, ref) => {

  return <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }} {...props} ref={ref} />
})
