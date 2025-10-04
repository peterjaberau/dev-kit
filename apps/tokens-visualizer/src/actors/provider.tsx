"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SYSTEM_ACTOR_ID } from './constants'
import {
  dataSourceMachine,
  searchMachine,
  // appModelMachine,
  // graphModelMachine,
  // graphGridMachine,

} from "./machines"


export const rootMachine = createMachine({
  entry: assign({
    search: ({ spawn }) => spawn(searchMachine, { systemId: SYSTEM_ACTOR_ID.SEARCH }),

    // dataSource: ({ spawn }) => spawn(dataSourceMachine, { systemId: SYSTEM_ACTOR_ID.DATASOURCE }),


    // app: ({ spawn }) => spawn(appModelMachine, { systemId: SYSTEM_ACTOR_ID.APP_MODEL }),
    // graph: ({ spawn }) => spawn(graphModelMachine, { systemId: SYSTEM_ACTOR_ID.GRAPH_MODEL }),
    //
    // graphGrid: ({ spawn }) => spawn(graphGridMachine, { systemId: SYSTEM_ACTOR_ID.GRAPH_GRID }),
  }),
})

export const RootActorContext = createActorContext(rootMachine)

export const RootActorProvider = ({ children }: any) => {
  return <RootActorContext.Provider>{children}</RootActorContext.Provider>
}
