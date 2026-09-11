import * as React from "react"

export const Option = (props: { title: string; onClick: () => void; value: string }) => {
  return (
    <div>
      <span>{`${props.title}: `}</span>
      <button onClick={props.onClick}>{props.value}</button>
    </div>
  )
}