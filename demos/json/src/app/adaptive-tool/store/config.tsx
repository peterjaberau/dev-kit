import { FilesIcon, RocketIcon, BugIcon, SettingsIcon, CircleUserIcon, ComponentIcon } from "lucide-react"
import * as IconsKit from "@dev-kit/icons"

export const config = {
  sidebar: {
    component: "Sidebar",
    lists: [
      {
        component: "SidebarList",
        items: [
          {
            id: "home",
            component: "SidebarItem",
            icon: <IconsKit.HomeIcon />,
            command: {
              onClick: () => console.log("---home clicked"),
            },
          },
          {
            id: "json",
            component: "SidebarItem",
            icon: <IconsKit.BracesIcon />,
            command: {
              onClick: () => console.log("---json clicked"),
            },
          },
          {
            id: "files",
            component: "SidebarItem",
            icon: <FilesIcon />,
            command: {
              onClick: () => console.log("---files clicked"),
            },
          },
          {
            id: "dev-tools",
            component: "SidebarItem",
            icon: <RocketIcon />,
            command: {
              onClick: () => console.log("---dev-tools clicked"),
            },
          },
        ],
      },

      {
        component: "SidebarList",
        props: {
          justifyContent: "center",
        },
        items: [
          {
            id: "debug",
            component: "SidebarItem",
            icon: <BugIcon />,
            command: {
              onClick: () => console.log("---debug clicked"),
            },
          },
          {
            id: "icons",
            component: "SidebarItem",
            icon: <ComponentIcon />,
            command: {
              onClick: () => console.log("---icons clicked"),
            },
          },
        ],
      },
      {
        component: "SidebarList",
        props: {
          justifyContent: "flex-end",
        },
        items: [
          {
            id: "settings",
            component: "SidebarItem",
            icon: <SettingsIcon />,
            command: {
              onClick: () => console.log("---settings clicked"),
            },
          },
          {
            id: "profile",
            component: "SidebarItem",
            icon: <CircleUserIcon />,
            command: {
              onClick: () => console.log("---Profile clicked"),
            },
          },
        ],
      },
    ],
  },
}