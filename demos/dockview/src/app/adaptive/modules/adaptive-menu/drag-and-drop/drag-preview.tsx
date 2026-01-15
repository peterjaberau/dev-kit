"use client"
import { chakra, ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"

const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any)
const theme = createSystem(themeConfig)

function RenderDragPreview({ elemBefore, content, input }: any) {
  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        boxShadow: "sm",
        flexDirection: "row",
        borderWidth: "1px",
        borderColor: "#0B120E24",
        borderStyle: "solid",
        backgroundColor: "#FFFFFF",
        borderRadius: "md",
        paddingInlineEnd: "4px",
        maxWidth: 260,
        // paddingY: 2,
        // paddingX: 3,
      }}
    >
      <chakra.div css={{ px: 2 }}>{elemBefore}</chakra.div>
      <chakra.div css={{ flex: 1 }}>{content}</chakra.div>
    </chakra.div>
  )
}

export function DragPreview({ elemBefore, children }: any) {
  return (
    <ChakraProvider value={theme}>
      <RenderDragPreview elemBefore={elemBefore}>
        {children}
      </RenderDragPreview>
    </ChakraProvider>
  )
}
