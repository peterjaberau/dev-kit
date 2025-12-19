export const data: any = {
  OAS_OPEN_API_SPECS: [
    {
      id: "3-1-dereference-handling",
      name: "3-1-dereference-handling",
    },
    {
      id: "3-1-no-responses",
      name: "3-1-no-responses",
    },
    {
      id: "3-1-primitive-components",
      name: "3-1-primitive-components",
    },
    {
      id: "ably",
      name: "Ably",
    },
    {
      id: "callbacks",
      name: "Callbacks",
    },
    {
      id: "callbacks-weird-summary-description",
      name: "Callbacks-weird-summary-description",
    },
    {
      id: "circular",
      name: "Circular",
    },
    {
      id: "circular-path",
      name: "Circular-path",
    },
    {
      id: "complex-nesting",
      name: "Complex-nesting",
    },
    {
      id: "deprecated",
      name: "Deprecated",
    },
    {
      id: "discriminators",
      name: "Discriminators",
    },
    {
      id: "local-link",
      name: "Local-link",
    },
    {
      id: "multiple-securities",
      name: "Multiple-securities",
    },
    {
      id: "nested-allof-flattening",
      name: "Nested-allof-flattening",
    },
    {
      id: "non-standard-components",
      name: "Non-standard-components",
    },
    {
      id: "operation-examples",
      name: "Operation-examples",
    },
    {
      id: "ordered-tags",
      name: "Ordered-tags",
    },
    {
      id: "path-matching-quirks",
      name: "Path-matching-quirks",
    },
    {
      id: "path-variable-quirks",
      name: "Path-variable-quirks",
    },
    {
      id: "pathitems-component",
      name: "Pathitems-component",
    },
    {
      id: "petstore-nondereferenced",
      name: "Petstore-nondereferenced",
    },
    {
      id: "petstore-ref-quirks",
      name: "Petstore-ref-quirks",
    },
    {
      id: "petstore-server-vars",
      name: "Petstore-server-vars",
    },
    {
      id: "polymorphism-quirks",
      name: "Polymorphism-quirks",
    },
    {
      id: "polymorphism-with-circular-ref",
      name: "Polymorphism-with-circular-ref",
    },
    {
      id: "readonly-writeonly",
      name: "Readonly-writeonly",
    },
    {
      id: "reduce-quirks",
      name: "Reduce-quirks",
    },
    {
      id: "requestbody-example-quirks",
      name: "Requestbody-example-quirks",
    },
    {
      id: "response-enums",
      name: "Response-enums",
    },
    {
      id: "responses",
      name: "Responses",
    },
    {
      id: "schema-deprecated",
      name: "Schema-deprecated",
    },
    {
      id: "security-root-level",
      name: "Security-root-level",
    },
    {
      id: "server-variables",
      name: "Server-variables",
    },
    {
      id: "tag-quirks",
      name: "Tag-quirks",
    },
  ],
  OAS_METHODS: [
    {
      id: "definitions",
      name: "Definitions",
      children: [
        {
          id: "general",
          name: "General",
          children: [
            {
              id: "dereference",
              name: "dereference()",
            },
            {
              id: "getCircularReferences",
              name: "getCircularReferences()",
            },
            {
              id: "getDefinition",
              name: "getDefinition()",
            },
            {
              id: "getTags",
              name: "getTags()",
            },
            {
              id: "getPaths",
              name: "getPaths()",
            },
            {
              id: "getVersion",
              name: "getVersion()",
            },
            {
              id: "getWebhooks",
              name: "getWebhooks()",
            },
            {
              id: "init",
              name: "#init",
            },
          ],
        },
        {
          id: "operations",
          name: "Operations",
          children: [
            {
              id: "findOperation",
              name: "findOperation()",
            },
            {
              id: "findOperationWithoutMethod",
              name: "findOperationWithoutMethod()",
            },
            {
              id: "getOperation",
              name: "getOperation()",
            },
            {
              id: "getOperationById",
              name: "getOperationById()",
            },
            {
              id: "operation",
              name: "operation()",
            },
          ],
        },
        {
          id: "servers",
          name: "Servers",
          children: [
            {
              id: "defaultVariables",
              name: "defaultVariables()",
            },
            {
              id: "replaceUrl",
              name: "replaceUrl()",
            },
            {
              id: "splitUrl",
              name: "splitUrl()",
            },
            {
              id: "splitVariables",
              name: "splitVariables()",
            },
            {
              id: "url",
              name: "url()",
            },
            {
              id: "variables",
              name: "variables()",
            },
          ],
        },
        {
          id: "extensions",
          name: "Extensions",
          children: [
            {
              id: "getExtension",
              name: "getExtension()",
            },
            {
              id: "hasExtension",
              name: "hasExtension()",
            },
            {
              id: "validateExtension",
              name: "validateExtension()",
            },
            {
              id: "validateExtensions",
              name: "validateExtensions()",
            },
          ],
        },
        {
          id: "userAuth",
          name: "User Auth",
          children: [
            {
              id: "getAuth",
              name: "getAuth()",
            },
          ],
        },
      ],
    },
    {
      id: "operations",
      name: "Operations",
      children: [
        {
          id: "general",
          name: "General",
          children: [
            {
              id: "getContentType",
              name: "getContentType()",
            },
            {
              id: "getDescription",
              name: "getDescription()",
            },
            {
              id: "getOperationId",
              name: "getOperationId()",
            },
            {
              id: "hasOperationId",
              name: "hasOperationId()",
            },
            {
              id: "isDeprecated",
              name: "isDeprecated()",
            },
            {
              id: "isFormUrlEncoded",
              name: "isFormUrlEncoded()",
            },
            {
              id: "isJson",
              name: "isJson()",
            },
            {
              id: "isMultipart",
              name: "isMultipart()",
            },
            {
              id: "isXml",
              name: "isXml()",
            },
            {
              id: "isWebhook",
              name: "isWebhook()",
            },
            {
              id: "getExampleGroups",
              name: "getExampleGroups()",
            },
            {
              id: "getHeaders",
              name: "getHeaders()",
            },
            {
              id: "getSummary",
              name: "getSummary()",
            },
            {
              id: "getTags",
              name: "getTags()",
            },
          ]
        },
        {
          id: "callbacks",
          name: "Callbacks",
          children: [
            {
              id: "getCallback",
              name: "getCallback()",
            },
            {
              id: "getCallbackExamples",
              name: "getCallbackExamples()",
            },
            {
              id: "getCallbacks",
              name: "getCallbacks()",
            },
            {
              id: "hasCallbacks",
              name: "hasCallbacks()",
            },
          ]
        },
        {
          id: "parameters",
          name: "Parameters",
          children: [
            {
              id: "getParameters",
              name: "getParameters()",
            },
            {
              id: "getParametersAsJSONSchema",
              name: "getParametersAsJSONSchema()",
            },
            {
              id: "hasParameters",
              name: "hasParameters()",
            },
            {
              id: "hasRequiredParameters",
              name: "hasRequiredParameters()",
            },
          ]
        },
        {
          id: "requestBody",
          name: "Request Body",
          children: [
            {
              id: "getRequestBody",
              name: "getRequestBody()",
            },
            {
              id: "getRequestBodyExamples",
              name: "getRequestBodyExamples()",
            },
            {
              id: "getRequestBodyMediaTypes",
              name: "getRequestBodyMediaTypes()",
            },
            {
              id: "hasRequestBody",
              name: "hasRequestBody()",
            },
            {
              id: "hasRequiredRequestBody",
              name: "hasRequiredRequestBody()",
            },
          ]
        },
        {
          id: "responses",
          name: "Responses",
          children: [
            {
              id: "getResponseAsJSONSchema",
              name: "getResponseAsJSONSchema()",
            },
            {
              id: "getResponseByStatusCode",
              name: "getResponseByStatusCode()",
            },
            {
              id: "getResponseExamples",
              name: "getResponseExamples()",
            },
            {
              id: "getResponseStatusCodes",
              name: "getResponseStatusCodes()",
            },
          ]
        },
        {
          id: "security",
          name: "Security",
          children: [
            {
              id: "getSecurity",
              name: "getSecurity()",
            },
            {
              id: "getSecurityWithTypes",
              name: "getSecurityWithTypes()",
            },
            {
              id: "prepareSecurity",
              name: "prepareSecurity()",
            },
          ]
        },
        {
          id: "extensions",
          name: "Extensions",
          children: [
            {
              id: "hasExtension",
              name: "hasExtension()",
            },
          ]
        },
      ],
    },
    {
      id: "callbacks",
      name: "Callbacks",
      children: [
        {
          id: "getIdentifier",
          name: "getIdentifier()",
        },
      ],
    },
    {
      id: "utils",
      name: "Utils",
      children: [
        {
          id: "analyzer",
          name: "Analyzer",
          children: [
            {
              id: "analyzer",
              name: "analyzer()",
            },
          ],
        },
        {
          id: "general",
          name: "General",
          children: [
            {
              id: "dereferencedFileSize",
              name: "dereferencedFileSize()",
            },
            {
              id: "mediaTypes",
              name: "mediaTypes()",
            },
            {
              id: "operationTotal",
              name: "operationTotal()",
            },
            {
              id: "rawFileSize",
              name: "rawFileSize()",
            },
            {
              id: "securityTypes",
              name: "securityTypes()",
            },
          ],
        },
        {
          id: "features",
          name: "Features",
          children: [
            {
              id: "additionalProperties",
              name: "additionalProperties()",
            },
            {
              id: "callbacks",
              name: "callbacks()",
            },
            {
              id: "circularRefs",
              name: "circularRefs()",
            },
            {
              id: "commonParameters",
              name: "commonParameters()",
            },
            {
              id: "discriminators",
              name: "discriminators()",
            },
            {
              id: "links",
              name: "links()",
            },
            {
              id: "style",
              name: "style()",
            },
            {
              id: "polymorphism",
              name: "polymorphism()",
            },
            {
              id: "serverVariables",
              name: "serverVariables()",
            },
            {
              id: "webhooks",
              name: "webhooks()",
            },
            {
              id: "xml",
              name: "xml()",
            },
          ],
        },
        {
          id: "reducer",
          name: "Reducer",
          children: [
            {
              id: "reducer",
              name: "reducer()",
            },
          ],
        },
      ],
    },
  ]
}
