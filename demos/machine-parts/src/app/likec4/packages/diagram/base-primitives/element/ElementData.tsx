import type { ComputedNodeStyle, MarkdownOrString, NodeId } from '#likec4/core'
import type { ColorLiteral, LikeC4Styles } from '#likec4/core/styles'
import { type Color, RichText } from '#likec4/core/types'
import { classNames } from '../../utils/classNames'
import { elementNodeData } from '#likec4/style-preset/recipes'
import { Box, chakra, useSlotRecipe } from '@chakra-ui/react'
import {
  type CSSProperties,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from 'react'
import { isTruthy } from 'remeda'
import type { MergeExclusive } from 'type-fest'
import { IconRenderer } from '../../context/IconRenderer'
import { useLikeC4Styles } from '../../hooks/useLikeC4Styles'
import { Markdown } from '../Markdown'

const RootDiv = chakra('div')
const SlotDiv = chakra('div')

type RequiredData = {
  id: NodeId
  title: string
  technology?: string | null | undefined
  color: Color
  style: ComputedNodeStyle
  description?: MarkdownOrString | null | undefined
  icon?: string | null
}

export type ElementDataProps = {
  data: RequiredData
}

type RootProps = HTMLAttributes<HTMLDivElement> & ElementDataProps

/**
 * Resolve the icon color based on the node's style and color.
 *
 * If the node's style icon color is not defined, returns undefined.
 * If the node's style icon color is the same as the node's color, returns the stroke color.
 * Otherwise, returns the fill color.
 */
const resolveIconColor = (styles: LikeC4Styles, data: RequiredData): ColorLiteral | undefined => {
  const iconColor = data.style.iconColor
  if (!iconColor) {
    return undefined
  }
  const colors = styles.colors(iconColor).elements
  return iconColor === data.color ? colors.stroke : colors.fill
}

const Root = forwardRef<
  HTMLDivElement,
  RootProps
>((
  {
    className,
    style,
    data,
    ...props
  },
  ref,
) => {
  const styles = useLikeC4Styles()
  const iconSize = data.style.iconSize
    ? styles.nodeSizes(data.style).values.iconSize
    : undefined
  const resolvedIconColor = resolveIconColor(styles, data)
  const elementNodeDataRecipe = useSlotRecipe({ recipe: elementNodeData })
  const elementNodeDataStyles = elementNodeDataRecipe({
    iconPosition: data.style.iconPosition,
    withIconColor: !!resolvedIconColor,
  })
  return (
    <RootDiv
      {...props}
      ref={ref}
      className={classNames(
        className,
        'likec4-element',
      )}
      css={elementNodeDataStyles.root}
      style={{
        ...style,
        ...(iconSize && {
          // @ts-ignore
          '--likec4-icon-size': `${iconSize}px`,
        }),
        ...(resolvedIconColor && {
          // @ts-ignore
          '--likec4-icon-color': resolvedIconColor,
        }),
      }}
    />
  )
})

type IconProps = {
  data: {
    id: string
    title: string
    icon?: string | null | undefined
  }
  className?: string
  style?: CSSProperties
}

const Icon = ({ data, className, ...props }: IconProps) => {
  const elementNodeDataRecipe = useSlotRecipe({ recipe: elementNodeData })
  const elementNodeDataStyles = elementNodeDataRecipe()
  return (
    <Box css={elementNodeDataStyles.icon} className={className}>
      <IconRenderer element={data} {...props} />
    </Box>
  )
}

const Content = forwardRef<HTMLDivElement, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <SlotDiv
    {...props}
    css={useSlotRecipe({ recipe: elementNodeData })().content}
    className={classNames(
      className,
      'likec4-element-node-content',
    )}
    ref={ref}
  />
))

type SlotProps = {
  data: RequiredData
  className?: string
  style?: CSSProperties
  [key: `data-${string}`]: string
}

const Title = forwardRef<HTMLDivElement, SlotProps>((
  { data: { title }, className, ...props },
  ref,
) => {
  return (
    <SlotDiv
      {...props}
      css={useSlotRecipe({ recipe: elementNodeData })().title}
      className={classNames(
        className,
        'likec4-element-title',
      )}
      data-likec4-node-title=""
      ref={ref}
    >
      {title}
    </SlotDiv>
  )
})

const Technology = forwardRef<HTMLDivElement, MergeExclusive<SlotProps, PropsWithChildren>>((
  { data, children, className, ...props },
  ref,
) => {
  const text = data?.technology ?? children
  return isTruthy(text)
    ? (
      <SlotDiv
        {...props}
        css={useSlotRecipe({ recipe: elementNodeData })().technology}
        className={classNames(
          className,
          'likec4-element-technology',
        )}
        data-likec4-node-technology=""
        ref={ref}
      >
        {text}
      </SlotDiv>
    )
    : null
})

const Description = forwardRef<
  HTMLDivElement,
  SlotProps
>((
  { data: { description }, className, ...props },
  ref,
) => {
  if (!description) {
    return null
  }
  const desc = RichText.from(description)
  return (
    <Markdown
      {...props}
      css={useSlotRecipe({ recipe: elementNodeData })().description}
      className={classNames(
        className,
        'likec4-element-description',
      )}
      data-likec4-node-description=""
      value={desc}
      uselikec4palette
      hideIfEmpty
      style={{
        // Workaround for lineClamp not working with nested TABLE elements (if markdown has tables)
        maxHeight: desc.isMarkdown ? '8rem' : undefined,
      }}
      ref={ref}
    />
  )
})

/**
 * Renders an element title, technology, description, and icon.
 *
 * @example
 * ```tsx
 * <ElementData {...nodeProps} />
 * ```
 * or
 * ```tsx
 * <ElementData.Root {...nodeProps} >
 *   <ElementData.Icon {...nodeProps} />
 *   <ElementData.Content>
 *     <ElementData.Title {...nodeProps} />
 *     <ElementData.Technology {...nodeProps} />
 *     <ElementData.Description {...nodeProps} />
 *   </ElementData.Content>
 * </ElementData.Root>
 * ```
 */
export function ElementData({ data }: ElementDataProps) {
  return (
    <Root data={data}>
      <Icon data={data} />
      <Content>
        <Title data={data} />
        <Technology data={data} />
        <Description data={data} />
      </Content>
    </Root>
  )
}
ElementData.Root = Root
ElementData.Icon = Icon
ElementData.Content = Content
ElementData.Title = Title
ElementData.Technology = Technology
ElementData.Description = Description
