import { SchemaRenderer } from "../SchemaRenderer"

export const ButtonStory = () => {
  return (
    <SchemaRenderer
      schema={{
        type: "button",
        label: "Click Me",
      }}
    />
  )
}
