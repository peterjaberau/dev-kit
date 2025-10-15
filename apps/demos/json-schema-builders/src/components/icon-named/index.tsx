import * as DevKitIcons from "@dev-kit/icons"

// Helper to convert PascalCase to kebab-case
const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

export const iconRegistry: Record<string, React.ComponentType<any>> = {}

Object.entries(DevKitIcons).forEach(([name, component]) => {
  iconRegistry[toKebabCase(name)] = component as React.ComponentType<any>
})

// Usage: <IconComponent name="menu-icon" />
export function IconNamed({ name, ...props }: { name: string } & React.ComponentProps<'svg'>) {
  const Icon = iconRegistry[name]
  return Icon ? <Icon {...props} /> : null
}
