import { useEngineActors } from "../hooks/engine"
import { useSelector } from "@xstate/react"

// export const useDataSource = () => {
//   const { dataSourceRef } = useEngineActors()
//
//   const sendToDataSource = dataSourceRef.send
//   const dataSourceState: any = useSelector(dataSourceRef, (state) => state)
//   const dataSourceContext = dataSourceState.context
//
//   const settingsData = dataSourceContext.settingsData
//
//   return {
//     dataSourceRef,
//     sendToDataSource,
//
//     dataSourceState,
//     dataSourceContext,
//
//     settingsData
//   }
// }
//
