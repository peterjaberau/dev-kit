// Define the schema for API configuration
export const initApiData = {
  type: "api",
  title: "API Configuration",
  isContainer: false,
  properties: {
    url: {
      type: "url",
      title: "Request address",
      default: "",
      description: "API URL",
      isRequired: true,
    },
    method: {
      type: "select",
      title: "Request method",
      default: "get",
      options: [
        { label: "GET", value: "get" },
        { label: "POST", value: "post" },
        { label: "PUT", value: "put" },
        { label: "DELETE", value: "delete" },
      ],
      isRequired: true,
    },
    headers: {
      type: "json",
      title: "Request header",
      default: "{}",

      description: "Request header object",
    },

    data: {
      type: "json",

      title: "Request parameters",

      default: "{}",

      description: "Request body or query parameters",
    },
  },

  propertyOrder: ["url", "method", "headers", "data"],
}

// Empty content for api type

export const EmptyApiCont = {
  url: "",

  method: "get",

  headers: {},

  data: {},
}
