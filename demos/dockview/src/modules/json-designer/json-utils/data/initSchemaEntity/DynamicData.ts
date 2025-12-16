/** dynamic-data: Dynamic data

 * 【Field attribute description】

 * title: The label value of the field item

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field item can be edited

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfield items, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initDynamicData = {
  type: 'dynamic-data',

  title: 'Dynamic data source',

  isContainer: false,

  properties: {
    type: {
      default: 'local',

      type: 'select',

      options: [
        {
          label: 'Local data',

          value: 'local',

        },

        {
          label: 'Interface data',

          value: 'remote',

        },

      ],

      title: 'Data type',

    },
    config: {
      title: 'Interface configuration',
      type: 'api',
      description: 'Used to store interface configuration data (url, request parameters, etc.)',
      isRequired: true,
      properties: {
        url: {
          type: 'url',
          title: 'Request address',
          default: '',
          description: 'API URL',
          isRequired: true,

        },
        method: {
          type: 'select',
          title: 'Request method',
          default: 'get',
          options: [
            { label: 'GET', value: 'get' },
            { label: 'POST', value: 'post' },
            { label: 'PUT', value: 'put' },
            { label: 'PATCH', value: 'patch' },
            { label: 'DELETE', value: 'delete' },

          ],

          isRequired: true,

        },
        headers: {

          type: 'json',

          title: 'Request Headers',

          default: '{}',

          description: 'Request Header Object',

        },
        data: {

          type: 'json',

          title: 'Request Parameters',

          default: '{}',

          description: 'Request Body or Query Parameters',

        },
        dataType: {

          type: 'select',

          title: 'Data Format',

          default: 'json',

          options: [

            { label: 'JSON', value: 'json' },

            { label: 'FormData', value: 'form-data' },

            { label: 'Form', value: 'form' },

          ],

        },
        cache: {

          type: 'number',

          title: 'Cache Time',

          default: undefined,

          description: 'Cache time (ms), no caching if not set',

        },

      },
      propertyOrder: ['url', 'method', 'headers', 'data', 'dataType', 'cache'],

    },
    data: {
      title: 'Data content',
      type: 'json',
      default: '{}', // Default value
      description: 'Data content used to store DynamicData',
      isRequired: true,

    },
    localFilter: {
      title: 'Filter',
      type: 'codearea',
      default: 'return data;',
      description: 'Used to define filtering of local data',
      isRequired: true,

    },

  },
  propertyOrder: ['type', 'config', 'data', 'localFilter'],

};

// Empty JSON data content corresponding to dynamic data
export const EmptyDynamicDataCont = {
  type: 'local',

  config: {

    url: '',

    method: 'get',

    headers: {},

    data: {},

    dataType: 'json',

  },

  data: '{}', // Used to store result data

  localFilter: 'return data;',

};
