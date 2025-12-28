import type { ReactNode } from 'react';

import { chakra } from '@chakra-ui/react';


const Layout = ({ children, testId }: { children: ReactNode; testId?: string }) => {
  return (
    <chakra.div css={{
      display: 'flex',
      padding: 32,
      gap: 32,
      flexWrap: 'wrap',
    }} data-testid={testId}>
      {children}
    </chakra.div>
  );
};

export default Layout;
