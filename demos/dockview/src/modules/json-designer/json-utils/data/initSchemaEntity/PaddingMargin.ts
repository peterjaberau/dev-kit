/** padding-margin field item

 * 【Field attribute description】

 * title: The label value of the field item

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field item (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field item is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfield items, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initPaddingMarginData = {

  type: 'padding-margin',

  title: 'Margin settings',

  isContainer: false,

  properties: {

    margin: {

      title: 'Outer margin',

      type: 'input',

      default: '0', // Default value is '0': '0px 0px 0px 0px'; is '5px': '5px 5px 5px' 5px'

      Description: '',

    },
    Padding: {
      Title: 'Inner Margin',

      Type: 'input',

      Default: '0',

      Description: '',

    },
    Quantity: {
      Type: 'select', // Selection list

      Default: 'px',

      Options: [
        {
          Label: 'px',

          Value: 'px',

        },

        {
          Label: 'rem',

          Value: 'rem',

        },

        {
          Label: 'em',

          Value: 'em',

        },

        {
          Label: '%',

          Value: '%',

        },

      ],
      Title: 'Unit Type',

    },

  },
  PropertyOrder: ['margin', 'padding', 'quantity'],

};
