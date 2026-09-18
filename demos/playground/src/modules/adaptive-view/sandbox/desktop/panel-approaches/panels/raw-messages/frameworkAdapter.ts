import {
  collectExtras,
  FRAMEWORK_PANEL_TITLE_KEY,
  mergeWithExtras,
  type FrameworkAdapterDecoded,
  type FrameworkAdapterState,
  type FrameworkConfig,
  type PanelFrameworkAdapter,
} from "#adaptive-view/sandbox/desktop/panel-approaches/panels/framework/frameworkAdapter"
import { type RawMessagesConfig } from './defaults';
import { parseRawMessagesConfig } from './schema';

const KNOWN_KEYS = [
  'topic',
  'topicPath',
  'uiRefreshHz',
  'pauseUpdates',
  'latestOnly',
  'maxExpandedDepth',
  'maxRows',
  'maxBinaryPreviewBytes',
  'binaryPreviewBytes',
  'binaryCopyFormat',
] as const;

function fromConfig(config: FrameworkConfig): FrameworkAdapterDecoded<RawMessagesConfig> {
  const merged: FrameworkConfig = { ...config };
  if (typeof merged.topicPath === 'string' && typeof merged.topic !== 'string') {
    merged.topic = merged.topicPath;
  }
  const title = typeof config[FRAMEWORK_PANEL_TITLE_KEY] === 'string'
    ? (config[FRAMEWORK_PANEL_TITLE_KEY])
    : undefined;
  return {
    config: parseRawMessagesConfig(merged),
    extras: collectExtras(config, KNOWN_KEYS),
    title,
  };
}

function toConfig(state: FrameworkAdapterState<RawMessagesConfig>): FrameworkConfig {
  const known: FrameworkConfig = {
    topic: state.config.topic,
    uiRefreshHz: state.config.uiRefreshHz,
    pauseUpdates: state.config.pauseUpdates,
    latestOnly: state.config.latestOnly,
    maxExpandedDepth: state.config.maxExpandedDepth,
    maxRows: state.config.maxRows,
    maxBinaryPreviewBytes: state.config.maxBinaryPreviewBytes,
    binaryPreviewBytes: state.config.maxBinaryPreviewBytes,
    binaryCopyFormat: state.config.binaryCopyFormat,
  };
  if (state.title && state.title.length > 0) {
    known[FRAMEWORK_PANEL_TITLE_KEY] = state.title;
  }
  return mergeWithExtras(state.extras, known);
}

export const rawMessagesFoxgloveAdapter: PanelFrameworkAdapter<RawMessagesConfig> = {
  internalType: 'RawMessages',
  foxgloveTypes: ['RawMessages'],
  defaultFoxgloveType: 'RawMessages',
  fromConfig,
  toConfig,
};
