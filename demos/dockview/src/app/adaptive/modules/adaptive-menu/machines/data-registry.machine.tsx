// @ts-nocheck

import { assign, enqueueActions, setup } from "xstate"

export const scopeRegistry: any = {
  project: {
    match: { kind: "project" },
    belongsTo: "projects",
  },
  filter: {
    match: { kind: "filter" },
    belongsTo: "filters",
  },
  "top-level": {
    match: { kind: "top-level" },
    belongsTo: "root",
  },
}

function matches(data, match) {
  return Object.entries(match).every(([key, value]) => data?.[key] === value)
}

export const dataRegistryMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,

  actions: {
    storeRequest: assign(({ context, event }: any) => ({
      ...context,
      lastRequest: event.data,
    })),

    resolveScope: assign(({ context }: any) => {
      const data = context.lastRequest
      if (!data) return context

      const updatedScopes = Object.entries(context.registry).reduce((acc: any, [scopeName, config]: any) => {
        const matched = matches(data, config.match)

        acc[scopeName] = {
          ...context.scopes[scopeName],
          lastResult: matched
            ? {
                matched: true,
                belongsTo: config.belongsTo,
                data,
              }
            : {
                matched: false,
              },
        }

        return acc
      }, {})

      return {
        ...context,
        scopes: updatedScopes,
      }
    }),
  },

  guards: {},
}).createMachine({
  id: "scope-registry",
  initial: "idle",

  context: ({ input }: any) => ({
    registry: scopeRegistry,
    lastRequest: null,
    scopes: Object.keys(scopeRegistry).reduce((acc: any, key: any) => {
      acc[key] = {
        config: scopeRegistry[key],
        lastResult: null,
      }
      return acc
    }, {}),
  }),

  states: {
    idle: {
      on: {
        RESOLVE: {
          target: "resolving",
          actions: "storeRequest",
        },
      },
    },

    resolving: {
      always: {
        target: "idle",
        actions: "resolveScope",
      },
    },
  },
})

// Journey of a request through the registry machine

// Input to the machine
const registryInput = {
  project: {
    match: { kind: "project" },
    belongsTo: "projects",
  },
  filter: {
    match: { kind: "filter" },
    belongsTo: "filters",
  },
}

// Initial context of the machine
const initialContext = {
  registry: {
    project: {
      match: { kind: "project" },
      belongsTo: "projects",
    },
    filter: {
      match: { kind: "filter" },
      belongsTo: "filters",
    },
  },
  lastRequest: null,
  scopes: {
    project: {
      config: {
        match: { kind: "project" },
        belongsTo: "projects",
      },
      lastResult: null,
    },
    filter: {
      config: {
        match: { kind: "filter" },
        belongsTo: "filters",
      },
      lastResult: null,
    },
  },
}

//First example

// Action storeRequest is called with event data
const storeReqeuestEvent1 = {
  type: "RESOLVE",
  data: {
    id: "p1",
    kind: "project",
    meta: {
      groupName: "Group A",
    },
  },
}
const contextAfterStoreRequest1 = {
  lastRequest: {
    id: "p1",
    kind: "project",
    meta: {
      groupName: "Group A",
    },
  },
}

// Action resolveScope processes
const inputData1 = {
  id: "p1",
  kind: "project",
  meta: {
    groupName: "Group A",
  },
}
const contextAfterResolveScope1 = {
  lastRequest: {
    id: "p1",
    kind: "project",
    meta: {
      groupName: "Group A",
    },
  },
  scopes: {
    project: {
      config: {
        match: { kind: "project" },
        belongsTo: "projects",
      },
      lastResult: {
        matched: true,
        belongsTo: "projects",
        data: {
          id: "p1",
          kind: "project",
          meta: {
            groupName: "Group A",
          },
        },
      },
    },
    filter: {
      config: {
        match: { kind: "filter" },
        belongsTo: "filters",
      },
      lastResult: {
        matched: false,
      },
    },
  },
}

// Second example Filter Request
const storeReqeuestEvent2 = {
  type: "RESOLVE",
  data: {
    id: "f9",
    kind: "filter",
  },
}
const contextAfterStoreRequest2 = {
  lastRequest: {
    id: "f9",
    kind: "filter",
  },
  scopes: {
    project: {
      lastResult: {
        matched: false,
      },
    },
    filter: {
      lastResult: {
        matched: true,
        belongsTo: "filters",
        data: {
          id: "f9",
          kind: "filter",
        },
      },
    },
  },
}

// third example unkown scope
const storeReqeuestEvent3 = {
  type: "RESOLVE",
  data: {
    id: "x1",
    kind: "unknown",
  },
}

const contextAfterStoreRequest3 = {
  lastRequest: {
    id: "x1",
    kind: "unknown",
  },
  scopes: {
    project: {
      lastResult: {
        matched: false,
      },
    },
    filter: {
      lastResult: {
        matched: false,
      },
    },
  },
}
