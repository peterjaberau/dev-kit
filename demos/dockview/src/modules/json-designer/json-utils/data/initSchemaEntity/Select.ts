/* Select dropdown field

* 【Field Attribute Description】

* title: The label value of the field item

* type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

* options: Used to set the selection options

* isRequired: Whether it is a required field

* description: Field description

* readOnly: Whether the field item can be edited

* */
export const initSelectData = {
  type: 'select',

  title: 'Dropdown Selection',

  options: [
    {
      label: 'Option a',

      value: 'a',

    },

    {
      label: 'Option b',

      value: 'b',

    },

    {
      label: 'Option c',

      value: 'c',

    },

  ],

// default: 'a',

  description: '',

};
