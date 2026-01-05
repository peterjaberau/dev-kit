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
import { chakra } from "@chakra-ui/react"

export const WithLineIndicatorAndScroll = () => {
  const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } = useLocalTreeData()

  return (
    <Wrapper
      title={"With Line Indicator And Scroll"}
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
        {({ children, containerRef }) => (
          <chakra.ol
            ref={containerRef}
            css={{
              // border: "1px solid #aaa",
              borderRadius: "4px",
              listStyle: "none",
              margin: "0 auto",
              maxHeight: "200px",
              overflow: "auto",
              padding: 0,
              width: "300px",
            }}
          >
            {children}
          </chakra.ol>
        )}
      </SortableTree>
    </Wrapper>
  )
}
