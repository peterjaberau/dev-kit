import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'
import { useAvatarContext } from './use-avatar-context'


export const AvatarImage = forwardRef<HTMLImageElement, any>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getImageProps(), props)

  return <chakra.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
