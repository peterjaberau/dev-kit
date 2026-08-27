
export const registerFormsPlugin = {
  prefix: "forms-",
  loaders: {
    checkbox: () => import("#plugins/forms-plugin/view/checkbox"),
    field: () => import("#plugins/forms-plugin/view/field"),
    slider: () => import("#plugins/forms-plugin/view/slider"),
  },
}