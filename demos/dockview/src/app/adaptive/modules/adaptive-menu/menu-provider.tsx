import React from "react"
import { createActorContext, useSelector } from "@xstate/react"
import { menuMachine } from "./machines"

export const MenuContext = createActorContext(menuMachine)


export const MenuProvider = (props: any) => {
  const { children, data, view, ...rest } = props
  return (
    <MenuContext.Provider
      options={{
        input: {
          data: data,
          view: view,
          ...rest
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}



