/** quantity field

 * 【Field attribute description】

 * title: The label value of the field

 * properties: Stores the data content of all subfields

 * type: Used to identify the display type of the field (input, date, data-time, url, textarea, etc.)

 * readOnly: Whether the field is editable can be set

 * required: Stores the key values ​​of all subfields, used to verify the existence of subfields, and also serves as a sorting function

 * propertyOrder: Stores the key values ​​of all subfields in order (sorting function)

 * */
export const initQuantityData = {
  type: "quantity",

  title: "Unit Measurement",

  isContainer: false,

  properties: {
    unit: {
      type: "number",

      title: "Unit Value",

      default: 50, // Default value

      minimum: 0, // Configured in advanced settings

      maximum: 1000, // Configured in advanced settings

      description: "", // Description of the field
    },

    quantity: {
      type: "select", // Select list

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
