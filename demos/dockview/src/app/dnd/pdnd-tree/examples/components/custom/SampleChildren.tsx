import type { ChildPropsType } from '../../../components/custom/types';
import type React from 'react';
import { chakra } from '@chakra-ui/react';

export const SampleChildren = ({ children, containerRef }: ChildPropsType) => (
	<chakra.ol
		css={{
			// width: '300px',
			padding: 0,
			margin: '0 auto',
			listStyle: 'none',
			// border: '1px solid',
			// borderColor: 'border.emphasized'
		}}
		ref={containerRef as React.RefObject<HTMLOListElement>}
	>
		{children}
	</chakra.ol>
);

