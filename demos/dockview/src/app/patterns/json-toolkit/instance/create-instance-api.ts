export const createInstanceApi = (instance, instanceActor) => {
  const context = instanceActor.getSnapshot().context

  const instanceApi = {
    getIndent: () => {
      editorActor.getSnapshot().context
    },
  }
  return instanceApi
}
