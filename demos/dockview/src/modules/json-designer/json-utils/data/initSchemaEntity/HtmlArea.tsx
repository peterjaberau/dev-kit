/* HtmlArea type field

* 【Field attribute description】

* title: Label value of the field item

* type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

* isRequired: Whether it is a required field

* default: Default value

* description: Field description

* placeholder: Input hint

* readOnly: Whether the field item can be edited

* */
export const initHtmlAreaData = {

  title: 'Rich Text',

  type: 'htmlarea',

  placeholder: 'Please enter an HTML code snippet',

  default: '<p>hello,world!</p>', // Default value

  description: 'Used to place HTML code snippets', // Field item description

};
