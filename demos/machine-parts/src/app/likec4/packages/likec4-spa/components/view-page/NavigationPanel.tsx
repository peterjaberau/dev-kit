import { navigationPanel } from '#likec4/style-preset/slot-recipes'
import { createSlotRecipeContext, defaultSystem } from '@chakra-ui/react'
import { type ForwardRefComponent, type HTMLMotionProps, isValidMotionProp } from 'motion/react'
import * as m from 'motion/react-m'

const { withProvider, withContext } = createSlotRecipeContext({
  recipe: navigationPanel,
})

const shouldForwardProp = (prop: string, variantKeys: string[]): boolean =>
  !variantKeys.includes(prop) && (isValidMotionProp(prop) || !defaultSystem.isValidProperty(prop))

const Root = withProvider(m.div as ForwardRefComponent<'div', HTMLMotionProps<'div'>>, 'root', {
  shouldForwardProp,
}) as any
const Body = withContext(m.div as ForwardRefComponent<'div', HTMLMotionProps<'div'>>, 'body', {
  shouldForwardProp,
}) as any

const Label = withContext(m.div as ForwardRefComponent<'div', HTMLMotionProps<'div'>>, 'label', {
  shouldForwardProp,
}) as any
const Dropdown = withContext(m.div as ForwardRefComponent<'div', HTMLMotionProps<'div'>>, 'dropdown', {
  shouldForwardProp,
}) as any

export const NavigationPanel = {
  Root,
  Body,
  Label,
  Dropdown,
}
