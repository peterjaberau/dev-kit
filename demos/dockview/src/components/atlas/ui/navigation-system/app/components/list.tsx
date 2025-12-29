import { forwardRef, type ReactNode, type Ref } from "react"
import { token } from "#atlas-ui/primitives/css"
import { chakra } from "@chakra-ui/react"

export type ListProps = {
  children: ReactNode
  testId?: string
  css?: any
}

function _List({ children, testId, css }: ListProps, forwardedRef: Ref<HTMLDivElement>) {
  return (
    <chakra.div role="list" ref={forwardedRef} css={css}>
      {children}
    </chakra.div>
  )
}

export const List: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ListProps> & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ListProps>(_List)
