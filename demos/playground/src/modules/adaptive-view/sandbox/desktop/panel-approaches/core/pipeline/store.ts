import { create } from 'zustand';
import type { Subscription, TopicInfo } from "../types"

export interface MessagePipelineState {
  sortedTopics: TopicInfo[]
  datatypes: Record<string, unknown>
  subscriptions: Subscription[]
  publishersByTopic: Map<string, Set<string>>

  setSubscriptions: (subscriptions: Subscription[]) => void
}

const EMPTY_PUBLISHERS: Map<string, Set<string>> = new Map();
const EMPTY_DATATYPES = {} as Record<string, unknown>

/**
 * Message state (lastMessageByTopic, per-subscriber batches, seq counters) is
 * kept out of this store and lives in `messageBus` with per-key subscriptions.
 * This store only holds slowly-changing metadata so that per-tick fan-out does
 * not wake every useMessagePipeline subscriber. Real-time playback time is
 * exposed through Player.subscribeCurrentTime/getCurrentTime instead.
 */
export const useMessagePipelineStore = create<MessagePipelineState>((set) => ({
  sortedTopics: [],
  datatypes: EMPTY_DATATYPES,
  subscriptions: [],
  publishersByTopic: EMPTY_PUBLISHERS,


  setSubscriptions: (subscriptions: Subscription[]) => set({ subscriptions }),
}));
