"use client"
import { simpleGridRecipe } from "./simple-grid-recipes"
import {
  chakra,
  Grid,
  Box,
  GridItem,
  Center,
  SimpleGrid,
  defineSlotRecipe,
  useSlotRecipe,
  CodeBlock,
  IconButton,
  HStack,
  Stack,
  Container,
} from "@chakra-ui/react"
import { shikiAdapter } from "./components/shiki-adapter"

type ColorType = "red" | "green" | "blue" | "yellow" | null

type CellProps = {
  children: React.ReactNode
  color?: "red" | "green" | "blue" | "yellow" | null
  css?: any
  gridArea?: any
}

type GridCellsProps = {
  children?: React.ReactNode
  templateColumns?: any //templateRows
  templateRows?: any //templateAreas
  autoColumns?: any //gridAutoColumns
  autoRows?: any //gridAutoRows
  autoFlows?: any //gridAutoFlow
  column?: any //gridColumn
  row?: any //gridRow
  inline?: boolean
  gridTemplateAreas?: any
}

export const GridCells = (props: GridCellsProps) => {
  const {
    children,
    templateRows,
    autoRows,
    templateColumns,
    column,
    autoColumns,
    autoFlows,
    row,
    inline,
    gridTemplateAreas,
  } = props
  return (
    <Grid
      templateColumns={templateColumns}
      templateRows={templateRows}
      gap="6"
      autoColumns={autoColumns}
      autoRows={autoRows}
      //@ts-ignore
      autoFlows={autoFlows}
      inline={inline}
      justifyItems={"stretch"}
      backgroundColor={"bg.subtle"}
      width={"500px"}
      css={gridTemplateAreas}
    >
      {children}
    </Grid>
  )
}

export const Cell = (props: CellProps) => {
  return (
    <GridItem>
      <Center
        backgroundColor={props.color || "gray.700"}
        color={"white"}
        fontWeight={"semibold"}
        height="100px"
        boxShadow={"sm"}
        borderRadius={"md"}
        gridArea={props.gridArea}
        css={{
          ...props.css,
        }}
      >
        {props.children}
      </Center>
    </GridItem>
  )
}

const mainGridStyles = defineSlotRecipe({
  slots: ["root", "item"],
  base: {
    root: {
      display: "inline-grid",
      border: "0.1em solid",
      borderRadius: "0.2em",
      fontSize: "2em",
    },
    item: {
      margin: "0.05em",
      borderWidth: "0.1em",
      borderStyle: "solid",
      borderRadius: "0.2em",
      padding: "0.5em",
      fontFamily: "monospace",
    },
  },
})
const MainGrid = (props: any) => {
  const { children, scope, ...restProps } = props
  const recipe = useSlotRecipe({ recipe: mainGridStyles })
  const styles = recipe({ scope })

  return (
    <chakra.div css={styles.root}>
      <chakra.div css={styles.item}>{children}</chakra.div>
    </chakra.div>
  )
}
const CodeViewer = (props: { code: any; language?: string; title: any }) => {
  const { code } = props
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={props?.code} language={props?.language}>
        <CodeBlock.Header>
          <CodeBlock.Title>{props?.title}</CodeBlock.Title>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

type GridItemPreviewProps = {
  children: React.ReactNode
  size?: "small" | "medium" | "big"
  appearance?: "pink" | "blue" | "green" | "yellow" | "orange" | "red"
  gridArea?: any
  css?: any
}
const GridPreview = (props: any) => {
  const { children, name } = props
  const recipe = useSlotRecipe({ recipe: simpleGridRecipe })
  const styles = recipe({ name })

  return (
    <chakra.div flex={1} css={styles.root}>
      {children}
    </chakra.div>
  )
}
const GridItemPreview = (props: GridItemPreviewProps) => {
  const { children, size, appearance, gridArea, ...restProps } = props
  const recipe = useSlotRecipe({ recipe: simpleGridRecipe })
  const styles = recipe({ size, appearance })

  return (
    <chakra.div
      gridArea={gridArea}
      css={{
        ...styles.item,
      }}
    >
      {children}
    </chakra.div>
  )
}

export default function Index() {
  const recipe = useSlotRecipe({ recipe: mainGridStyles })
  const styles = recipe()

  return (
    <Stack width={"full"} h={"100%"} flex={1}>
      <Grid
        templateAreas={`"icon prefix label suffix righticon actions"`}
        gridTemplateRows={"50px 50px 1fr 30px auto"}
        gridTemplateColumns={"150px"}
        h="500px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        bg="gray.100"
        p="4"
        borderRadius="md"
      >
        <GridItem
          pl="2"
          bg="orange.400"
          area={"header"}
          borderRadius="md"
          color="white"
          fontSize="1.2rem"
          display="flex"
          m="1"
          alignItems="center"
        >
          Header
        </GridItem>
        <GridItem pl="2" bg="pink.400" area={"nav"} borderRadius="md" p="2" m="1" color="white" fontSize="1.2rem">
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.400" area={"main"} borderRadius="md" p="2" m="1" color="white" fontSize="1.2rem">
          Main
        </GridItem>
        <GridItem pl="2" bg="blue.400" area={"footer"} borderRadius="md" color="white" m="1" fontSize="15px">
          Footer
        </GridItem>
      </Grid>

      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="500px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        bg="gray.100"
        p="4"
        borderRadius="md"
      >
        <GridItem
          pl="2"
          bg="orange.400"
          area={"header"}
          borderRadius="md"
          color="white"
          fontSize="1.2rem"
          display="flex"
          m="1"
          alignItems="center"
        >
          Header
        </GridItem>
        <GridItem pl="2" bg="pink.400" area={"nav"} borderRadius="md" p="2" m="1" color="white" fontSize="1.2rem">
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.400" area={"main"} borderRadius="md" p="2" m="1" color="white" fontSize="1.2rem">
          Main
        </GridItem>
        <GridItem pl="2" bg="blue.400" area={"footer"} borderRadius="md" color="white" m="1" fontSize="15px">
          Footer
        </GridItem>
      </Grid>
    </Stack>
  )
}
