"use client"
import { DraggablePreviewProps } from "./types"

export const DraggablePreview = ({ children }: DraggablePreviewProps) => {
  return (
    <div
      style={{
        position: "relative",
        transform: "rotate(2deg)",
      }}
    >
      {children}

    </div>
  )
}
