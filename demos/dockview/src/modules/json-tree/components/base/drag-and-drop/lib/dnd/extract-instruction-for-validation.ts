import { TreeInstruction } from "../../dependencies"

export function extractInstructionForValidation(targetData: Record<string, unknown>): TreeInstruction | null {
  const instructionSymbol = Object.getOwnPropertySymbols(targetData).find((symbol) =>
    symbol.toString().includes("tree-item-instruction"),
  )

  if (!instructionSymbol) {
    return null
  }

  // Use symbol as index to access the instruction
  const instructionValue = (targetData as Record<symbol, unknown>)[instructionSymbol]
  if (typeof instructionValue === "object" && instructionValue !== null && "type" in instructionValue) {
    return instructionValue as TreeInstruction
  }
  return null
}
