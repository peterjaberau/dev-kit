export interface RawMessagesConfig {
  topic: string
  uiRefreshHz: number
  pauseUpdates: boolean
  latestOnly: boolean
  maxExpandedDepth: number
  maxRows: number
  maxBinaryPreviewBytes: number
  binaryCopyFormat: "uint8array" | "hex" | "base64"
}

export const defaultRawMessagesConfig = (): RawMessagesConfig => ({
  topic: "",
  uiRefreshHz: 10,
  pauseUpdates: false,
  latestOnly: true,
  maxExpandedDepth: 4,
  maxRows: 2000,
  maxBinaryPreviewBytes: 256,
  binaryCopyFormat: "uint8array",
})

export function parseRawMessagesConfig(input: unknown): RawMessagesConfig {
  const base = defaultRawMessagesConfig()
  if (!isRecord(input)) return base
  return {
    topic: typeof input.topic === "string" ? input.topic : base.topic,
    uiRefreshHz: typeof input.uiRefreshHz === "number" ? clampNumber(input.uiRefreshHz, 1, 60) : base.uiRefreshHz,
    pauseUpdates: typeof input.pauseUpdates === "boolean" ? input.pauseUpdates : base.pauseUpdates,
    latestOnly: typeof input.latestOnly === "boolean" ? input.latestOnly : base.latestOnly,
    maxExpandedDepth:
      typeof input.maxExpandedDepth === "number"
        ? clampNumber(Math.round(input.maxExpandedDepth), 1, 6)
        : base.maxExpandedDepth,
    maxRows: typeof input.maxRows === "number" ? clampNumber(Math.round(input.maxRows), 200, 10000) : base.maxRows,
    maxBinaryPreviewBytes:
      typeof input.maxBinaryPreviewBytes === "number"
        ? clampNumber(Math.round(input.maxBinaryPreviewBytes), 16, 8192)
        : typeof input.binaryPreviewBytes === "number"
          ? clampNumber(Math.round(input.binaryPreviewBytes), 16, 8192)
          : base.maxBinaryPreviewBytes,
    binaryCopyFormat:
      input.binaryCopyFormat === "uint8array" || input.binaryCopyFormat === "hex" || input.binaryCopyFormat === "base64"
        ? input.binaryCopyFormat
        : base.binaryCopyFormat,
  }
}

