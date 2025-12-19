import { assign, enqueueActions, setup } from "xstate"
import { data as oasDatasets } from "#modules/oas/data/datasets"
import { OAS_OPEN_API_SPECS_DATASET } from "#datasets/data"
import { data as METADATA } from "#datasets/metadata"

import { createInstanceOAS } from "#modules/dockview/actors/lib/handlers/oas/create-instance-oas"
import { dereferenceOas } from "#modules/dockview/actors/lib/handlers/oas/dereference-oas"

export const oasManagerMachine = setup({
  actions: {
    loadDatasets: assign(({ context, event }: any, params: any) => {
      context.datasets.apiSpecification = oasDatasets
    }),

    syncMetadata: assign(({ context, event }: any, params: any) => {
      context.metadata.datasets.apiSpecification.list = Object.keys(context.datasets.apiSpecification)
    }),

    selectDefaultDataset: assign(({ context, event }: any, params: any) => {
      const defaultDataset = context.datasets.apiSpecification[context.defaultConfig.datasetName]
      context.selected.dataset = {
        name: context.defaultConfig.datasetName,
        displayName: defaultDataset?.info?.title || context.defaultConfig.datasetName,
        data: defaultDataset,
      }
    }),

    selectDataset: assign(({ context, event }: any, params: any) => {
      const { datasetName } = event.payload
      const selectedDataset = context.datasets.apiSpecification[datasetName]

      context.selected.dataset = {
        name: datasetName,
        displayName: selectedDataset?.info?.title || datasetName,
        data: selectedDataset,
      }
    }),

    syncRuntimeOAS: assign(({ context, event }: any, params: any) => {
      const { oas } = params
      context.runtime.oas.instance = oas
    }),
  },
  actors: {
    createInstanceOAS,
    dereferenceOas,
  },
}).createMachine({
  initial: "loading",
  context: ({ input, self }: any) => {
    return {
      internalRefs: {
        parent: self,
      },
      defaultConfig: {
        datasetName: "petstore-ref-quirks",
      },
      metadata: {
        OAS_OPEN_API_SPECS: METADATA.data.OAS_OPEN_API_SPECS,
        OAS_METHODS: METADATA.data.OAS_METHODS,

        oas: {
          methods: {
            definitions: {
              general: {
                dereference: {},
                getCircularReferences: {},
                getDefinition: {},
                getTags: {},
                getPaths: {},
                getVersion: {},
                getWebhooks: {},
                init: {},
              },
              operations: {
                findOperation: {},
                findOperationWithoutMethod: {},
                getOperation: {},
                getOperationById: {},
                operation: {},
              },
              servers: {
                defaultVariables: {},
                replaceUrl: {},
                splitUrl: {},
                splitVariables: {},
                url: {},
                variables: {},
              },
              extensions: {
                getExtension: {},
                hasExtension: {},
                validateExtension: {},
                validateExtensions: {},
              },
              userAuth: {
                getAuth: {},
              },
            },
            operations: {
              general: {},
              callbacks: {},
              parameters: {},
              requestBody: {},
              responses: {},
              security: {},
              extensions: {},
            },
            callbacks: {
              getIdentifier: {},
            },
            utils: {
              analyzer: {
                analyzer: {},
              },
              general: {
                dereferencedFileSize: {},
                mediaTypes: {},
                operationTotal: {},
                rawFileSize: {},
                securityTypes: {},
              },
              features: {
                additionalProperties: {},
                callbacks: {},
                circularRefs: {},
                commonParameters: {},
                discriminators: {},
                links: {},
                style: {},
                polymorphism: {},
                serverVariables: {},
                webhooks: {},
                xml: {},
              },
              reducer: {
                reducer: {},
              },
            },
          },
        },
        datasets: {
          oasMethodCategories: {
            info: {},
            data: [
              {
                label: "Definitions",
                value: "definitions",
              },
              {
                label: "Operations",
                value: "operations",
              },
              {
                label: "Callbacks",
                value: "callbacks",
              },
              {
                label: "Utils",
                value: "utils",
              },
            ],
          },
          apiSpecification: {
            profile: {},
            list: [],
          },
        },
      },
      datasets: {
        OAS_OPEN_API_SPECS: OAS_OPEN_API_SPECS_DATASET.data,
        apiSpecification: oasDatasets,
      },
      runtime: {
        oas: {
          instance: null,
        },
      },
      selected: {
        dataset: {
          data: null,
          type: "API_SPECIFICATION",
          name: null,
          displayName: null,
        },
        method: {
          profile: {
            name: null,
            displayName: null,
          },
          request: {},
          response: {},
        },
      },
      ...input,
    }
  },

  states: {
    loading: {
      entry: enqueueActions(({ enqueue, context, event }) => {
        /**
         * 1 -load datasets
         * 2- generate datasets metadata
         * 3- select dataset automatically based on defaultConfig
         * 5- create oas instance for the selected dataset
         */
        enqueue("loadDatasets")
        enqueue("syncMetadata")
        enqueue("selectDefaultDataset")
      }),
      invoke: {
        src: "createInstanceOAS",
        input: ({ context }: any) => ({ dataset: context?.selected?.dataset?.data }),
        onDone: {
          target: "ready",
          actions: [
            {
              type: "syncRuntimeOAS",
              params: ({ event }: any) => {
                return {
                  oas: event.output,
                }
              },
            },
          ],
        },
        onError: {
          target: "ready",
        },
      },
    },

    ready: {
      on: {
        "select.dataset": { actions: ["selectDataset"] },
      },
    },
  },
})

const data = [
  {
    "id": "definitions",
    "name": "Definitions",
    "children": []
  },
  {
    "id": "operations",
    "name": "Operations",
    "children": []
  },
  {
    "id": "callbacks",
    "name": "Callbacks",
    "children": []
  },
  {
    "id": "utils",
    "name": "Utils",
    "children": []
  }
]
