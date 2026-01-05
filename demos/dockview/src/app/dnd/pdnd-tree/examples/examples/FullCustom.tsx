import useLocalTreeData from "../data/custom/useLocalTreeData"
import SortableTree from "../../components/custom"
import {
  SampleChildren,
  SampleDropGhostIndicator,
  SampleDropLineIndicator,
  SamplePreview,
  SampleRow,
} from "../components/custom"
import { Wrapper } from "./wrapper"
import { chakra, Box, Container, Stack } from "@chakra-ui/react"
import { ScrollAreaWrapper } from "#components/ui-common/scroll-area-wrapper"

export const FullCustom = () => {
  const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } = useLocalTreeData()

  return (
    <Wrapper
      title={"Full Custom"}
      autoScroll={true}
      args={{
        getAllowedDropInstructions,
        items,
      }}
    >
      <SortableTree
        // flashClass={rowStyles.flash}
        flashStyle={{
          animation: "flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        getAllowedDropInstructions={getAllowedDropInstructions}
        items={items}
        onDrop={handleDrop}
        onExpandToggle={handleExpandToggle}
        renderIndicator={SampleDropLineIndicator}
        renderPreview={SamplePreview}
        renderRow={SampleRow}
      >
        {SampleChildren}
      </SortableTree>
    </Wrapper>
  )
}
