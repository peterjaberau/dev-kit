import { LuSearch } from "react-icons/lu"

import React, { useCallback, useMemo } from "react"
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  Stack,
  InputGroup,
  Icon,
  Box,
  Input,
  Center,
  Flex,
  VStack,
  Heading,
  Text,
  Switch,
  Button,
  Link,
  useTheme,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useColorMode,
} from "@chakra-ui/react"
import { SIDEBAR_WIDTH } from "./layout-consts" // Assuming this constant is imported
import { StringMatchDictionaryItem } from "./workers/string-match" // Assuming this type is imported

// --- Placeholder Components (Replacing Web Components) ---
// NOTE: These components must be refactored separately (as shown in previous requests)
// and imported here in a real React application.
const StvtFiltersMenu = React.memo((props: any) => <Box p="10px">Filters Menu Placeholder</Box>)
const StvtSearch = React.memo((props: any) => <Box p="10px">Search Bar Placeholder</Box>)

// --- Component Props ---
interface StvtSidebarProps {
  dictionary?: StringMatchDictionaryItem[]
  filters?: string[]
  // listOfComponents?: string[]; // Not used in render, omitting
  // selectedTokens?: string[];    // Not used in render, omitting
  // selectedComponents?: string[]; // Not used in render, omitting
  spectrumColorTheme?: "dark" | "light"
  // Event callbacks (replacing dispatchCustomEvent)
  onSetSpectrumColorTheme: (theme: "dark" | "light") => void
  onFiltersSelected: (filters: string[]) => void
  onSelectId: (id: string) => void
}

/**
 * Sidebar component managing search, filters, and application metadata.
 */
export const StvtSidebar: React.FC<StvtSidebarProps> = ({
  dictionary = [],
  filters = [],
  spectrumColorTheme = "dark",
  onSetSpectrumColorTheme,
  onFiltersSelected,
  onSelectId,
}) => {
  const theme = useTheme()
  const isLightsOn = spectrumColorTheme === "light"
  // Chakra's colorMode context can manage the theme, but we respect the prop for external control
  const { setColorMode } = useColorMode()

  // --- Event Handlers (Replacing class methods) ---

  const handleSwitchValueChange = useCallback(() => {
    const newTheme = isLightsOn ? "dark" : "light"
    onSetSpectrumColorTheme(newTheme)
    // Optional: Sync Chakra's internal color mode state
    setColorMode(newTheme)
  }, [isLightsOn, onSetSpectrumColorTheme, setColorMode])

  const handleFiltersChange = useCallback(
    (newFilters: string[]) => {
      onFiltersSelected(newFilters)
    },
    [onFiltersSelected],
  )

  const handleSearchSelect = useCallback(
    (id: string) => {
      onSelectId(id)
    },
    [onSelectId],
  )

  // --- Keyboard Shortcuts / Footer Content ---
  const keyboardShortcuts = [
    { key: "⌘ F", description: "Search Tokens" },
    { key: "⌘ drag", description: "Pan / Move Token" },
    { key: "← ↑ ↓ →", description: "Pan" },
    { key: "⌘ scroll", description: "Zoom In / Out" },
    { key: "Z / Shift Z", description: "Zoom In / Out" },
    { key: "BACK", description: "Undo Selection" },
    { key: "FORWARD", description: "Redo Selection" },
  ]

  const renderShortcuts = useMemo(
    () => (
      <List listStyleType="none" m="0" p="0" pb="20px" fontSize="11px" ml="85px">
        {keyboardShortcuts.map((item) => (
          <ListItem key={item.key} position="relative">
            <Text
              as="i"
              color="gray.500"
              mr="10px"
              fontStyle="normal"
              position="absolute"
              right="100%"
              textAlign="right"
              whiteSpace="nowrap"
            >
              <Text as="span" fontFamily="Arial, Helvetica, sans-serif">
                {item.key.split(" ")[0]}
              </Text>
              {item.key.split(" ").slice(1).join(" ")}
            </Text>
            {item.description}
          </ListItem>
        ))}
      </List>
    ),
    [],
  )

  // --- Render ---

  return (
    <Flex
      // Equivalent to :host styles
      position="absolute"
      flexDirection="column"
      h="100%"
      w={`${SIDEBAR_WIDTH}px`}
      bg="gray.100" // spectrum-gray-100
      justifyContent="space-between"
      boxShadow="md" // 2px 0 0 0 var(--spectrum-gray-50) is better represented as a slight shadow
      color="gray.900" // spectrum-gray-900
      zIndex="sticky"
    >
      {/* Top Section */}
      <Box className="top" p="0 10px" pt="20px" zIndex="sticky">
        <Flex className="branding" alignItems="center" gap="15px" pb="20px">
          {/* Mock Image Placeholder */}
          <Box w="30px" h="26px" bg="blue.500" /> {/* Placeholder for adobe.svg */}
          <VStack align="start" spacing={0}>
            <Heading as="h1" fontSize="18px" fontWeight="normal" lineHeight="24px">
              Spectrum (S2)
            </Heading>
            <Heading as="h2" fontSize="11px" fontWeight="normal" lineHeight="18px" textTransform="uppercase">
              Token Visualization Tool
            </Heading>
          </VStack>
        </Flex>
        {/* stvt-search (Refactored Component) */}
        <StvtSearch dictionary={dictionary} onSelectId={handleSearchSelect} />
      </Box>

      {/* Middle Section (Scrollable Filters) */}
      <Box
        className="middle"
        flexGrow={1}
        overflowY="scroll"
        flexShrink={1}
        zIndex="base"
        p="0 10px" // Apply horizontal padding here
      >
        {/* stvt-filters-menu (Refactored Component) */}
        <StvtFiltersMenu filters={filters} onFiltersSelected={handleFiltersChange} />
      </Box>

      {/* Bottom Section (Footer) */}
      <Box
        className="bottom"
        borderTop="1px solid"
        borderColor="gray.200" // spectrum-gray-200
        p="0"
        bg="gray.100" // Ensures footer background matches
      >
        <Box as="footer" p="20px">
          {renderShortcuts}
          <Flex justifyContent="space-between" alignItems="center">
            {/* About Button and Popover (Replacing overlay-trigger/sp-popover) */}
            <Popover placement="top-start" trigger="click">
              <PopoverTrigger>
                <Button size="sm" colorScheme="blue" variant="solid">
                  About
                </Button>
              </PopoverTrigger>
              <PopoverContent bg="white" color="gray.800" boxShadow="xl" maxW="500px">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody p={4} fontSize="sm">
                  <Text mb={2}>
                    Design tokens are all the values needed to construct and maintain a design system — spacing, color,
                    typography, object styles, animation, etc. — represented as data. These can represent anything
                    defined by design: a color as a RGB value, an opacity as a number, an animation ease as Bezier
                    coordinates. They’re used in place of hard-coded values in order to ensure flexibility and unity
                    across all product experiences.
                  </Text>
                  <Text mb={2}>
                    Design tokens are directly integrated into our component libraries, UI kits, and the Spectrum XD
                    plugin. They cover the various options of platform scales, color themes, component states, and more.
                    We also offer teams a variety of token types to use directly within their products if they are not
                    using a Spectrum component library.
                  </Text>
                  <Text mb={4}>
                    This tool allows you to organically explore the relationship between these tokens by directly
                    selecting tokens to expand their connections, filtering displayed values and connections by scale
                    and theme, and by directly searching for token names or values.
                  </Text>
                  <VStack align="start" spacing={1}>
                    <Link href="https://github.com/adobe/spectrum-tokens" isExternal color="blue.500">
                      Spectrum Tokens on GitHub
                    </Link>
                    <Link href="https://git.corp.adobe.com/aportill/stvt/" isExternal color="blue.500">
                      This Tool on GitHub
                    </Link>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            {/* Lights On Switch (Replacing sp-switch) */}
            <Switch
              isChecked={isLightsOn}
              onChange={handleSwitchValueChange}
              id="spectrum-color-theme-switch"
              colorScheme="blue"
            >
              Lights on
            </Switch>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

const SidebarRoot = (props: any) => {
  return (
    <Stack
      css={{
        position: "absolute",
        height: "100%",
        width: "250px",
        backgroundColor: "bg",
        justifyContent: "space-between",
        boxShadow: "sm",
        colors: "fg",
        left: 0,
        ...props?.css,
      }}
      {...props}
    >
      {props?.children}
    </Stack>
  )
}

const SidebarSection = (props: any) => {
  return (
    <Box
      css={{
        position: "relative",
        display: "block",
        width: "250px",
        padding: "0 10px",
        ...props?.css,
      }}
      {...props}
    >
      {props?.children}
    </Box>
  )
}

const SidebarSectionTop = (props: any) => {
  return (
    <SidebarSection>
      <Box
        css={{
          paddingTop: "20px",
          zIndex: 1,
          ...props?.css,
        }}
        {...props}
      >
        {props?.children}
      </Box>
    </SidebarSection>
  )
}

const SidebarSectionMiddle = (props: any) => {
  return (
    <SidebarSection>
      <Box
        css={{
          flexGrow: 1,
          overflow: "scroll",
          flexShrink: 1,
          zIndex: 0,
          ...props?.css,
        }}
        {...props}
      >
        {props?.children}
      </Box>
    </SidebarSection>
  )
}

const SidebarSectionBottom = (props: any) => {
  return (
    <SidebarSection>
      <Box
        css={{
          bottom: 0,
          padding: 0,
          borderTop: "1px solid",
          borderTopColor: "border.emphasized",
          ...props?.css,
        }}
        {...props}
      >
        {props?.children}
      </Box>
    </SidebarSection>
  )
}

const SidebarBranding = (props: any) => {
  return (
    <Flex alignItems={"center"} gap={15} paddingBottom={"20px"}>
      <Text textStyle="lg" textAlign="center" css={props.css} {...props}>
        {props?.children}
      </Text>
    </Flex>
  )
}

const SidebarSearch = (props: any) => {
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })


  return (
    <Box
      css={{
        position: "relative",
        width: "100%",
        display: "block",
      }}
    >
      <InputGroup
        flex="1"
        startElement={
          <Icon size="sm">
            <LuSearch />
          </Icon>
        }
      >
        <Input
          placeholder="Search"


        />
      </InputGroup>
    </Box>
  )
}

export const Sidebar = () => {
  return (
    <SidebarRoot>
      <SidebarSectionTop>
        <SidebarBranding>Token Visualization Tool</SidebarBranding>
        <SidebarSearch />
      </SidebarSectionTop>
      <SidebarSectionMiddle>middle</SidebarSectionMiddle>
      <SidebarSectionBottom>bottom</SidebarSectionBottom>
    </SidebarRoot>
  )
}
