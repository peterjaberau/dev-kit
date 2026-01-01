import { theme } from 'antd';
import type { MappingAlgorithm } from 'antd/es/theme/interface';

/**
 * studio Algorithm in dark mode
 * @param seedToken
 * @param mapToken
 */
export const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
  const mergeToken = theme.darkAlgorithm(seedToken, mapToken);

  return {
    ...mergeToken,

    colorBgLayout: '#20252b',
    colorBgContainer: '#282c34',
    colorBgElevated: '#32363e',
  };
};
