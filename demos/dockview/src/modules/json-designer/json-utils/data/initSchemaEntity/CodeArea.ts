/* CodeArea type fields

* 【Field attribute descriptions】

* title: The label value of the field item

* type: Used to identify the display type of the field item (input, date, data-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* default: Default value

* description: Field description

* placeholder: Input hint

* readOnly: Whether the field item can be edited

* */
export const initCodeAreaData = {

  type: 'codearea',

  title: 'Function type',

  placeholder: 'Please enter the function method', // Input hint

  default: 'function func() { console.log("hello, world!"); }', // Default value

  description: 'Used to define function methods', // Field item description

};
