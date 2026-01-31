import { chakra, Flex } from "@chakra-ui/react"

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.div
      css={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "1.5rem",
        shrink: "0",
        borderRightWidth: "1px",
        width: "fit-content",
        cursor: "pointer",
      }}
    >
      {children}
    </chakra.div>
  )
}

const Content = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div css={{ w: 0, flexGrow: 1 }}>{children}</chakra.div>
}

const Root = ({ children }: { children: React.ReactNode }) => {
  return <Flex data-scope="layout-explore" css={{ display: "flex", overflow: "hidden", borderTopWidth: "1px", height: "full" }}>{children}</Flex>
}

export const LayoutExplore: any = {
  Root,
  Sidebar,
  Content,
}