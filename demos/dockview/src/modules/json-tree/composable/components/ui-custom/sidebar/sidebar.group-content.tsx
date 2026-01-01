import * as React from "react"

export function SidebarGroupContent({ css, ...props }: any) {
  return (
    <chakra.div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      css={{
        width: "full",
        fontSize: "sm",
        ...css,
      }}
      {...props}
    />
  )
}
