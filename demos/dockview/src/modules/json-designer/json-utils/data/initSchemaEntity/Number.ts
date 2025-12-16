/* Number type field

* 【Field attribute description】

* title: The label value of the field item

* type: Used to identify the UI display type of the field item (input, date, data-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* default: Default value

* minimum: Minimum value

* maximum: Maximum value

* description: Field description

* readOnly: Whether the field item can be edited

* */
export const initNumberData = {

  type: 'number',

  title: 'Quantity number',

  default: 1, // Default value

  minimum: 0, // Configured in advanced settings

  maximum: 1000, // Configured in advanced settings

  description: '', // Field description

};
