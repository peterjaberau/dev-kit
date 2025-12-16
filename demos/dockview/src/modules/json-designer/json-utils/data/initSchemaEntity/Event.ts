/** event field

 * 【Field attribute description】

 * title: The label value of the field

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfields, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
// Old version of Event data
export const initEventDataV1 = {
  type: 'event',
  title: 'Event',
  isContainer: false,
  properties: {
    type: {
      default: 'out',
      type: 'select',
      options: [
        {
          label: 'in',
          value: 'in',
        },

        {
          label: 'out',
          value: 'out',

        },
      ],
      title: 'Event Type',

      readOnlyInJson: false,

    },
    filter: {

      type: 'textarea',

      default: 'return data;',

      title: 'Filter',

    },

  },

  propertyOrder: ['type', 'data', 'filter'],

};

/** New version of EventData

 * type: Default data for emit */
export const initEventData = {

  type: 'event',

  title: 'Event',

  isContainer: false,

  properties: {

    type: {

      default: 'emit',

      type: 'select',

      options: [

        {
          label: 'on',

          value: 'on',

        },

        {
          label: 'emit',

          value: 'emit',

        },

      ],

      title: 'Event Type',

    },

    trigger: {

      type: 'input',

      default: 'eventName',

      title: 'Trigger Event',

      description: 'Enter the name of the trigger event',

      placeholder: 'Please enter the name of the trigger event',

    },

    eventData: {

      title: 'Event Data',

      type: 'json',

      default: '{}', // Default value

      description: 'Data object passed to the trigger event', // Description of field items

    },

  },

  propertyOrder: ['type', 'trigger', 'eventData'],

};

/** New version of EventData

 * type: Default data for on */
export const initEventDataTypeON = {

  type: 'event',

  title: 'Event',

  isContainer: false,

  properties: {

    type: {

      default: 'on',

      type: 'select',

      options: [

        {
          label: 'on',

          value: 'on',

        },

        {
          label: 'emit',

          value: 'emit',

        },

      ],

      title: 'Event Type',

    },
    register: {

      type: 'input',

      default: 'eventName',

      title: 'Register Event',

      description: 'Name of the event to register',

      placeholder: 'Please enter the name of the event to register',

    },
    actionFunc: {

      title: 'Execute Function',

      type: 'codearea',

      default: '() => {}', // Default value

      description: '', // Description of the field

    },

  },
  propertyOrder: ['type', 'register', 'actionFunc'],

};
