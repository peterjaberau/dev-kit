import * as React from "react"

export function SidebarMenu({ css, ...props }: any) {
  return (
    <chakra.ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      css={{
        display: "flex",
        width: "full",
        minWidth: 0,
        flexDirection: "column",
        gap: 1,
        ...css,
      }}
      {...props}
    />
  )
}
