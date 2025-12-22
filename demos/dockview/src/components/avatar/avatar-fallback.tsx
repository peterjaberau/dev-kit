import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useAvatarContext } from './use-avatar-context'


export const AvatarFallback = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getFallbackProps(), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
