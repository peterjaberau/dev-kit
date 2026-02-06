import { ComponentRegistry, SchemaNode } from "#object-ui/core"
import { Button, ButtonProps } from "@chakra-ui/react"
import { renderChildren } from "../lib/utils"
import { forwardRef } from "react"
import { Loader2, icons, type LucideIcon } from "lucide-react"

// Helper to convert icon names to PascalCase (e.g., "arrow-right" -> "ArrowRight")
function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

// Map of renamed icons in lucide-react
const iconNameMap: Record<string, string> = {
  Home: "House",
}



const ButtonRenderer = forwardRef<HTMLButtonElement, { schema: any; [key: string]: any }>(
  ({ schema, ...props }, ref) => {
    // Extract designer-related props
    const { "data-obj-id": dataObjId, "data-obj-type": dataObjType, style: css, ...buttonProps } = props

    // Resolve icon
    let Icon: LucideIcon | null = null
    if (schema.icon) {
      const iconName = toPascalCase(schema.icon)
      const mappedIconName = iconNameMap[iconName] || iconName
      Icon = (icons as any)[mappedIconName] as LucideIcon
    }

    // Determine loading state
    const isLoading = schema.loading || props.loading

    // Determine disabled state
    const isDisabled = schema.disabled || props.disabled || isLoading

    return (
      <Button
        ref={ref}
        type={schema.buttonType || "button"}
        variant={schema.variant}
        size={schema.size}
        loading={isLoading}
        className={schema.className}
        disabled={isDisabled}
        {...buttonProps}
        // Apply designer props
        {...{ "data-obj-id": dataObjId, "data-obj-type": dataObjType, css }}
      >
        {!isLoading && Icon && schema.iconPlacement !== "right" && <Icon />}
        {schema.label || renderChildren(schema.body || schema.children)}
        {!isLoading && Icon && schema.iconPlacement === "right" && <Icon />}
      </Button>
    )
  },
)
ButtonRenderer.displayName = "ButtonRenderer"

ComponentRegistry.register("button", ButtonRenderer, {
  namespace: "ui",
  label: "Button",
  inputs: [
    { name: "label", type: "string", label: "Label", defaultValue: "Button" },
    {
      name: "variant",
      type: "enum",
      label: "Variant",
      enum: ["solid", "subtle", "surface", "outline", "ghost", "plain"],
      // enum: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      defaultValue: "solid",
    },
    {
      name: "size",
      type: "enum",
      label: "Size",
      enum: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      // enum: ["default", "sm", "lg", "icon"],
      defaultValue: "default",
    },
    { name: "className", type: "string", label: "CSS Class", advanced: true },
    { name: "css", type: "object", label: "CSS Style", advanced: true },
  ],
  defaultProps: {
    label: "Button",
    variant: "solid",
    size: "md",
  },
})
