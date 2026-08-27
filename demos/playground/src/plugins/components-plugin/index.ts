
export const registerComponentsPlugin = {
  prefix: "components-",
  loaders: {
    button: () => import("#plugins/components-plugin/view/button"),
    popover: () => import("#plugins/components-plugin/view/popover"),
  },
}