import { forwardRef } from "react"
import { PlaygroundProvider } from "../engine"

const RootImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, ...rest } = props

  return (
    <PlaygroundProvider {...rest} ref={ref}>
      {children}
    </PlaygroundProvider>
  )
}

export const Root = forwardRef(RootImpl)
