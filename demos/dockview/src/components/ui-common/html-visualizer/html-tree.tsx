"use client"
import React from "react"

export function HtmlTree({ data }: any) {
  if (!data) return null

  if (data.type === "text") {
    return <span style={{ color: "#555" }}>"{data.content}"</span>
  }

  return (
    <div style={{ marginLeft: 16 }}>
      <div style={{ fontWeight: "bold" }}>&lt;{data.tag}&gt;</div>

      {data.children?.map((child: any, i: any) => (
        <HtmlTree key={i} data={child} />
      ))}

      <div style={{ fontWeight: "bold" }}>&lt;/{data.tag}&gt;</div>
    </div>
  )
}




