/* Cascader Cascader Selection

* 【Field Attribute Description】

* title: The label value of the field item

* type: Used to identify the display type of the field item (input, date, data-time, url, textarea, etc.)

* options: Used to set the selection options

* isRequired: Whether it is a required field

* description: Field description

* readOnly: Whether the field item can be edited

* */
export const initCascaderSchema = {
  type: "cascader",
  title: "Cascader Selection",

  options: [
    {
      value: "zhejiang",

      label: "Zhejiang",

      children: [
        {
          value: "hangzhou",

          label: "Hangzhou",

          children: [
            {
              value: "xihu",

              label: "West Lake",
            },
          ],
        },
      ],
    },

    {
      value: "jiangsu",

      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ],
  default: "a",
  description: "",
  showSearch: true,
  allowClear: true,
}
