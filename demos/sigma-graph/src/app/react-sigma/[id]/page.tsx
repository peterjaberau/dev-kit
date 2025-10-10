"use client"
import { useParams } from "next/navigation"
import { WidgetMap } from "./components"

export default function Page() {
  const { id }: any = useParams()
  const Widget = WidgetMap[id] // alias it for clarity

  return <>{Widget ? <Widget /> : null}</>
}
