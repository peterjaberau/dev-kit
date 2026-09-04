

export const registerRegistryManagerPlugin = {
  prefix: "registry-manager-",
  loaders: {
    "registry-tree": () => import("#plugins/registry-manager-plugin/view/registry-tree"),
    "registry-viewer": () => import("#plugins/registry-manager-plugin/view/registry-viewer"),
  },
}