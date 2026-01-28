'use client';
import NextLink from "next/link"
import { useParams } from "next/navigation"

import { EditorPage } from "../../src/pages"

export default function Page() {
  const params = useParams()
  const paramValue = params.name as string

  return (
   <EditorPage/>
  )
}
