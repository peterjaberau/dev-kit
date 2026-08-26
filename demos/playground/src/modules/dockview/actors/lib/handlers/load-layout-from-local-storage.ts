export const loadLayoutFromLocalStorage = ({ api, key }: any) => {
  const state = localStorage.getItem(key)
  if (state) {
    try {
      api.fromJSON(JSON.parse(state))
      return
    } catch {
      localStorage.removeItem("dv-demo-state")
    }
    return
  }
}
