export function isGroup(
  item: unknown,
) {
  return typeof item === "object" && item !== null && "id" in item;
}
