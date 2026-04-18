"use client"

import type { Assign } from "@ark-ui/react"
import { FloatingPanel as ArkFlexiblePanel } from "@ark-ui/react/floating-panel"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "@chakra-ui/react"

////////////////////////////////////////////////////////////////////////////////////
import { flexiblePanelStyles } from './flexible-panel-styles'
const {
  withProvider,
  withContext,
  useStyles: useFlexiblePlanelStyles,
  PropsProvider,
} = createSlotRecipeContext({ recipe: flexiblePanelStyles })

export { useFlexiblePlanelStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelRootProviderBaseProps
  extends Assign<ArkFlexiblePanel.RootProviderBaseProps, SlotRecipeProps<"flexible-panel">>,
    UnstyledProp {}

export interface FlexiblePanelRootProviderProps extends HTMLChakraProps<"div", FlexiblePanelRootProviderBaseProps> {}

export const FlexiblePanelRootProvider = withProvider<HTMLDivElement, FlexiblePanelRootProviderProps>(
  ArkFlexiblePanel.RootProvider,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelRootBaseProps
  extends Assign<ArkFlexiblePanel.RootBaseProps, SlotRecipeProps<"flexible-panel">>,
    UnstyledProp {}

export interface FlexiblePanelRootProps extends HTMLChakraProps<"div", FlexiblePanelRootBaseProps> {}

export const FlexiblePanelRoot = withProvider<HTMLDivElement, FlexiblePanelRootProps>(ArkFlexiblePanel.Root, "root", {
  forwardAsChild: true,
})

export const FlexiblePanelPropsProvider = PropsProvider as React.Provider<FlexiblePanelRootBaseProps>

export interface FlexiblePanelPositionerProps
  extends HTMLChakraProps<"div", ArkFlexiblePanel.PositionerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelPositioner = withContext<HTMLDivElement, FlexiblePanelPositionerProps>(
  ArkFlexiblePanel.Positioner,
  "positioner",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelTriggerProps
  extends HTMLChakraProps<"button", ArkFlexiblePanel.TriggerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelTrigger = withContext<HTMLButtonElement, FlexiblePanelTriggerProps>(
  ArkFlexiblePanel.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelContentProps
  extends HTMLChakraProps<"div", ArkFlexiblePanel.ContentBaseProps>,
    UnstyledProp {}

export const FlexiblePanelContent = withContext<HTMLDivElement, FlexiblePanelContentProps>(
  ArkFlexiblePanel.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelHeaderProps
  extends HTMLChakraProps<"div", ArkFlexiblePanel.HeaderBaseProps>,
    UnstyledProp {}

export const FlexiblePanelHeader = withContext<HTMLDivElement, FlexiblePanelHeaderProps>(
  ArkFlexiblePanel.Header,
  "header",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelBodyProps extends HTMLChakraProps<"div", ArkFlexiblePanel.BodyBaseProps>, UnstyledProp {}

export const FlexiblePanelBody = withContext<HTMLDivElement, FlexiblePanelBodyProps>(ArkFlexiblePanel.Body, "body", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelTitleProps extends HTMLChakraProps<"h2", ArkFlexiblePanel.TitleBaseProps>, UnstyledProp {}

export const FlexiblePanelTitle = withContext<HTMLHeadingElement, FlexiblePanelTitleProps>(
  ArkFlexiblePanel.Title,
  "title",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelControlProps
  extends HTMLChakraProps<"div", ArkFlexiblePanel.ControlBaseProps>,
    UnstyledProp {}

export const FlexiblePanelControl = withContext<HTMLDivElement, FlexiblePanelControlProps>(
  ArkFlexiblePanel.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelResizeTriggerProps
  extends HTMLChakraProps<"button", ArkFlexiblePanel.ResizeTriggerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelResizeTrigger = withContext<HTMLButtonElement, FlexiblePanelResizeTriggerProps>(
  ArkFlexiblePanel.ResizeTrigger,
  "resizeTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelDragTriggerProps
  extends HTMLChakraProps<"button", ArkFlexiblePanel.DragTriggerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelDragTrigger = withContext<HTMLButtonElement, FlexiblePanelDragTriggerProps>(
  ArkFlexiblePanel.DragTrigger,
  "dragTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelStageTriggerProps
  extends HTMLChakraProps<"button", ArkFlexiblePanel.StageTriggerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelStageTrigger = withContext<HTMLButtonElement, FlexiblePanelStageTriggerProps>(
  ArkFlexiblePanel.StageTrigger,
  "stageTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FlexiblePanelCloseTriggerProps
  extends HTMLChakraProps<"button", ArkFlexiblePanel.CloseTriggerBaseProps>,
    UnstyledProp {}

export const FlexiblePanelCloseTrigger = withContext<HTMLButtonElement, FlexiblePanelCloseTriggerProps>(
  ArkFlexiblePanel.CloseTrigger,
  "closeTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////
// Footer slot: not exposed by Ark FloatingPanel (based on your export list),
// so we provide a styled slot wrapper as a plain div.

export interface FlexiblePanelFooterProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const FlexiblePanelFooter = withContext<HTMLDivElement, FlexiblePanelFooterProps>("div", "footer")

////////////////////////////////////////////////////////////////////////////////////
// Context + details re-exports

export const FlexiblePanelContext = ArkFlexiblePanel.Context

export interface FlexiblePanelOpenChangeDetails extends ArkFlexiblePanel.OpenChangeDetails {}
export interface FlexiblePanelPositionChangeDetails extends ArkFlexiblePanel.PositionChangeDetails {}
export interface FlexiblePanelSizeChangeDetails extends ArkFlexiblePanel.SizeChangeDetails {}
export interface FlexiblePanelStageChangeDetails extends ArkFlexiblePanel.StageChangeDetails {}
