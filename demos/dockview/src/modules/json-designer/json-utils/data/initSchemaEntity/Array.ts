/* Array type field

* 【Field attribute description】

* title: Label value of the field item

* type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* items: Used to set the selection options

* description: Field description

* readOnly: Whether the field item can be edited

* */
export const initArrayData = {

  type: 'array',

  title: 'Array',

  description: '', // Description of the field item

// default: [],

  items: {

    type: 'object',

    title: 'Array item',

    description: '', // Description of the field item

    properties: {

      name: {

        type: 'input',

        title: 'Name',

        default: '', // Default value

        description: '', // Description of the field item

        placeholder: '', // Input suggestion

      },
    },
    propertyOrder: ['name'],
  },
};
