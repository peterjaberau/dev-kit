"use client"
import { DragPreviewItemProps } from "../shared/types"

export const DraggablePreviewItem = ({ children, badgeCount }: DragPreviewItemProps) => {
  return (
    <div
      style={{
        position: "relative",
        transform: "rotate(2deg)",
      }}
    >
      {children}

      {badgeCount && badgeCount > 1 && (
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            pointerEvents: "none",
            position: "absolute",
            right: "-1.5rem",
            top: "-1.5rem",
            zIndex: 20,
            display: "flex",
            height: "1.5rem",
            minWidth: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "full",
            fontSize: "sm",
            fontWeight: "bold",
            boxShadow: "md",
          }}
        >
          {badgeCount}
        </div>
      )}
    </div>
  )
}
