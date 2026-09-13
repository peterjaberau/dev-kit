export const viewProfiles: any[] = [
  {
    id: "registryViews",
    data: {
      views: [
        {
          id: "button",
          plugin: "components-button",
          props: {
            variant: "solid",
            content: "Button",
            size: "md",
            colorPalette: "gray",
            disabled: false,
          },
        },
        {
          id: "button-custom",
          plugin: "components-button",
          props: {
            variant: "surface",
            content: "Custom Button",
            size: "sm",
            colorPalette: "blue",
            disabled: false,
          },
        },
        {
          id: "popover",
          plugin: "components-popover",
        },
        {
          id: "checkbox",
          plugin: "forms-checkbox",
        },
        {
          id: "field",
          plugin: "forms-field",
        },
        {
          id: "slider",
          plugin: "forms-slider",
        },
      ],
    },
  },
]
