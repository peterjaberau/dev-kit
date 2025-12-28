import type { IndicatorPropsType } from "#components/pragmatic-drag-drop/tree-sortable/package"
import type { DataType, IdType } from "../../data/sample"
import "./SampleDropLineIndicator.css"

const SampleDropLineIndicator = ({ indentLevel, indentSize }: IndicatorPropsType<IdType, DataType>) => (
  <li
    className={"main"}
    style={
      {
        "--indent-level": `${indentLevel * indentSize}px`,
      } as React.CSSProperties
    }
  />
)

export default SampleDropLineIndicator
