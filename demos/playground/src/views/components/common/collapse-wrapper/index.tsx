import { chakra, Collapsible, Icon } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"

export const CollapseWrapper = ({ title, children }: any) => {
  return (
    <Collapsible.Root
      css={{
        w: "full",
        bg: "bg.panel",
        border: "1px solid",
        borderColor: "border",
        borderRadius: "md",
      }}
    >
      <Collapsible.Trigger
        css={{
          w: "full",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "3",
          py: "2",
          textAlign: "left",
          fontWeight: "medium",
          '&[data-state="open"]': {
            borderBottom: "1px solid",
            borderBottomColor: "border.muted",
          },
        }}
      >
        {title}
        <Collapsible.Indicator
          css={{
            transition: "transform 200ms",
            '&[data-state="open"]': {
              transform: "rotate(180deg)",
            },
          }}
        >
          <Icon>
            <LuChevronDown />
          </Icon>
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <chakra.div
          css={{
            px: "3",
            py: "2",
          }}
        >
          {children}
        </chakra.div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
