import * as React from "react"

export function SidebarMenuItem({ css, ...props }: any) {
  return (
    <chakra.li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className="group"
      css={{
        position: "relative",
        ...css,
      }}
      {...props}
    />
  )
}
