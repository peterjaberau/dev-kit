import { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const Header = (props: any) => {
  return <>{props.children}</>
}

export const Content = (props: any) => {
  return <>{props.children}</>
}

export const Root = (props: any) => {
  return (
    <chakra.div css={{ display: "flex", overflowY: "auto", flexDirection: "column", height: "100vh" }}>
      <chakra.div
        css={{
          display: "flex",
          height: "full",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          flexDirection: "column",
        }}
      >
        {props.children}
      </chakra.div>
    </chakra.div>
  )
}

export const LayoutCommon = {
  Root,
  Header,
  Content,
}
