import { assign, enqueueActions, setup } from "xstate"
import { createInstanceOAS } from "#modules/dockview/actors/lib/handlers/oas/create-instance-oas"
import { dereferenceOas } from "#modules/dockview/actors/lib/handlers/oas/dereference-oas"

export const oasMachine = setup({
  actions: {
    setOasInstance: assign(({ context, event }: any, params: any) => {
      const { oas } = params

      context.instance.oas = oas
    }),

    oas_deference: assign(({ context, event }: any, params: any) => {
      context.instance.oas.dereference();
    }),
    oas_getCircularReferences: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getCircularReferences()
      context.executionCache.getCircularReferences = result

    }),
    oas_getDefinition: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getDefinition()
      context.executionCache.getDefinition = result
    }),
    oas_getTags: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getTags()
      context.executionCache.getTags = result
    }),
    oas_getPaths: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getPaths()
      context.executionCache.getPaths = result
    }),
    oas_getVersion: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getVersion()
      context.executionCache.getVersion = result
    }),
    oas_getWebhooks: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.getWebhooks()
      context.executionCache.getWebhooks = result
    }),
    oas_init: assign(({ context, event }: any, params: any) => {}),

    oas_findOperation: assign(({ context, event }: any, params: any) => {}),
    oas_findOperationWithoutMethod: assign(({ context, event }: any, params: any) => {}),
    oas_getOperation: assign(({ context, event }: any, params: any) => {}),
    oas_getOperationById: assign(({ context, event }: any, params: any) => {}),
    oas_operation: assign(({ context, event }: any, params: any) => {}),

    oas_defaultVariables: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.defaultVariables()
      context.executionCache.defaultVariables = result
    }),
    oas_replaceUrl: assign(({ context, event }: any, params: any) => {}),
    oas_splitUrl: assign(({ context, event }: any, params: any) => {}),
    oas_splitVariables: assign(({ context, event }: any, params: any) => {}),
    oas_url: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.url()
      context.executionCache.url = result
    }),
    oas_variables: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.variables()
      context.executionCache.variables = result
    }),

    oas_getExtension: assign(({ context, event }: any, params: any) => {}),
    oas_hasExtension: assign(({ context, event }: any, params: any) => {}),
    oas_validateExtension: assign(({ context, event }: any, params: any) => {}),
    oas_validateExtensions: assign(({ context, event }: any, params: any) => {}),

    oas_getAuth: assign(({ context, event }: any, params: any) => {}),

    oas_getContentType: assign(({ context, event }: any, params: any) => {

    }),
    oas_getDescription: assign(({ context, event }: any, params: any) => {}),
    oas_getOperationId: assign(({ context, event }: any, params: any) => {}),
    oas_hasOperationId: assign(({ context, event }: any, params: any) => {}),
    oas_isDeprecated: assign(({ context, event }: any, params: any) => {}),
    oas_isFormUrlEncoded: assign(({ context, event }: any, params: any) => {}),
    oas_isJson: assign(({ context, event }: any, params: any) => {}),
    oas_isMultipart: assign(({ context, event }: any, params: any) => {}),
    oas_isXml: assign(({ context, event }: any, params: any) => {}),
    oas_isWebhook: assign(({ context, event }: any, params: any) => {}),
    oas_getExampleGroups: assign(({ context, event }: any, params: any) => {}),
    oas_getHeaders: assign(({ context, event }: any, params: any) => {}),
    oas_getSummary: assign(({ context, event }: any, params: any) => {}),

    oas_getCallback: assign(({ context, event }: any, params: any) => {}),
    oas_getCallbackExamples: assign(({ context, event }: any, params: any) => {}),
    oas_getCallbacks: assign(({ context, event }: any, params: any) => {}),
    oas_hasCallbacks: assign(({ context, event }: any, params: any) => {}),

    oas_getParameters: assign(({ context, event }: any, params: any) => {}),
    oas_getParametersAsJSONSchema: assign(({ context, event }: any, params: any) => {}),
    oas_hasParameters: assign(({ context, event }: any, params: any) => {}),
    oas_hasRequiredParameters: assign(({ context, event }: any, params: any) => {}),

    oas_getRequestBody: assign(({ context, event }: any, params: any) => {}),
    oas_getRequestBodyExamples: assign(({ context, event }: any, params: any) => {}),
    oas_getRequestBodyMediaTypes: assign(({ context, event }: any, params: any) => {}),
    oas_hasRequestBody: assign(({ context, event }: any, params: any) => {}),
    oas_hasRequiredRequestBody: assign(({ context, event }: any, params: any) => {}),

    oas_getResponseAsJSONSchema: assign(({ context, event }: any, params: any) => {}),
    oas_getResponseByStatusCode: assign(({ context, event }: any, params: any) => {}),
    oas_getResponseExamples: assign(({ context, event }: any, params: any) => {}),
    oas_getResponseStatusCodes: assign(({ context, event }: any, params: any) => {}),

    oas_getSecurity: assign(({ context, event }: any, params: any) => {}),
    oas_getSecurityWithTypes: assign(({ context, event }: any, params: any) => {}),
    oas_prepareSecurity: assign(({ context, event }: any, params: any) => {}),

    oas_getIdentifier: assign(({ context, event }: any, params: any) => {}),

    oas_dereferencedFileSize: assign(({ context, event }: any, params: any) => {
      const result = context.instance.oas.dereferencedFileSize()
      context.executionCache.dereferencedFileSize = result
    }),
    oas_mediaTypes: assign(({ context, event }: any, params: any) => {}),
    oas_operationTotal: assign(({ context, event }: any, params: any) => {}),
    oas_rawFileSize: assign(({ context, event }: any, params: any) => {}),
    oas_securityTypes: assign(({ context, event }: any, params: any) => {}),

    oas_additionalProperties: assign(({ context, event }: any, params: any) => {}),
    oas_callbacks: assign(({ context, event }: any, params: any) => {}),
    oas_circularRefs: assign(({ context, event }: any, params: any) => {}),
    oas_commonParameters: assign(({ context, event }: any, params: any) => {}),
    oas_discriminators: assign(({ context, event }: any, params: any) => {}),
    oas_links: assign(({ context, event }: any, params: any) => {}),
    oas_style: assign(({ context, event }: any, params: any) => {}),
    oas_polymorphism: assign(({ context, event }: any, params: any) => {}),
    oas_serverVariables: assign(({ context, event }: any, params: any) => {}),
    oas_webhooks: assign(({ context, event }: any, params: any) => {}),
    oas_xml: assign(({ context, event }: any, params: any) => {}),

    oas_reducer: assign(({ context, event }: any, params: any) => {}),

  },
  actors: {
    createInstanceOAS,
    dereferenceOas,
  },
}).createMachine({
  initial: "loading",
  context: ({ input, self }: any) => {
    return {
      props: {
        apiSpec: input?.apiSpec || null,
      },
      instance: {
        oas: null,
      },
      executionCache: {
        deference: null,
        getCircularReferences: null,
        getDefinition: null,
        getTags: null,
        getPaths: null,
        getVersion: null,
        getWebhooks: null,
        init: null,

        findOperation: null,
        findOperationWithoutMethod: null,
        getOperation: null,
        getOperationById: null,
        operation: null,

        defaultVariables: null,
        replaceUrl: null,
        splitUrl: null,
        splitVariables: null,
        url: null,
        variables: null,

        getExtension: null,
        hasExtension: null,
        validateExtension: null,
        validateExtensions: null,

        getAuth: null,

        getContentType: null,
        getDescription: null,
        getOperationId: null,
        hasOperationId: null,
        isDeprecated: null,
        isFormUrlEncoded: null,
        isJson: null,
        isMultipart: null,
        isXml: null,
        isWebhook: null,
        getExampleGroups: null,
        getHeaders: null,
        getSummary: null,

        getCallback: null,
        getCallbackExamples: null,
        getCallbacks: null,
        hasCallbacks: null,

        getParameters: null,
        getParametersAsJSONSchema: null,
        hasParameters: null,
        hasRequiredParameters: null,

        getRequestBody: null,
        getRequestBodyExamples: null,
        getRequestBodyMediaTypes: null,
        hasRequestBody: null,
        hasRequiredRequestBody: null,

        getResponseAsJSONSchema: null,
        getResponseByStatusCode: null,
        getResponseExamples: null,
        getResponseStatusCodes: null,

        getSecurity: null,
        getSecurityWithTypes: null,
        prepareSecurity: null,

        getIdentifier: null,

        dereferencedFileSize: null,
        mediaTypes: null,
        operationTotal: null,
        rawFileSize: null,
        securityTypes: null,

        additionalProperties: null,
        callbacks: null,
        circularRefs: null,
        commonParameters: null,
        discriminators: null,
        links: null,
        style: null,
        polymorphism: null,
        serverVariables: null,
        webhooks: null,
        xml: null,

        reducer: null,

      },

      // ...input,
    }
  },
  entry: enqueueActions(({ enqueue, context, event }) => {
    // create oas instance
  }),
  states: {
    loading: {
      invoke: {
        src: "createInstanceOAS",
        input: ({ context }: any) => ({ apiSpec: context?.props?.apiSpec }),
        onDone: {
          target: "ready",
          actions: [
            {
              type: "setOasInstance",
              params: ({ event }: any) => {
                console.log('---onDone createOasInstance----', {event})

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
        "oas.dereference": { actions: ["oas_deference"] },
        "oas.get-circular-references": { actions: ["oas_getCircularReferences"] },
        "oas.get-definition": { actions: ["oas_getDefinition"] },
        "oas.get-tags": { actions: ["oas_getTags"] },
        "oas.get-paths": { actions: ["oas_getPaths"] },
        "oas.get-version": { actions: ["oas_getVersion"] },
        "oas.get-webhook": { actions: ["oas_getWebhooks"] },
        "oas.init": { actions: ["oas_init"] },

        "oas.find0operation": { actions: ["oas_findOperation"] },
        "oas.find-operation-without-method": { actions: ["oas_findOperationWithoutMethod"] },
        "oas.get-operation": { actions: ["oas_getOperation"] },
        "oas.get-operation-by-id": { actions: ["oas_getOperationById"] },
        "oas.operation": { actions: ["oas_operation"] },

        "oas.default-variables": { actions: ["oas_defaultVariables"] },
        "oas.replace-url": { actions: ["oas_replaceUrl"] },
        "oas.split-url": { actions: ["oas_splitUrl"] },
        "oas.split-variables": { actions: ["oas_splitVariables"] },
        "oas.url": { actions: ["oas_url"] },
        "oas.variables": { actions: ["oas_variables"] },

        "oas.get-extension": { actions: ["oas_getExtension"] },
        "oas.has-extension": { actions: ["oas_hasExtension"] },
        "oas.validate-extension": { actions: ["oas_validateExtension"] },
        "oas.validate-extensions": { actions: ["oas_validateExtensions"] },

        "oas.get-auth": { actions: ["oas_getAuth"] },

        "oas.get-content-type": { actions: ["oas_getContentType"] },
        "oas.get-description": { actions: ["oas_getDescription"] },
        "oas.get-operation-id": { actions: ["oas_getOperationId"] },
        "oas.has-operation-id": { actions: ["oas_hasOperationId"] },
        "oas.is-deprecated": { actions: ["oas_isDeprecated"] },
        "oas.is-form-url-encoded": { actions: ["oas_isFormUrlEncoded"] },
        "oas.is-json": { actions: ["oas_isJson"] },
        "oas.is-multi-part": { actions: ["oas_isMultipart"] },
        "oas.is-xml": { actions: ["oas_isXml"] },
        "oas.is-webhook": { actions: ["oas_isWebhook"] },
        "oas.get-example-groups": { actions: ["oas_getExampleGroups"] },
        "oas.get-headers": { actions: ["oas_getHeaders"] },
        "oas.get-summary": { actions: ["oas_getSummary"] },

        "oas.get-callback": { actions: ["oas_getCallback"] },
        "oas.get-callback-examples": { actions: ["oas_getCallbackExamples"] },
        "oas.get-callbacks": { actions: ["oas_getCallbacks"] },
        "oas.has-callbacks": { actions: ["oas_hasCallbacks"] },

        "oas.get-parameters": { actions: ["oas_getParameters"] },
        "oas.get-parameters-as-json-schema": { actions: ["oas_getParametersAsJSONSchema"] },
        "oas.has-parameters": { actions: ["oas_hasParameters"] },
        "oas.has-required-parameters": { actions: ["oas_hasRequiredParameters"] },

        "oas.get-request-body": { actions: ["oas_getRequestBody"] },
        "oas.get-request-body-examples": { actions: ["oas_getRequestBodyExamples"] },
        "oas.get-request-body-media-types": { actions: ["oas_getRequestBodyMediaTypes"] },
        "oas.has-request-body": { actions: ["oas_hasRequestBody"] },
        "oas.has-required-request-body": { actions: ["oas_hasRequiredRequestBody"] },

        "oas.get-response-as-json-schema": { actions: ["oas_getResponseAsJSONSchema"] },
        "oas.get-response-by-status-code": { actions: ["oas_getResponseByStatusCode"] },
        "oas.get-response-examples": { actions: ["oas_getResponseExamples"] },
        "oas.get-response-status-codes": { actions: ["oas_getResponseStatusCodes"] },

        "oas.get-security": { actions: ["oas_getSecurity"] },
        "oas.get-security-with-types": { actions: ["oas_getSecurityWithTypes"] },
        "oas.prepare-security": { actions: ["oas_prepareSecurity"] },

        "oas.get-identifier": { actions: ["oas_getIdentifier"] },

        "oas.dereferenced-file-size": { actions: ["oas_dereferencedFileSize"] },
        "oas.media-types": { actions: ["oas_mediaTypes"] },
        "oas.operation-total": { actions: ["oas_operationTotal"] },
        "oas.raw-file-size": { actions: ["oas_rawFileSize"] },
        "oas.security-types": { actions: ["oas_securityTypes"] },

        "oas.additional-properties": { actions: ["oas_additionalProperties"] },
        "oas.callbacks": { actions: ["oas_callbacks"] },
        "oas.circular-refs": { actions: ["oas_circularRefs"] },
        "oas.common-parameters": { actions: ["oas_commonParameters"] },
        "oas.discriminators": { actions: ["oas_discriminators"] },
        "oas.links": { actions: ["oas_links"] },
        "oas.style": { actions: ["oas_style"] },
        "oas.polymorphism": { actions: ["oas_polymorphism"] },
        "oas.serverVariables": { actions: ["oas_serverVariables"] },
        "oas.webhooks": { actions: ["oas_webhooks"] },
        "oas.xml": { actions: ["oas_xml"] },

        "oas.reducer": { actions: ["oas_reducer"] },
      },
    },
  },
})
