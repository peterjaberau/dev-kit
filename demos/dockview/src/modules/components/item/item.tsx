"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "@chakra-ui/react"
import { itemSlotRecipe } from "./recipe"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useItemStyles,
  PropsProvider,
} = createSlotRecipeContext({
  recipe: itemSlotRecipe,
})

export { useItemStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ItemRootBaseProps extends SlotRecipeProps<"item">, UnstyledProp {}

export interface ItemRootProps extends HTMLChakraProps<"div", ItemRootBaseProps> {}

export const ItemRoot = withProvider<HTMLDivElement, ItemRootProps>("div", "root")

////////////////////////////////////////////////////////////////////////////////////

export const ItemPropsProvider = PropsProvider as React.Provider<ItemRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ItemMediaProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemMedia = withContext<HTMLDivElement, ItemMediaProps>("div", "media")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemContentProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemContent = withContext<HTMLDivElement, ItemContentProps>("div", "content")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemTitleProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemTitle = withContext<HTMLDivElement, ItemTitleProps>("div", "title")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemDescriptionProps extends HTMLChakraProps<"p">, UnstyledProp {}

export const ItemDescription = withContext<HTMLParagraphElement, ItemDescriptionProps>("p", "description")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemActionsProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemActions = withContext<HTMLDivElement, ItemActionsProps>("div", "actions")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemHeaderProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemHeader = withContext<HTMLDivElement, ItemHeaderProps>("div", "header")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemFooterProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemFooter = withContext<HTMLDivElement, ItemFooterProps>("div", "footer")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemGroupProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemGroup = withContext<HTMLDivElement, ItemGroupProps>("div", "group")

////////////////////////////////////////////////////////////////////////////////////

export interface ItemSeparatorProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const ItemSeparator = withContext<HTMLDivElement, ItemSeparatorProps>("div", "separator")
