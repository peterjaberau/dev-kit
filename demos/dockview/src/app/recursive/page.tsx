"use client"
import React from "react"
import { Container } from "@chakra-ui/react"
import RecursiveComponent from "#modules/recursive"

export default function Page() {
  return (
    <Container>
      <RecursiveComponent />
    </Container>
  )
}
