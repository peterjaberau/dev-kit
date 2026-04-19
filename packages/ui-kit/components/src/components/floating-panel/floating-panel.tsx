"use client"

import type { Assign } from "@ark-ui/react"
import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react/floating-panel"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "@chakra-ui/react"

////////////////////////////////////////////////////////////////////////////////////
import { floatingPanelStyles } from "./recipe"
const {
  withProvider,
  withContext,
  useStyles: useFloatingPlanelStyles,
  PropsProvider,
} = createSlotRecipeContext({ recipe: floatingPanelStyles })

export { useFloatingPlanelStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelRootProviderBaseProps
  extends Assign<ArkFloatingPanel.RootProviderBaseProps, SlotRecipeProps<"floating-panel">>,
    UnstyledProp {}

export interface FloatingPanelRootProviderProps extends HTMLChakraProps<"div", FloatingPanelRootProviderBaseProps> {}

export const FloatingPanelRootProvider = withProvider<HTMLDivElement, FloatingPanelRootProviderProps>(
  ArkFloatingPanel.RootProvider,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelRootBaseProps
  extends Assign<ArkFloatingPanel.RootBaseProps, SlotRecipeProps<"floating-panel">>,
    UnstyledProp {}

export interface FloatingPanelRootProps extends HTMLChakraProps<"div", FloatingPanelRootBaseProps> {}

export const FloatingPanelRoot = withProvider<HTMLDivElement, FloatingPanelRootProps>(ArkFloatingPanel.Root, "root", {
  forwardAsChild: true,
})

export const FloatingPanelPropsProvider = PropsProvider as React.Provider<FloatingPanelRootBaseProps>

export interface FloatingPanelPositionerProps
  extends HTMLChakraProps<"div", ArkFloatingPanel.PositionerBaseProps>,
    UnstyledProp {}

export const FloatingPanelPositioner = withContext<HTMLDivElement, FloatingPanelPositionerProps>(
  ArkFloatingPanel.Positioner,
  "positioner",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelTriggerProps
  extends HTMLChakraProps<"button", ArkFloatingPanel.TriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelTrigger = withContext<HTMLButtonElement, FloatingPanelTriggerProps>(
  ArkFloatingPanel.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelContentProps
  extends HTMLChakraProps<"div", ArkFloatingPanel.ContentBaseProps>,
    UnstyledProp {}

export const FloatingPanelContent = withContext<HTMLDivElement, FloatingPanelContentProps>(
  ArkFloatingPanel.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelHeaderProps
  extends HTMLChakraProps<"div", ArkFloatingPanel.HeaderBaseProps>,
    UnstyledProp {}

export const FloatingPanelHeader = withContext<HTMLDivElement, FloatingPanelHeaderProps>(
  ArkFloatingPanel.Header,
  "header",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelBodyProps extends HTMLChakraProps<"div", ArkFloatingPanel.BodyBaseProps>, UnstyledProp {}

export const FloatingPanelBody = withContext<HTMLDivElement, FloatingPanelBodyProps>(ArkFloatingPanel.Body, "body", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelTitleProps extends HTMLChakraProps<"h2", ArkFloatingPanel.TitleBaseProps>, UnstyledProp {}

export const FloatingPanelTitle = withContext<HTMLHeadingElement, FloatingPanelTitleProps>(
  ArkFloatingPanel.Title,
  "title",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelControlProps
  extends HTMLChakraProps<"div", ArkFloatingPanel.ControlBaseProps>,
    UnstyledProp {}

export const FloatingPanelControl = withContext<HTMLDivElement, FloatingPanelControlProps>(
  ArkFloatingPanel.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelResizeTriggerProps
  extends HTMLChakraProps<"button", ArkFloatingPanel.ResizeTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelResizeTrigger = withContext<HTMLButtonElement, FloatingPanelResizeTriggerProps>(
  ArkFloatingPanel.ResizeTrigger,
  "resizeTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelDragTriggerProps
  extends HTMLChakraProps<"button", ArkFloatingPanel.DragTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelDragTrigger = withContext<HTMLButtonElement, FloatingPanelDragTriggerProps>(
  ArkFloatingPanel.DragTrigger,
  "dragTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelStageTriggerProps
  extends HTMLChakraProps<"button", ArkFloatingPanel.StageTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelStageTrigger = withContext<HTMLButtonElement, FloatingPanelStageTriggerProps>(
  ArkFloatingPanel.StageTrigger,
  "stageTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelCloseTriggerProps
  extends HTMLChakraProps<"button", ArkFloatingPanel.CloseTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelCloseTrigger = withContext<HTMLButtonElement, FloatingPanelCloseTriggerProps>(
  ArkFloatingPanel.CloseTrigger,
  "closeTrigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////
// Footer slot: not exposed by Ark FloatingPanel (based on your export list),
// so we provide a styled slot wrapper as a plain div.

export interface FloatingPanelFooterProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const FloatingPanelFooter = withContext<HTMLDivElement, FloatingPanelFooterProps>("div", "footer")

////////////////////////////////////////////////////////////////////////////////////
// Context + details re-exports

export const FloatingPanelContext = ArkFloatingPanel.Context

export interface FloatingPanelOpenChangeDetails extends ArkFloatingPanel.OpenChangeDetails {}
export interface FloatingPanelPositionChangeDetails extends ArkFloatingPanel.PositionChangeDetails {}
export interface FloatingPanelSizeChangeDetails extends ArkFloatingPanel.SizeChangeDetails {}
export interface FloatingPanelStageChangeDetails extends ArkFloatingPanel.StageChangeDetails {}
