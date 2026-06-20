import { classNames } from '../utils/classNames'
import {
  navigationPanelActionIcon,
} from '#likec4/style-preset/recipes'
import { chakra, type RecipeVariantProps, useSlotRecipe } from '@chakra-ui/react'
import {
  type ActionIconProps,
  ActionIcon,
  Breadcrumbs as MantineBreadcrumbs,
  ThemeIcon,
  Tooltip as MantineTooltip,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import type { HTMLMotionProps } from 'motion/react'
import * as m from 'motion/react-m'
import { forwardRef } from 'react'

export const Tooltip = MantineTooltip.withProps({
  color: 'dark',
  fz: 'xs',
  openDelay: 600,
  closeDelay: 120,
  label: '',
  children: null,
  offset: 8,
  withinPortal: false,
})

const ChakraThemeIcon = chakra(ThemeIcon) as any

export const BreadcrumbsSeparator = () => (
  <ChakraThemeIcon
    variant="transparent"
    size={16}
    css={{
      display: {
        base: 'none',
        '@/md': 'flex',
      },
      color: {
        base: 'mantine.colors.gray[5]',
          _dark: 'mantine.colors.dark[3]',
      },
    }}>
    <IconChevronRight />
  </ChakraThemeIcon>
)

export const Breadcrumbs = MantineBreadcrumbs.withProps({
  separator: <BreadcrumbsSeparator />,
  separatorMargin: 4,
})

export type PanelActionIconProps =
  & Partial<RecipeVariantProps<typeof navigationPanelActionIcon>>
  & Omit<ActionIconProps, keyof RecipeVariantProps<typeof navigationPanelActionIcon>>
  & Omit<HTMLMotionProps<'button'>, keyof RecipeVariantProps<typeof navigationPanelActionIcon>>

const ChakraActionIcon = chakra(ActionIcon) as any

export const PanelActionIcon = forwardRef<HTMLButtonElement, PanelActionIconProps>(({
  variant = 'default',
  className,
  disabled = false,
  type,
  ...others
}, ref) => {
  const actionIconRecipe = useSlotRecipe({ recipe: navigationPanelActionIcon })
  const actionIconStyles = actionIconRecipe({ variant, type })

  return (
    <ChakraActionIcon
      size="md"
      variant="transparent"
      radius="sm"
      component={m.button}
      {...!disabled && {
        whileHover: {
          scale: 1.085,
        },
        whileTap: {
          scale: 1,
          translateY: 1,
        },
      }}
      disabled={disabled}
      {...others}
      className={classNames(className)}
      css={actionIconStyles.root}
      ref={ref} />
  )
})
