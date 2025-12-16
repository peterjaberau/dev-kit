/** box-style field

 * 【Field attribute description】

 * title: The label value of the field

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field (input, date, date-time, url, textarea, etc.)

 * readOnly: Whether the field is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfields, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initBoxStyleData = {
  type: "box-style",

  title: "Box Model",

  isContainer: false,

  properties: {
    unit: {
      title: "Unit Value",

      type: "input",

      default: "0", // Default value is '0': '0px 0px 0px 0px'; is '5px': '5px 5px 5px 5px'

      description: "", // Description and explanation of field items
    },
    quantity: {
      type: "select", // Selection list

      default: "px",

      options: [
        {
          label: "px",

          value: "px",
        },

        {
          label: "rem",

          value: "rem",
        },

        {
          label: "em",

          value: "em",
        },

        {
          label: "%",

          value: "%",
        },
      ],

      title: "Unit Type",
    },
  },

  propertyOrder: ["unit", "quantity"],
}
