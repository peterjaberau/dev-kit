import { forwardRef } from 'react'
import { AdaptiveTree } from '#adaptive-tree'


export const RootProvider = forwardRef<HTMLDivElement, any>((props, ref) => {
  return <AdaptiveTree.RootProvider data-scope="json-tree" {...props} ref={ref} />
})

