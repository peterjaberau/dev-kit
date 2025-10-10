"use client"
import './index.css'
import { ClientOnly } from '@chakra-ui/react'
import Gallery from "./components/Gallery"

export default function Page() {
  return (
    <ClientOnly>
      <Gallery />
    </ClientOnly>
  )
}
