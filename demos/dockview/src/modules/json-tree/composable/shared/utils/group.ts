export const isGroup = (item: any) => {
  return typeof item === "object" && item !== null && "id" in item
}

