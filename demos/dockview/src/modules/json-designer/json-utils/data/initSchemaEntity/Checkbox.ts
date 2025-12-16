/* checkboxes element

* 【Field attribute description】

* title: The label value of the field item

* type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* options: Used to set the selection options

* description: Field description

* readOnly: Whether the field item can be edited

* */
export const initCheckboxSchema = {
  type: 'checkboxes',

  title: 'Multiple selection',

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

  default: ['a'],

  description: '',

};
