import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from './utils/create-split-props'
import { chakra } from '@chakra-ui/react'
import { AvatarProvider } from './use-avatar-context'



const splitRootProviderProps = createSplitProps()

export const AvatarRootProvider = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [{ value: avatar }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(avatar.getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <chakra.div {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

AvatarRootProvider.displayName = 'AvatarRootProvider'
