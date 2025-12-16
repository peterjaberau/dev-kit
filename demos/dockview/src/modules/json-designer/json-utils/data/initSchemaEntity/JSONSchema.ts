/** New JSONSchema Level 1 Fields

 * 【Field Attribute Descriptions】

 * title: The label value of the field

 * properties: Stores the data content of all subfields

 * type: Identifies the display type of the field (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfields, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initJSONSchemaData = {

  type: 'object',

  title: 'jsonSchemaObject',

  properties: {

    func: {

      type: 'object',

      title: 'Function Settings',

      properties: {

        a: {

          title: 'Single Text Box',

          type: 'input',

          default: '', // Default value

          description: '', // Description of the field

          placeholder: '', // Input hints

          isRequired: false,

        },

      },
      propertyOrder: ['a'],

    },
    style: {
      type: 'object',

      title: 'Style Settings',

      properties: {

        b: {
          title: 'Single Text Box',

          type: 'input',

          default: '', // Default value

          description: '', // Description of field item

          placeholder: '', // Input hint

        },

      },
      propertyOrder: ['b'],

    },
    data: {
      type: 'data',

      title: 'Data Settings',

      properties: {

        c: {
          title: 'Single Text Box',

          type: 'input',

          default: '', // Default value

          description: '', // Description of field item

          placeholder: '', // Input hint

          isRequired: false,

        },

      },
      propertyOrder: ['c'],
    },
  },
  propertyOrder: ['func', 'style', 'data'],
};
