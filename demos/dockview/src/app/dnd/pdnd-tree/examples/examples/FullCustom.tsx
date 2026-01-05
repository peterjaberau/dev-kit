import SortableTree from "../../components/custom"
import useLocalTreeData from "../data/custom/useLocalTreeData"

import {
  SampleChildren,
  SampleDropGhostIndicator,
  SampleDropLineIndicator,
  SamplePreview,
  SampleRow,
} from "../components/custom"

import { Wrapper } from "./wrapper"

export const FullCustom = () => {
  const { items, getAllowedDropInstructions, handleDrop, handleExpandToggle, handleDebugToggle } = useLocalTreeData()

  return (
    <Wrapper
      title="Full Custom"
      autoScroll
      args={{
        items,
        getAllowedDropInstructions,
      }}
    >
      <SortableTree
        items={items}
        getAllowedDropInstructions={getAllowedDropInstructions}
        onDrop={handleDrop}
        onExpandToggle={handleExpandToggle}
        onDebugToggle={handleDebugToggle}
        flashStyle={{
          animation: "flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        renderIndicator={SampleDropLineIndicator}
        renderPreview={SamplePreview}
        renderRow={SampleRow}
      >
        {SampleChildren}
      </SortableTree>
    </Wrapper>
  )
}
