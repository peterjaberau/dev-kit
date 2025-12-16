/** Object Field

 * 【Field Attribute Description】

 * title: The label value of the field field

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field field (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field field is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfields, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initObjectData = {

  type: 'object',

  title: 'Object',

  description: '', // Description of the field field

  properties: {

    a: {

      type: 'input',

      title: 'Single Text Box',

      default: '', // Default value

      description: '', // Description of the field field

      placeholder: '', // Input suggestion

    },

  },

  propertyOrder: ['a'], };
