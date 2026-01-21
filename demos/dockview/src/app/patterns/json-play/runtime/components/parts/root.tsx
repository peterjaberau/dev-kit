import { forwardRef } from "react"
import { JsonProvider } from "#json-play/runtime/actors"



const JsonRootImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, ...rest } = props

  return (
    <JsonProvider {...rest} ref={ref}>
      {children}
    </JsonProvider>
  )
}

export const Root = forwardRef(JsonRootImpl)
