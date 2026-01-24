import { forwardRef } from "react"
import { AppProvider } from "./provider.app"

const AppImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, ...rest } = props

  return (
    <AppProvider {...rest} ref={ref}>
      {children}
    </AppProvider>
  )
}

export const App = forwardRef(AppImpl)
