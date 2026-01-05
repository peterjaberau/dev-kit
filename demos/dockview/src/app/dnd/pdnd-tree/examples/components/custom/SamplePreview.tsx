import type { PreviewPropsType } from '../../../components/custom/types';
import type { DataType, IdType } from '../../data/custom/sample';
import { chakra } from '@chakra-ui/react';
import { Provider } from '#app/provider'

export const SamplePreview = ({ item }: PreviewPropsType<IdType, DataType>) => {
	return <Provider>
		<chakra.div css={{
			padding: '8px',
			backgroundColor: 'bg.panel',
			borderRadius: '4px',
		}} >{item.id}</chakra.div>
	</Provider>;
};

