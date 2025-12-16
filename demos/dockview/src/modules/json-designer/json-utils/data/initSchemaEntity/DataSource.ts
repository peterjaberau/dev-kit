/** dataSource Field Items

 * 【Field Attribute Description】

 * title: The label value of the field item

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field item is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfield items, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initDataSourceData = {

  type: 'datasource',

  title: 'Data Source',

  isContainer: false,

  properties: {

    type: {

      default: 'local',

      type: 'select',

      options: [

        {
          label: 'Local Data',

          value: 'local',

        },

        {
          label: 'Interface Data',

          value: 'remote',

        },

      ],

      title: 'Data Source Type',

    },
    data: {
      title: 'Local JSON Data',
      placeholder: 'Please enter static JSON data', // Input prompt

      type: 'json',

      default: '{}', // Default value

      description: 'Used to set local static JSON data',

      isRequired: true,

    },
    filter: {
      title: 'Filter',

      type: 'codearea',

      default: '() => {}',

      description: 'Used to define the function to filter the current data',

      isRequired: true,

    },

  },
  propertyOrder: ['type', 'data', 'filter'],

};

// By default, this is used to display local data sources. To display remote data sources, use initDataSourceDataV2.
export const initDataSourceDataV2 = {

  type: 'datasource',

  title: 'Data Source',

  isContainer: false,

  properties: {

    type: {

      type: 'select',

      default: 'remote',

      options: [

        {
          label: 'Local Data',

          value: 'local',

        },

        {
          label: 'Interface Data',

          value: 'remote',

        },

      ],

      title: 'Data Source Type',

    },

    data: {

      type: 'url',

      title: 'Remote JSON Data',

      placeholder: 'Please enter the remote JSON data source address', // Input prompt

      default: 'http://xxx', // Default value

      isRequired: true,

      description: 'Used to set the request address for retrieving element data',

    },

    filter: {

      type: 'codearea',

      title: 'Filter',

      default: '() => {}',

      description: 'Used to define the function for filtering the current data',

      isRequired: true,

    },

  },

  propertyOrder: ['type', 'data', 'filter'],
};
