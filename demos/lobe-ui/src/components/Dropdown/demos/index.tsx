import { Button, Dropdown } from '@devkit/ui';

import { menu } from './data';

export default () => {
  return (
    <Dropdown menu={menu} trigger={['click']}>
      <Button type={'primary'}>Click</Button>
    </Dropdown>
  );
};
