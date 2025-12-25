"use client"

import { createSlotRecipeContext } from "@chakra-ui/react"
import { Constants } from "./utils"
import * as Base from "./base"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCollapsibleStyles,
  PropsProvider: BasePropsProvider,
} = createSlotRecipeContext({ key: 'treeView' })

export { useCollapsibleStyles }

////////////////////////////////////////////////////////////////////////////////////
export const PropsProvider = BasePropsProvider

export const RootProvider: any = withProvider(Base.RootProvider, "root", { forwardAsChild: true })

export const Root: any = withProvider(Base.Root, "root", { forwardAsChild: true })

export const Trigger: any = withContext(Base.Trigger, "trigger", { forwardAsChild: true })

export const Content: any = withContext(Base.Content, "content", { forwardAsChild: true })

export const Indicator: any = withContext(Base.Indicator, "indicator", { forwardAsChild: true })

export const Context: any = Base.Context

