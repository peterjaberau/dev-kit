'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useOasManager = () => {
  const { rootOASManagerRef: oasManagerRef } = useRootActors()
  const oasManagerState: any = useSelector(oasManagerRef, (state) => state)
  const oasManagerContext = oasManagerState?.context
  const sendToOASManager = oasManagerRef?.send


  // metadata
  const metadata = oasManagerContext?.metadata
  const metadataOAS = metadata?.oas

  // const oasMethods = Object.keys(metadataOAS.methods).map(({ item }: any) => {
  //
  // })


  console.log('---oasMethods Meta----', JSON.stringify(metadataOAS.methods))


  const metadataOASMethodGroupsList = Object.keys(metadataOAS.methods)
  const getMetadataOASSubGroupMethodsList = (name: any) => {
    return metadataOAS.methods[name]
  }


  const metadataDatasets = metadata?.datasets
  const metadataDatasetsList = Object.keys(metadataDatasets)
  const getMetadataDataset = (name: any) => {
    return metadataDatasets[name]
  }


  // datasets
  const datasets = oasManagerContext?.datasets
  const datasetApiSpecification = datasets?.apiSpecification
  const getDatasetApiSpecificationItem = (name: any) => datasetApiSpecification[name]

  // runtime
  const runtime = oasManagerContext?.runtime
  const runtimeOASInstance = runtime?.oas?.instance

  // selected
  const selected = oasManagerContext?.selected
  const selectedDataset = selected?.dataset
  const selectedMethod = selected?.method

  return {
    oasManagerRef,
    oasManagerState,
    oasManagerContext,
    sendToOASManager,

    // metadata
    metadata,
    metadataOAS,
    metadataOASMethodGroupsList,
    metadataDatasets,
    metadataDatasetsList,
    getMetadataDataset,


    // datasets
    datasets,
    datasetApiSpecification,
    getDatasetApiSpecificationItem,

    // runtime
    runtime,
    runtimeOASInstance,

    // selected
    selected,
    selectedDataset,
    selectedMethod

  }

}
