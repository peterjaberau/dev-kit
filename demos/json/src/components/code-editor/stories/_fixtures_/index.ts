export const langauges = [
  { label: "JSON", value: "json" },
  { label: "Text", value: "text" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
]

export function getInitialCode(language: any) {
  if (language === "json") {
    return `{ "firstName": "John", "lastName": "Doe", "age": 30 }`
  } else {
    return `just a normal text`
  }
}
