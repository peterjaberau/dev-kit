import { forwardRef } from "react"
import { MenuProvider } from "./menu-provider"
import { useMenu } from "./use-menu"

const MenuImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
  const { children, input, ...rest } = props

  return (
    <MenuProvider>
      <div ref={ref} {...rest}>
        {children}
      </div>
    </MenuProvider>
  )
}

export const Root = forwardRef(MenuImpl)
