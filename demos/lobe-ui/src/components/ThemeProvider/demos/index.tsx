import { Button, ConfigProvider, ThemeProvider } from '@devkit/ui';
import { motion } from 'motion/react';

export default () => {
  return (
    <ConfigProvider motion={motion}>
      <ThemeProvider>
        <Button type="primary">LobeHub</Button>
      </ThemeProvider>
    </ConfigProvider>
  );
};
