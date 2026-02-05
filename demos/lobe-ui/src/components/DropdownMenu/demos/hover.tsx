import { Button, DropdownMenu } from '@devkit/ui';

import { items } from './data';

export default () => {
  return (
    <DropdownMenu items={items} nativeButton triggerProps={{ openOnHover: true } as any}>
      <Button>Hover to Open</Button>
    </DropdownMenu>
  );
};
