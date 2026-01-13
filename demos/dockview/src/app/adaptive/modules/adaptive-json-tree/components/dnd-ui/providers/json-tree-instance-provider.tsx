import React from "react"
import { createActorContext, useSelector } from "@xstate/react"
import { nodeInstanceMachine as instanceMachine } from "../machines"

export const JsonTreeInstanceContext = createActorContext(instanceMachine)


export const JsonTreeInstanceProvider = (props: any) => {
  const { children, ...rest } = props
  return (
    <JsonTreeInstanceContext.Provider
      options={{
        input: { ...rest },
      }}
    >
      {children}
    </JsonTreeInstanceContext.Provider>
  )
}



