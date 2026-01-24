import { setup, assign, fromPromise } from "xstate"
import { customRandom } from "nanoid"
import safeFetch from "../utilities/safeFetch"
import createFromRawXml from "../utilities/xml/createFromRawXml"
import isXML from "../utilities/xml/isXML"
import { documentStore } from "./json-doc-store"
import { createId, isJSON, isUrl } from "./utils"

export const jsonDocMachine = setup({
  actions: {
    clearError: assign({ error: null }),

    setError: assign({
      error: ({ event }) => event.error ?? new Error("Unknown error"),
    }),

    setDocument: assign({
      document: ({ event }) => event.output,
      lastDeletedSlug: null,
    }),

    setDocumentOrUndefined: assign({
      document: ({ event }) => event.output ?? undefined,
      lastDeletedSlug: null,
    }),

    setDeletedSlug: assign({
      lastDeletedSlug: ({ event }) => event.output.slug,
      document: undefined,
    }),
  },

  actors: {
    createFromInputActor: fromPromise(async ({ input }: any) => {
      const { urlOrJson, title, options } = input

      if (isUrl(urlOrJson)) {
        const url = new URL(urlOrJson)

        if (options?.injest) {
          const response = await safeFetch(url.href)
          if (!response.ok) {
            throw new Error(`Failed to injest ${url.href}`)
          }

          return documentStore.set({
            id: createId(),
            type: "raw",
            contents: await response.text(),
            title: title ?? url.href,
            readOnly: options?.readOnly ?? false,
          })
        }

        return documentStore.set({
          id: createId(),
          type: "url",
          url: url.href,
          title: title ?? url.hostname,
          readOnly: options?.readOnly ?? false,
        })
      }

      if (isJSON(urlOrJson)) {
        JSON.parse(urlOrJson)

        return documentStore.set({
          id: createId(),
          type: "raw",
          contents: urlOrJson,
          title: title ?? "Untitled",
          readOnly: options?.readOnly ?? false,
        })
      }

      if (isXML(urlOrJson)) {
        return createFromRawXml("Untitled", urlOrJson)
      }
    }),

    getDocumentActor: fromPromise(async ({ input }: any) => {
      return documentStore.get(input.slug)
    }),

    updateDocumentActor: fromPromise(async ({ input }: any) => {
      const { slug, title } = input

      return documentStore.update(slug, (doc: any) => ({
        ...doc,
        title,
      }))
    }),

    deleteDocumentActor: fromPromise(async ({ input }: any) => {
      const { slug } = input
      documentStore.remove(slug)
      return { slug }
    }),
  },
}).createMachine({
  id: "documents",
  initial: "idle",

  context: {
    document: undefined,
    error: null,
    lastDeletedSlug: null,
  },

  on: {
    CLEAR_ERROR: { actions: "clearError" },
  },

  states: {
    idle: {
      on: {
        CREATE_FROM_INPUT: {
          target: "creating",
          actions: "clearError",
        },
        GET: {
          target: "fetching",
          actions: "clearError",
        },
        UPDATE_TITLE: {
          target: "updating",
          actions: "clearError",
        },
        DELETE: {
          target: "deleting",
          actions: "clearError",
        },
      },
    },

    creating: {
      invoke: {
        src: "createFromInputActor",
        input: ({ event }) => ({
          urlOrJson: event.input,
          title: event.title,
          options: event.options,
        }),
        onDone: {
          target: "idle",
          actions: "setDocumentOrUndefined",
        },
        onError: {
          target: "idle",
          actions: "setError",
        },
      },
    },

    fetching: {
      invoke: {
        src: "getDocumentActor",
        input: ({ event }) => ({ slug: event.slug }),
        onDone: {
          target: "idle",
          actions: "setDocumentOrUndefined",
        },
        onError: {
          target: "idle",
          actions: "setError",
        },
      },
    },

    updating: {
      invoke: {
        src: "updateDocumentActor",
        input: ({ event }) => ({
          slug: event.slug,
          title: event.title,
        }),
        onDone: {
          target: "idle",
          actions: "setDocumentOrUndefined",
        },
        onError: {
          target: "idle",
          actions: "setError",
        },
      },
    },

    deleting: {
      invoke: {
        src: "deleteDocumentActor",
        input: ({ event }) => ({ slug: event.slug }),
        onDone: {
          target: "idle",
          actions: "setDeletedSlug",
        },
        onError: {
          target: "idle",
          actions: "setError",
        },
      },
    },
  },
})
