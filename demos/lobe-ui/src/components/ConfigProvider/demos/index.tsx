import { ConfigProvider } from '@devkit/ui';
import { LobeHub } from '@devkit/ui/brand';
import { motion } from 'motion/react';

export default () => {
  return (
    <ConfigProvider config={{ proxy: 'unpkg' }} motion={motion}>
      <LobeHub />
    </ConfigProvider>
  );
};
