import { createActorContext, useSelector } from "@xstate/react"
import { assign, enqueueActions, setup } from "xstate"
import { rootMachine } from "./actor.root"
import { dataStoreMachine } from "./actor.data-store"
import { pluginsMachine } from './actor.plugins'

export const systemMachine = setup({
  actions: {
    spawnRoot: assign(({ context, spawn, self }) => {
      spawn("rootMachine", {
        id: "root",
        systemId: "root",
        input: {
          refs: {
            parent: self,
          },
          config: {},
          runtime: {},
        },
      })
    }),
    spawnDataStore: assign(({ context, spawn, self }) => {
      spawn("dataStoreMachine", {
        id: "data-store",
        systemId: "data-store",
        input: {
          refs: {
            parent: self,
          },
          config: {},
          runtime: {},
        },
      })
    }),
    spawnPlugins: assign(({ context, spawn, self }) => {
      spawn("pluginsMachine", {
        id: "plugins",
        systemId: "plugins",
        input: {
          refs: {
            parent: self,
          },
          config: {},
          runtime: {},
        },
      })
    }),
  },
  actors: {
    rootMachine,
    dataStoreMachine,
    pluginsMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      refs: {
        parent: null,
      },
      data: input?.data || null,
      config: {},
      runtime: {},
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnRoot")
    enqueue("spawnDataStore")
    enqueue("spawnPlugins")
  }),
})


export const SystemContext = createActorContext(systemMachine)

export const SystemProvider = (props: any) => {
  const { children, data,  ...rest } = props
  return (
    <SystemContext.Provider
      options={{
        input: {
          data: data,
          ...rest,
        },
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}



export function useSystemActor() {
  const systemRef = SystemContext.useActorRef()
  const sendToSystem = systemRef.send
  const systemId = systemRef?.id

  const systemState: any = useSelector(systemRef, (state) => state)
  const systemContext = systemState.context

  const childrenNames = Object.keys(systemState?.children || [])

  const rootRef = systemState?.children['root']
  const dataStoreRef = systemState?.children["data-store"]
  const pluginsRef = systemState?.children["plugins"]


  return {

    systemRef,
    sendToSystem,
    systemId,

    systemState,
    systemContext,

    childrenNames,

    rootRef,
    dataStoreRef,
    pluginsRef,

  }
}
