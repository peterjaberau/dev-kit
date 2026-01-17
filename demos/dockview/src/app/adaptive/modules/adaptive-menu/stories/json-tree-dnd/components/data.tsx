import { Icon as ChakraIcon } from "@chakra-ui/react"
import {
  StarUnstarredIcon,
  ClockIcon,
  PersonAvatarIcon,
  FilterIcon,
  ProjectIcon,
  AddIcon,
  TagIcon,
  BasketballIcon,
  ChartBarIcon,
  DeviceMobileIcon,
  ImageIcon,
  ScorecardIcon,
  TextIcon,
  ThemeIcon,
  VehicleCarIcon,
} from "./icons"
import { forwardRef } from "react"

export const data = [
  {
    id: "for-you",
    name: "For You",
    href: "#",
    icon: "person",
    children: [],
  },
  {
    id: "recent",
    name: "Recent",
    href: "#",
    icon: "clock",
    children: [],
  },
  {
    id: "starred",
    name: "Starred",
    href: "#",
    icon: "start",
    children: [],
  },
  {
    id: "projects",
    name: "Projects",
    href: "#",
    icon: "project",
    isOpen: true,
    children: [
      {
        id: "projects-starred",
        name: "Starred",
        href: "#",
        icon: "star",
        isOpen: true,
        children: [
          {
            id: "id:0",
            href: "#",
            name: "Modernize typography",
            icon: "text",
          },
          {
            id: "id:1",
            href: "#",
            name: "F1 sponsorship",
            icon: "car",
          },
          {
            id: "id:2",
            href: "#",
            name: "Mobile application",
            icon: "mobile",
          },
        ],
      },
      {
        id: "projects-recent",
        name: "Recent",
        href: "#",
        icon: "clock",
        isOpen: true,
        children: [
          {
            id: "id:3",
            href: "#",
            name: "Attachments",
            icon: "image",
          },
          {
            id: "id:4",
            href: "#",
            name: "Audit",
            icon: "scorecard",
          },
          {
            id: "id:5",
            href: "#",
            name: "Dark mode",
            icon: "theme",
          },
          {
            id: "id:6",
            href: "#",
            name: "Visualization",
            icon: "chartbar",
          },
          {
            id: "id:7",
            href: "#",
            name: "Basketball tournament",
            icon: "basketball",
          },
        ],
      },
    ],
  },
  {
    id: "filters",
    name: "Filters",
    href: "#",
    icon: "filter",
    children: [
      {
        id: "id:8",
        name: "Filter 1",
        href: "#",
        icon: "filter",
        isOpen: true,
        children: [
          {
            id: "id:9",
            name: "Filter 1.1",
            href: "#",
            icon: "filter",
            children: [],
          },
          {
            id: "id:10",
            name: "Filter 1.2",
            href: "#",
            icon: "filter",
            children: [],
          },
          {
            id: "id:11",
            name: "Filter 1.3",
            href: "#",
            icon: "filter",
            children: [],
          },
        ],
      },
      {
        id: "id:12",
        name: "Filter 2",
        href: "#",
        icon: "filter",
        isOpen: true,
        children: [
          {
            id: "id:13",
            name: "Filter 2.1",
            href: "#",
            icon: "filter",
            isOpen: true,
            children: [
              {
                id: "id:14",
                name: "Filter 2.1.1",
                href: "#",
                icon: "filter",
                children: [],
              },
              {
                id: "id:15",
                name: "Filter 2.1.2",
                href: "#",
                icon: "filter",
                children: [],
              },
              {
                id: "id:16",
                name: "Filter 2.1.3",
                href: "#",
                icon: "filter",
                children: [],
              },
            ],
          },
          {
            id: "id:17",
            name: "Filter 2.2",
            href: "#",
            icon: "filter",
            children: [],
          },
        ],
      },
      {
        id: "id:18",
        name: "Filter 3",
        href: "#",
        icon: "filter",
        children: [],
      },
      {
        id: "id:19",
        name: "Filter 4",
        href: "#",
        icon: "filter",
        children: [],
      },
    ],
  },
]

export const Icon = forwardRef((props: any, ref: any) => {
  const { children, css, size = "sm", ...rest } = props
  return (
    <ChakraIcon ref={ref} size={size} css={{ ...css }} {...rest}>
      {children}{" "}
    </ChakraIcon>
  )
})

export const iconsRegistry = {
  star: <StarUnstarredIcon />,
  clock: <ClockIcon />,
  person: <PersonAvatarIcon />,
  filter: <FilterIcon />,
  project: <ProjectIcon />,
  add: <AddIcon />,
  tag: <TagIcon />,
  basketball: <BasketballIcon />,
  chartbar: <ChartBarIcon />,
  mobile: <DeviceMobileIcon />,
  image: <ImageIcon />,
  scorecard: <ScorecardIcon />,
  text: <TextIcon />,
  theme: <ThemeIcon />,
  car: <VehicleCarIcon />,
}
