import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from './utils/create-split-props'
import { chakra } from '@chakra-ui/react'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

const splitRootProps = createSplitProps()

export const AvatarRoot = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [useAvatarProps, localProps] = splitRootProps(props, ['id', 'ids', 'onStatusChange'])
  const avatar = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(avatar.getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <chakra.div {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

AvatarRoot.displayName = 'AvatarRoot'
