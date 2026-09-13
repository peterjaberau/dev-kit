export interface MessageEvent<T = unknown> {
  topic: string
  receiveTime: Time
  publishTime: Time
  message: T
  schemaName: string
  payloadKind?: "object" | "hybrid-transfer" | "hybrid-sab"
  sizeInBytes?: number
}

export interface Subscription {
  topic: string
  subscriberId: string
}