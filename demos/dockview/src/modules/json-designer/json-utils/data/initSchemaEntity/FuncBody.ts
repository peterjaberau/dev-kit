/* FuncBody type field

* 【Field attribute description】

* title: The label value of the field item

* type: Used to identify the display type of the field item (input, date, data-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* default: Default value

* description: Field description

* placeholder: Input hint

* readOnly: Whether the field item can be edited

* */
export const initFuncBody = {

  title: 'Function body',

  type: 'func-body',

  placeholder: 'Please execute the function body directly', // Input hint

  default: 'return data;', // Default value

  description: 'Used to define the function body', // Field description

};
