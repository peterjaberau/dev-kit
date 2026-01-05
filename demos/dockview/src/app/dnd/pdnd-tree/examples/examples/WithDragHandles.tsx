import useLocalTreeData from "../data/useLocalTreeData"
import SortableTree from "../../components"
import {
  SampleChildren,
  SampleDropGhostIndicator,
  SampleDropLineIndicator,
  SamplePreview,
  SampleRow,
} from "../components"
import { Wrapper } from "./wrapper"


export const WithDragHandles = () => {
  const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } = useLocalTreeData()

  return (
    <Wrapper
      title={"With Drag Handles"}
      args={{
        getAllowedDropInstructions,
        items,
      }}
    >
      <SortableTree
        flashStyle={{
          animation: "flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        // flashClass={rowStyles.flash}
        getAllowedDropInstructions={getAllowedDropInstructions}
        items={items}
        onDrop={handleDrop}
        onExpandToggle={handleExpandToggle}
        renderIndicator={SampleDropLineIndicator}
        renderPreview={SamplePreview}
        renderRow={(rowProps) => <SampleRow {...rowProps} withDragHandle={true} />}
      >
        {SampleChildren}
      </SortableTree>
    </Wrapper>
  )
}
