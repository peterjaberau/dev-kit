export interface TopicInfo {
  name: string
  type: string
  messageCount?: number
  frequency?: number
  durationSec?: number
  /**
   * Display labels for the recording file(s) this topic came from. Only
   * populated when multiple sources are merged into one session (see
   * `CombinedSourceProxy`); absent for single-file sessions so existing UI
   * is unaffected.
   */
  sourceLabels?: string[]
}


interface PickDefaultRawMessagesTopicOptions {
  excludeTopics?: ReadonlySet<string>;
}

export function pickDefaultRawMessagesTopic(
  topics: ReadonlyArray<TopicInfo>,
  options?: PickDefaultRawMessagesTopicOptions,
): string {
  const excludeTopics = options?.excludeTopics;
  const available = topics.filter((topic) => !excludeTopics?.has(topic.name));
  return available[0]?.name ?? topics[0]?.name ?? '';
}
