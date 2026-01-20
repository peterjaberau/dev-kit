import { forwardRef } from "react"
import { JsonProvider } from "./actors"



const JsonRootImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, ...rest } = props

  return (
    <JsonProvider {...rest}>
      <div ref={ref}>{children}</div>
    </JsonProvider>
  )
}

export const Root = forwardRef(JsonRootImpl)
