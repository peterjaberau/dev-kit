import { useRef, useState } from "react"
import { useMenuItemDragAndDrop } from '../../../drag-and-drop/use-menu-item-drag-and-drop'
import { useMenuRoot } from "../../../use-menu-root"


export const FiltersMenuItem = ({ data, index, amountOfMenuItems }: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null)

  const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } = useMenuItemDragAndDrop({
    draggable: {
      getInitialData: () => getTopLevelItemData("filters"),
      getDragPreviewPieces: () => ({
        elemBefore: <FilterIcon label="" />,
        content: "Filters",
      }),
    },
    dropTarget: {
      getData: () => getTopLevelItemData("filters"),
      getOperations: () => ({
        "reorder-after": "available",
        "reorder-before": "available",
      }),
      canDrop: ({ source }) => isTopLevelItemData(source.data),
    },
  })

}