'use client'
import { Accordion, Anchor, Divider, Flex, Text } from "@mantine/core"
import { IconHelp, IconMathFunction, IconPackage, IconSettings } from "@tabler/icons-react"
import { memo } from "react"
import { CustomFunction } from "../models/custom-function"
import { Settings } from "../models/settings"
import CustomFunctionsView from "./custom-functions/custom-functions-view"
import SettingsEditor from "./settings-editor"
import { MarkdownView } from "./markdown-view"

// import jsonPathGuide from "./jsonpath-guide.md"
// import applicationGuide from "./application-guide.md"
import "./sidebar.css"

/**
 * Application sidebar.
 */
const Sidebar = memo(
  ({
    customFunctions,
    settings,
    onCustomFunctionsChanged,
    onSettingsChanged,
  }: {
    customFunctions: readonly CustomFunction[]
    settings: Settings
    onCustomFunctionsChanged: (customFunctions: readonly CustomFunction[]) => void
    onSettingsChanged: (settings: Settings) => void
  }) => {
    return (
      <Flex direction="column" h="100%">
        <Accordion className={"accordion"}>
          <Accordion.Item value="jsonPathGuide" className={"accordionItem"}>
            <Accordion.Control icon={<IconHelp size={20} />}>JSONPath Guide</Accordion.Control>
            <Accordion.Panel className={"accordionPanel"}>
              {/*<MarkdownView markdown={jsonPathGuide} withSpacing />*/}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="applicationGuide" className={"accordionItem"}>
            <Accordion.Control icon={<IconHelp size={20} />}>Application Guide</Accordion.Control>
            <Accordion.Panel className={"accordionPanel"}>
              {/*<MarkdownView markdown={applicationGuide} withSpacing />*/}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="customFunctions" className={"accordionItem"}>
            <Accordion.Control icon={<IconMathFunction size={20} />}>Custom Functions</Accordion.Control>
            <Accordion.Panel className={"accordionPanel"}>
              <CustomFunctionsView
                customFunctions={customFunctions}
                onCustomFunctionsChanged={onCustomFunctionsChanged}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="settings" className={"accordionItem"}>
            <Accordion.Control icon={<IconSettings size={20} />}>Settings</Accordion.Control>
            <Accordion.Panel className={"accordionPanel"}>
              <SettingsEditor settings={settings} onSettingsChanged={onSettingsChanged} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Divider mt="auto" />
        <Text p="xs" c="dimmed">
          <IconPackage size={14} /> The editor component and parser are also available as standalone{" "}
          <Anchor href="https://janjorka.github.io/jsonpath-tools" target="_blank">
            libraries
          </Anchor>
          .
        </Text>
        <Divider />
      </Flex>
    )
  },
)
export default Sidebar
