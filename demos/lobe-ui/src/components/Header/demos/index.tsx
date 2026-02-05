import { Header } from '@devkit/ui';
import { LobeHub } from '@devkit/ui/brand';

export default () => {
  return <Header actions={'ACTIONS'} logo={<LobeHub type={'combine'} />} nav={'NAV'} />;
};
