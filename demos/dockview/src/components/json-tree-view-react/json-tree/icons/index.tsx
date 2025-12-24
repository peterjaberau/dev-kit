import { LuType, LuHash, LuCalendar, LuClock, LuDollarSign, LuBox, LuLink, LuToggleLeft, LuList } from "react-icons/lu"
import { Icon, IconProps } from "@chakra-ui/react"

type NameIconType =
  | "string"
  | "int"
  | "float"
  | "currency"
  | "date"
  | "datetime"
  | "time"
  | "object"
  | "ref"
  | "dropdown"
  | "boolean"

const typeIconMap: any = {
  string: { icon: LuType, name: "String" },
  int: { icon: LuHash, name: "Integer" },
  float: { icon: LuHash, name: "Float" }, // Using Hash for both int and float
  currency: { icon: LuDollarSign, name: "Currency" },
  date: { icon: LuCalendar, name: "Date" },
  datetime: { icon: LuClock, name: "DateTime" },
  time: { icon: LuClock, name: "Time" }, // Added icon for time
  object: { icon: LuBox, name: "Object" },
  ref: { icon: LuLink, name: "Reference" },
  dropdown: { icon: LuList, name: "Dropdown" },
  boolean: { icon: LuToggleLeft, name: "Boolean" }, // Added icon for boolean
}

interface NamedIconProps extends IconProps {
  name: NameIconType
}

export const NamedIcon = (props: NamedIconProps) => {
  const { name, ...rest } = props

  const entry = typeof name === "string" ? typeIconMap[name] : undefined
  const IconComponent = entry?.icon ?? LuType // fallback to LuType

  return (
    <Icon {...props}>
      <IconComponent />
    </Icon>
  )
}
