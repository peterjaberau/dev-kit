import useLocalTreeData from "../data/useLocalTreeData"
import SortableTree from "../../components"
import {
  SampleChildren,
  SampleDropGhostIndicator,
  SamplePreview,
  SampleRow,
} from "../components"
import { Wrapper } from "./wrapper"


export const WithGhostIndicator = () => {
  const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } = useLocalTreeData()

  return (
    <Wrapper
      title={"With Ghost Indicator"}
      args={{
        getAllowedDropInstructions,
        items,
      }}
    >
      <SortableTree
        flashStyle={{
          animation: "flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        getAllowedDropInstructions={getAllowedDropInstructions}
        indicatorType="ghost"
        items={items}
        onDrop={handleDrop}
        onExpandToggle={handleExpandToggle}
        renderIndicator={SampleDropGhostIndicator}
        renderPreview={SamplePreview}
        renderRow={SampleRow}
      >
        {SampleChildren}
      </SortableTree>
    </Wrapper>
  )
}
