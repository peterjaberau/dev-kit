'use client'
import React, { ReactNode } from "react"
import {
  Type,
  Hash,
  Calendar,
  Clock,
  DollarSign,
  Box,
  Link,
  HelpCircle,
  LucideIcon,
  List,
  ToggleLeft, // Import ToggleLeft icon for boolean
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SchemaFieldType } from "./FieldEditor";
import { cn } from "@/lib/utils";
import { Center } from '@chakra-ui/react'
import { LuType,
  LuHash,
  LuCalendar,
  LuClock,
  LuDollarSign,
  LuBox,
  LuLink,
  LuHelpCircle,
  LuLucideIcon,
  LuList,
  LuToggleLeft,
} from 'react-icons/lu'

interface FieldTypeIconProps {
  type: SchemaFieldType;
  className?: string;
}

const typeIconMap: Record<
  SchemaFieldType,
  { icon: any; name: string }
> = {
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
};

const FieldTypeIcon: React.FC<FieldTypeIconProps> = ({ type, className }) => {
  const { icon: Icon, name: typeName } =
    typeIconMap[type] || { icon: HelpCircle, name: "Unknown Type" }; // Fallback for unknown types

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Center>
          <Icon />
        </Center>
      </TooltipTrigger>
      <TooltipContent>
        <p>{typeName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FieldTypeIcon;
