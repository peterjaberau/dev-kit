"use client"
import { Container } from "@chakra-ui/react"
import React, { forwardRef } from "react"


export const Root = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }} {...props} ref={ref} />
  )
})
